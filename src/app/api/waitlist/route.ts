import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";
import { z } from "zod";

/* ═══════════════════════════════════════════════════════════════
   PIEL DORADA — Lista VIP waitlist + referral engine
   POST /api/waitlist  → join (idempotent by email)
   GET  /api/waitlist?code=X → referral count for a code
   Table: waitlist_signups (RLS deny-all, service role only)
   ═══════════════════════════════════════════════════════════════ */

const CODE_RE = /^[A-Z0-9]{4,12}$/;

const joinSchema = z.object({
  name: z.string().trim().min(1, "name required").max(80),
  email: z.string().trim().toLowerCase().email("invalid email").max(120),
  whatsapp: z
    .string()
    .trim()
    .min(4, "whatsapp required")
    .max(25)
    .regex(/^[0-9+\-\s().]+$/, "invalid whatsapp"),
  ref: z
    .string()
    .trim()
    .toUpperCase()
    .regex(CODE_RE)
    .nullish()
    .catch(null),
});

type SignupRow = {
  name: string;
  email: string;
  ref_code: string;
  queue_position: number;
};

function admin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

/* Best-effort per-instance rate limit: 8 requests / minute / IP */
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 60_000;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 8;
}

function genCode(name: string): string {
  const clean =
    name
      .normalize("NFD")
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 6) || "VIP";
  const rand = randomBytes(3).toString("hex").toUpperCase().slice(0, 4);
  return (clean + rand).slice(0, 12);
}

async function referralCount(
  db: ReturnType<typeof admin>,
  code: string,
): Promise<number> {
  const { count, error } = await db
    .from("waitlist_signups")
    .select("id", { count: "exact", head: true })
    .eq("referred_by", code);
  if (error) {
    console.error("[waitlist] referral count", error);
    return 0;
  }
  return count ?? 0;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { data: null, error: "rate_limited", message: "Demasiados intentos, espera un momento. / Too many attempts, wait a moment." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = joinSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { data: null, error: "invalid_input", message: "Revisa tus datos e intenta de nuevo. / Check your info and try again." },
        { status: 400 },
      );
    }
    const { name, email, whatsapp, ref } = parsed.data;
    const db = admin();

    // Idempotent: returning email gets its existing spot back
    const { data: existing, error: findErr } = await db
      .from("waitlist_signups")
      .select("name, email, ref_code, queue_position")
      .eq("email", email)
      .maybeSingle<SignupRow>();
    if (findErr) throw findErr;

    if (existing) {
      return NextResponse.json({
        data: {
          name: existing.name,
          email: existing.email,
          code: existing.ref_code,
          position: existing.queue_position,
          referrals: await referralCount(db, existing.ref_code),
          returning: true,
        },
        error: null,
        message: "Ya estabas en la lista. / You were already on the list.",
      });
    }

    // Referrer must actually exist — forged ?ref= codes are dropped
    let referredBy: string | null = null;
    if (ref) {
      const { data: referrer } = await db
        .from("waitlist_signups")
        .select("ref_code")
        .eq("ref_code", ref)
        .maybeSingle();
      referredBy = referrer?.ref_code ?? null;
    }

    // Insert with retry on ref_code collision
    let inserted: SignupRow | null = null;
    for (let attempt = 0; attempt < 3 && !inserted; attempt++) {
      const { data, error } = await db
        .from("waitlist_signups")
        .insert({ name, email, whatsapp, ref_code: genCode(name), referred_by: referredBy })
        .select("name, email, ref_code, queue_position")
        .single<SignupRow>();
      if (!error) {
        inserted = data;
      } else if (error.code === "23505" && error.message.includes("ref_code")) {
        continue;
      } else if (error.code === "23505" && error.message.includes("email")) {
        // Lost a race with a duplicate submit — return the existing row
        const { data: dup } = await db
          .from("waitlist_signups")
          .select("name, email, ref_code, queue_position")
          .eq("email", email)
          .single<SignupRow>();
        inserted = dup;
      } else {
        throw error;
      }
    }
    if (!inserted) throw new Error("could not allocate ref code");

    return NextResponse.json({
      data: {
        name: inserted.name,
        email: inserted.email,
        code: inserted.ref_code,
        position: inserted.queue_position,
        referrals: 0,
        returning: false,
      },
      error: null,
      message: null,
    });
  } catch (error) {
    console.error("[waitlist] POST", error);
    return NextResponse.json(
      { data: null, error: "server_error", message: "Algo salió mal, intenta de nuevo. / Something went wrong, try again." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const code = (req.nextUrl.searchParams.get("code") ?? "").trim().toUpperCase();
    if (!CODE_RE.test(code)) {
      return NextResponse.json(
        { data: null, error: "invalid_code", message: null },
        { status: 400 },
      );
    }
    const count = await referralCount(admin(), code);
    return NextResponse.json({ data: { referrals: count }, error: null, message: null });
  } catch (error) {
    console.error("[waitlist] GET", error);
    return NextResponse.json(
      { data: null, error: "server_error", message: null },
      { status: 500 },
    );
  }
}
