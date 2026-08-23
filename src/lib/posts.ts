/* ═══════════════════════════════════════════════════════════════
   BLOG CONTENT ENGINE — data-driven posts (no MDX dependency).
   Priority: tanning posts first (own the empty category on Google).
   Bodies are author-trusted HTML rendered inside .pd-prose.
   Add new posts by appending to POSTS — sitemap + /blog pick them up.
   ═══════════════════════════════════════════════════════════════ */

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Related service slug for internal linking. */
  service: string;
  datePublished: string; // ISO
  dateModified?: string;
  readMins: number;
  excerpt: string;
  /** Trusted HTML body (authored, no user input). */
  body: string;
  faqs: { q: string; a: string }[];
};

export const POSTS: Post[] = [
  {
    slug: "que-es-el-bronceado-brasileno",
    title: "¿Qué es el bronceado brasileño y por qué es el mejor?",
    description:
      "Descubre qué es el bronceado brasileño, cómo funciona y por qué es la forma más segura y natural de broncearte en El Salvador — sin sol y sin dañar tu piel.",
    category: "Bronceado",
    service: "bronceado",
    datePublished: "2026-08-23",
    readMins: 5,
    excerpt:
      "El bronceado brasileño da un color dorado, parejo y natural sin exponerte al sol. Te explicamos cómo funciona y por qué llegó para quedarse en El Salvador.",
    body: `
<p>El <strong>bronceado brasileño</strong> es una técnica de bronceado sin sol que aplica una fina bruma sobre la piel para lograr un tono dorado, parejo y de aspecto totalmente natural. A diferencia de tomar sol durante horas, el color aparece en cuestión de horas sin exponer tu piel a la radiación UV del sol del mediodía.</p>

<h2>¿Cómo funciona el bronceado brasileño?</h2>
<p>El producto se basa en <strong>DHA (dihidroxiacetona)</strong>, un ingrediente derivado de la caña de azúcar que reacciona con las capas más superficiales de la piel para producir un tono dorado. No es una pintura ni un tinte: es una reacción natural sobre tu propia piel, por eso el resultado se ve tan real.</p>
<p>En Piel Dorada aplicamos la bruma con equipo profesional y ajustamos la fórmula a tu <strong>tono de piel</strong>, para que nunca quede anaranjado ni con manchas. El resultado es un bronceado uniforme de pies a cabeza.</p>

<h2>¿Por qué es mejor que broncearte al sol?</h2>
<ul>
<li><strong>Es seguro:</strong> cero radiación UV, cero riesgo de quemaduras solares.</li>
<li><strong>Es rápido:</strong> la sesión toma minutos y el color se revela en pocas horas.</li>
<li><strong>Es parejo:</strong> nada de marcas de traje de baño ni zonas quemadas.</li>
<li><strong>Es personalizado:</strong> tú eliges la intensidad, desde un brillo sutil hasta un dorado profundo.</li>
</ul>

<h2>¿Cuánto dura?</h2>
<p>Un bronceado brasileño bien cuidado dura entre <strong>7 y 10 días</strong>. Con la preparación correcta de la piel y una buena hidratación diaria puedes extender el color aún más. Si quieres mantenerlo todo el mes, nuestras <a href="/bronceado">membresías de bronceado</a> son la opción ideal.</p>

<p>¿Lista para probarlo? Conoce todo sobre nuestro <a href="/bronceado">servicio de bronceado en San Salvador</a> o escríbenos por WhatsApp para agendar tu primera sesión.</p>
`,
    faqs: [
      {
        q: "¿El bronceado brasileño mancha la ropa?",
        a: "Durante las primeras horas puede transferir un poco, por eso recomendamos ropa holgada y oscura después de la sesión. Una vez que te enjuagas, el color queda fijo y no mancha.",
      },
      {
        q: "¿El bronceado brasileño se ve anaranjado?",
        a: "No cuando lo aplica un profesional. En Piel Dorada ajustamos la fórmula a tu tono de piel para lograr un dorado natural, nunca anaranjado.",
      },
      {
        q: "¿Cuánto cuesta el bronceado brasileño en El Salvador?",
        a: "En Piel Dorada el bronceado en spray comienza desde $45. También ofrecemos membresías mensuales para broncearte todo el mes.",
      },
    ],
  },
  {
    slug: "camas-de-bronceado-en-el-salvador",
    title: "Camas de bronceado en El Salvador: todo lo que debes saber",
    description:
      "Las primeras camas de bronceado profesionales de El Salvador llegan a San Salvador. Cómo funcionan, para quién son y cómo broncearte de forma segura.",
    category: "Bronceado",
    service: "bronceado",
    datePublished: "2026-08-23",
    readMins: 6,
    excerpt:
      "Por primera vez en El Salvador tendrás acceso a camas de bronceado profesionales. Te contamos cómo funcionan y cómo construir un bronceado seguro.",
    body: `
<p>Hasta ahora, si querías broncearte en <strong>El Salvador</strong> tu única opción era el sol. Eso está por cambiar: Piel Dorada trae las <strong>primeras camas de bronceado profesionales</strong> del país a San Salvador — un ambiente controlado, higiénico y diseñado para lograr un color parejo sin las horas de exposición al sol.</p>

<h2>¿Qué es una cama de bronceado?</h2>
<p>Una <strong>cama de bronceado</strong> (también llamada cama solar o solárium) utiliza lámparas especializadas para estimular el bronceado de la piel de forma gradual y uniforme. A diferencia del sol, la intensidad y el tiempo están totalmente controlados, lo que permite construir tu color de manera progresiva y mucho más segura.</p>

<h2>¿Cómo construir tu base de bronceado?</h2>
<p>El secreto de un buen bronceado es la <strong>progresión</strong>. No se trata de una sesión larga, sino de varias sesiones cortas:</p>
<ul>
<li><strong>Primeras 2 semanas:</strong> 2 a 3 sesiones cortas por semana para construir la base.</li>
<li><strong>Mantenimiento:</strong> 1 a 2 sesiones semanales para conservar el color.</li>
</ul>
<p>Nuestro equipo evalúa tu <strong>tipo de piel</strong> y diseña un plan personalizado para que llegues al tono que buscas sin arriesgar tu piel.</p>

<h2>¿Para quién son las camas de bronceado?</h2>
<p>Son ideales si tienes un evento, una boda o un viaje a la playa y quieres llegar con color; si quieres un tono dorado uniforme todo el año; o si simplemente prefieres broncearte en un ambiente privado y climatizado en lugar del sol directo.</p>

<h2>Bronceado seguro, siempre</h2>
<p>La seguridad es lo primero. Te guiamos en cada sesión, respetamos los tiempos según tu piel y te damos las recomendaciones de cuidado antes y después. Descubre más en nuestra página de <a href="/bronceado">bronceado en San Salvador</a>.</p>

<p>¿Quieres ser de las primeras en probar las camas de bronceado en El Salvador? <a href="/#lista-vip">Únete a la Lista VIP</a> y recibe acceso anticipado y precio de miembro fundador.</p>
`,
    faqs: [
      {
        q: "¿Cuántas veces por semana debo usar la cama de bronceado?",
        a: "Para construir tu base se recomiendan 2 a 3 sesiones por semana; luego 1 a 2 semanales mantienen el color. Nuestro equipo te guía según tu tipo de piel.",
      },
      {
        q: "¿Las camas de bronceado son seguras?",
        a: "Sí, cuando se usan con protocolos profesionales. Controlamos la intensidad y el tiempo según tu tipo de piel y te acompañamos en cada sesión para un bronceado seguro.",
      },
      {
        q: "¿Hay camas de bronceado en El Salvador?",
        a: "Piel Dorada trae las primeras camas de bronceado profesionales de El Salvador a San Salvador. Únete a la Lista VIP para acceso anticipado.",
      },
    ],
  },
  {
    slug: "bronceado-seguro-como-broncearte-sin-danar-tu-piel",
    title: "Bronceado seguro: cómo broncearte sin dañar tu piel",
    description:
      "Guía para broncearte de forma segura en El Salvador: preparación, hidratación y por qué el bronceado sin sol protege tu piel. Consejos de Piel Dorada.",
    category: "Bronceado",
    service: "bronceado",
    datePublished: "2026-08-23",
    readMins: 5,
    excerpt:
      "Broncearte no tiene por qué dañar tu piel. Te explicamos cómo lograr un color hermoso de la forma más segura, dentro y fuera de la cama de bronceado.",
    body: `
<p>Todas queremos un color dorado, pero nadie quiere el daño solar, las manchas ni el envejecimiento prematuro que trae la exposición sin control. La buena noticia: hoy puedes broncearte de forma <strong>segura</strong>. Aquí te explicamos cómo.</p>

<h2>1. Prefiere el bronceado sin sol</h2>
<p>El <a href="/bronceado">bronceado brasileño</a> no usa radiación UV: el color proviene de una reacción natural del DHA con tu piel. Es la forma más segura de lograr un dorado real sin arriesgar tu salud.</p>

<h2>2. Si usas cama de bronceado, hazlo con progresión</h2>
<p>Nunca busques color en una sola sesión larga. Construye tu base con <strong>sesiones cortas y espaciadas</strong>, siempre bajo la guía de un profesional que evalúe tu tipo de piel.</p>

<h2>3. Prepara tu piel</h2>
<ul>
<li><strong>Exfolia</strong> 24 horas antes para eliminar células muertas y lograr un color parejo.</li>
<li><strong>Hidrata</strong> a diario: la piel hidratada retiene el bronceado por más tiempo.</li>
<li><strong>Evita</strong> cremas con aceite justo antes de una sesión de spray tan.</li>
</ul>

<h2>4. Cuida el color después</h2>
<p>Hidrata cada día, evita duchas muy calientes y prolongadas, y usa protector solar cuando salgas. Un buen cuidado puede extender tu bronceado varios días más.</p>

<h2>5. Escucha a tu piel</h2>
<p>Cada piel es distinta. En Piel Dorada personalizamos cada servicio según tu tono y sensibilidad, para que tu bronceado sea siempre hermoso y seguro. Conoce todas las opciones en nuestra página de <a href="/bronceado">bronceado en San Salvador</a>.</p>
`,
    faqs: [
      {
        q: "¿El bronceado sin sol es seguro para la piel?",
        a: "Sí. El bronceado brasileño no utiliza radiación UV; el color se produce por una reacción natural del DHA con las capas superficiales de la piel.",
      },
      {
        q: "¿Cómo preparo mi piel antes de broncearme?",
        a: "Exfolia 24 horas antes, hidrata a diario y evita cremas con aceite justo antes de una sesión de spray tan para lograr un color parejo y duradero.",
      },
    ],
  },
  {
    slug: "cuanto-dura-la-micropigmentacion-de-cejas",
    title: "¿Cuánto dura la micropigmentación de cejas?",
    description:
      "Cuánto dura la micropigmentación de cejas, de qué depende y cómo cuidarla para que se mantenga hermosa. Guía por Daniela Miranda, Miss PMU Internacional.",
    category: "Micropigmentación",
    service: "micropigmentacion",
    datePublished: "2026-08-23",
    readMins: 5,
    excerpt:
      "La micropigmentación de cejas dura entre 1 y 3 años según tu piel y cuidados. Te explicamos de qué depende y cómo hacerla durar más.",
    body: `
<p>La <strong>micropigmentación de cejas</strong> es una de las mejores inversiones en belleza: despiertas con cejas perfectas todos los días. Pero, ¿cuánto dura realmente? La respuesta corta: entre <strong>1 y 3 años</strong>, dependiendo de varios factores.</p>

<h2>¿De qué depende la duración?</h2>
<ul>
<li><strong>Tu tipo de piel:</strong> las pieles grasas tienden a desvanecer el pigmento más rápido que las secas.</li>
<li><strong>La técnica:</strong> el microblading, el powder brows y el microshading se comportan distinto en cada piel.</li>
<li><strong>El cuidado posterior:</strong> seguir las indicaciones de cicatrización es clave.</li>
<li><strong>La exposición al sol:</strong> el sol desvanece el pigmento; el protector solar es tu aliado.</li>
</ul>

<h2>El retoque: parte del proceso</h2>
<p>La micropigmentación incluye una <strong>sesión de retoque</strong> a las 4–6 semanas para perfeccionar el color y la forma. Después, un retoque anual mantiene tus cejas siempre impecables.</p>

<h2>Por qué importa tu artista</h2>
<p>La durabilidad y el resultado dependen enormemente de la mano que las hace. En Piel Dorada, tus cejas están en manos de <strong>Daniela Miranda</strong>, la única artista <strong>Miss PMU Internacional</strong> de El Salvador. Conoce más sobre <a href="/sobre-daniela">su trayectoria</a> y sobre el <a href="/micropigmentacion">servicio de micropigmentación en San Salvador</a>.</p>

<p>¿Lista para cejas perfectas que amanecen contigo? Escríbenos por WhatsApp para agendar tu valoración.</p>
`,
    faqs: [
      {
        q: "¿Cuánto dura la micropigmentación de cejas?",
        a: "Entre 1 y 3 años, según tu tipo de piel, la técnica usada, el cuidado posterior y la exposición al sol. Un retoque anual la mantiene impecable.",
      },
      {
        q: "¿La micropigmentación de cejas duele?",
        a: "Es un procedimiento muy tolerable. Se aplica un anestésico tópico para minimizar cualquier molestia durante la sesión.",
      },
      {
        q: "¿Necesito un retoque?",
        a: "Sí, se incluye una sesión de retoque a las 4–6 semanas para perfeccionar color y forma. Luego un retoque anual mantiene el resultado.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
