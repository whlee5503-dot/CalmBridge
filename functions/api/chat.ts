// functions/api/chat.ts
// WHO Psychological First Aid (PFA) - Look, Listen, Link framework

interface Env {
  OPENAI_API_KEY: string;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  messages: Message[];
  language?: string;
  situation?: string;
  religion?: string;
}

const MENTAL_HEALTH_CRISIS_KEYWORDS: Record<string, string[]> = {
  en: ["suicide", "kill myself", "end my life", "want to die", "self-harm", "cut myself", "overdose", "no reason to live"],
  ko: ["자살", "죽고 싶다", "삶을 끝내고 싶다", "자해", "죽고 싶어", "살기 싫어", "스스로 목숨"],
  fr: ["suicide", "me tuer", "fin de ma vie", "automutilation", "mourir", "plus envie de vivre"],
  sw: ["kujiua", "kumaliza maisha", "kujidhuru", "sitaki kuishi"],
};

const DISASTER_CRISIS_KEYWORDS: Record<string, string[]> = {
  en: ["earthquake", "flood", "hurricane", "tornado", "tsunami", "wildfire", "explosion", "bombing", "attack", "refugee", "evacuation"],
  ko: ["지진", "홍수", "태풍", "해일", "산불", "폭발", "폭격", "난민", "대피", "재난"],
  fr: ["tremblement de terre", "inondation", "ouragan", "tsunami", "incendie", "réfugié", "évacuation"],
  sw: ["tetemeko", "mafuriko", "kimbunga", "tsunami", "moto", "mkimbizi", "uokoaji"],
};

function detectCrisisType(text: string, lang: string): "mental_health" | "disaster" | "none" {
  const normalizedText = text.toLowerCase();
  const effectiveLang = lang in MENTAL_HEALTH_CRISIS_KEYWORDS ? lang : "en";
  const mentalKeywords = [...(MENTAL_HEALTH_CRISIS_KEYWORDS[effectiveLang] ?? []), ...(MENTAL_HEALTH_CRISIS_KEYWORDS["en"] ?? [])];
  const disasterKeywords = [...(DISASTER_CRISIS_KEYWORDS[effectiveLang] ?? []), ...(DISASTER_CRISIS_KEYWORDS["en"] ?? [])];
  if (mentalKeywords.some((kw) => normalizedText.includes(kw))) return "mental_health";
  if (disasterKeywords.some((kw) => normalizedText.includes(kw))) return "disaster";
  return "none";
}

// ── Spiritual Comfort Texts ───────────────────────────────────────────────────

const SPIRITUAL_TEXTS: Record<string, Record<string, { quote: string; source: string }[]>> = {
  christianity: {
    en: [
      { quote: "Come to me, all you who are weary and burdened, and I will give you rest.", source: "Matthew 11:28" },
      { quote: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", source: "Psalm 34:18" },
      { quote: "I can do all things through Christ who strengthens me.", source: "Philippians 4:13" },
      { quote: "Fear not, for I am with you; be not dismayed, for I am your God.", source: "Isaiah 41:10" },
    ],
    ko: [
      { quote: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라.", source: "마태복음 11:28" },
      { quote: "여호와는 마음이 상한 자를 가까이 하시고 통회하는 자를 구원하시는도다.", source: "시편 34:18" },
      { quote: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라.", source: "빌립보서 4:13" },
      { quote: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라.", source: "이사야 41:10" },
    ],
    fr: [
      { quote: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", source: "Matthieu 11:28" },
      { quote: "L'Éternel est près de ceux qui ont le cœur brisé.", source: "Psaume 34:18" },
    ],
    sw: [
      { quote: "Njooni kwangu, nyote mnaochoka na kubeba mzigo, nami nitawapumzisha.", source: "Mathayo 11:28" },
      { quote: "Bwana yuko karibu na wale waliovunjika moyo.", source: "Zaburi 34:18" },
    ],
  },
  islam: {
    en: [
      { quote: "Verily, with hardship comes ease.", source: "Quran 94:5-6" },
      { quote: "Allah does not burden a soul beyond that it can bear.", source: "Quran 2:286" },
      { quote: "And He found you lost and guided you.", source: "Quran 93:7" },
    ],
    ko: [
      { quote: "진실로 고난과 함께 안도가 옵니다.", source: "꾸란 94:5-6" },
      { quote: "알라는 영혼이 감당할 수 있는 것 이상으로 짐을 지우지 않습니다.", source: "꾸란 2:286" },
    ],
    fr: [
      { quote: "Certes, avec la difficulté vient la facilité.", source: "Coran 94:5-6" },
      { quote: "Allah n'impose à aucune âme une charge supérieure à sa capacité.", source: "Coran 2:286" },
    ],
    sw: [
      { quote: "Hakika, pamoja na ugumu kuna urahisi.", source: "Quran 94:5-6" },
    ],
  },
  buddhism: {
    en: [
      { quote: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", source: "The Buddha" },
      { quote: "Peace comes from within. Do not seek it without.", source: "The Buddha" },
      { quote: "In the middle of difficulty lies opportunity.", source: "Buddhist teaching" },
    ],
    ko: [
      { quote: "당신 자신도 온 우주 어디에 있는 누구만큼이나 사랑과 애정을 받을 자격이 있습니다.", source: "붓다" },
      { quote: "평화는 내면에서 옵니다. 밖에서 찾지 마세요.", source: "붓다" },
    ],
    fr: [
      { quote: "Vous-même méritez votre amour et votre affection.", source: "Le Bouddha" },
      { quote: "La paix vient de l'intérieur. Ne la cherchez pas à l'extérieur.", source: "Le Bouddha" },
    ],
    sw: [
      { quote: "Wewe mwenyewe unastahili upendo wako.", source: "Buddha" },
    ],
  },
  hinduism: {
    en: [
      { quote: "The soul is never born nor dies at any time.", source: "Bhagavad Gita 2:20" },
      { quote: "You have the right to perform your actions, but you are not entitled to the fruits of the actions.", source: "Bhagavad Gita 2:47" },
    ],
    ko: [
      { quote: "영혼은 언제도 태어나거나 죽지 않는다.", source: "바가바드 기타 2:20" },
      { quote: "당신은 행동할 권리가 있지만, 그 결과에 얽매일 필요는 없습니다.", source: "바가바드 기타 2:47" },
    ],
    fr: [
      { quote: "L'âme n'est jamais née ni ne meurt.", source: "Bhagavad Gita 2:20" },
    ],
    sw: [
      { quote: "Roho haizaliwi wala kufa wakati wowote.", source: "Bhagavad Gita 2:20" },
    ],
  },
  judaism: {
    en: [
      { quote: "Even when I walk through the darkest valley, I will not be afraid, for you are close beside me.", source: "Psalm 23:4" },
      { quote: "Be strong and courageous. Do not be afraid; do not be discouraged.", source: "Joshua 1:9" },
    ],
    ko: [
      { quote: "내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라.", source: "시편 23:4" },
      { quote: "강하고 담대하라 두려워하지 말며 놀라지 말라.", source: "여호수아 1:9" },
    ],
    fr: [
      { quote: "Même si je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal.", source: "Psaume 23:4" },
    ],
    sw: [
      { quote: "Hata kama nitapita katika bonde la uvuli wa mauti, sitaogopa mabaya.", source: "Zaburi 23:4" },
    ],
  },
  secular: {
    en: [
      { quote: "You don't have to have it all figured out to move forward.", source: "A reminder for hard days" },
      { quote: "This too shall pass.", source: "Ancient proverb" },
      { quote: "You've survived 100% of your worst days so far.", source: "A reminder for hard days" },
    ],
    ko: [
      { quote: "나아가기 위해 모든 것을 이해할 필요는 없습니다.", source: "힘든 날을 위한 위로" },
      { quote: "이것 또한 지나가리라.", source: "고대 격언" },
      { quote: "당신은 지금까지의 모든 힘든 날을 헤쳐왔습니다.", source: "힘든 날을 위한 위로" },
    ],
    fr: [
      { quote: "Vous n'avez pas besoin d'avoir tout compris pour avancer.", source: "Un rappel pour les jours difficiles" },
      { quote: "Ceci aussi passera.", source: "Proverbe ancien" },
    ],
    sw: [
      { quote: "Huhitaji kuelewa kila kitu ili kusonga mbele.", source: "Ukumbusho kwa siku ngumu" },
    ],
  },
};

function getSpiritualModule(religion: string, language: string): string {
  if (!religion || religion === "none") return "";
  const lang = language in { en: 1, ko: 1, fr: 1, sw: 1 } ? language : "en";
  const texts = SPIRITUAL_TEXTS[religion]?.[lang] ?? SPIRITUAL_TEXTS[religion]?.["en"] ?? [];
  if (texts.length === 0) return "";

  const traditionNames: Record<string, Record<string, string>> = {
    christianity: { en: "Christianity", ko: "기독교", fr: "Christianisme", sw: "Ukristo" },
    islam:        { en: "Islam",        ko: "이슬람",  fr: "Islam",         sw: "Uislamu" },
    buddhism:     { en: "Buddhism",     ko: "불교",    fr: "Bouddhisme",    sw: "Ubudha" },
    hinduism:     { en: "Hinduism",     ko: "힌두교",  fr: "Hindouisme",    sw: "Uhindu" },
    judaism:      { en: "Judaism",      ko: "유대교",  fr: "Judaïsme",      sw: "Uyahudi" },
    secular:      { en: "secular wisdom", ko: "지혜로운 말씀", fr: "sagesse universelle", sw: "hekima" },
  };

  const tradName = traditionNames[religion]?.[lang] ?? religion;
  const quotesText = texts.map(t => `- "${t.quote}" (${t.source})`).join("\n");

  return `
## SPIRITUAL COMFORT MODULE (${tradName.toUpperCase()})
The user has selected ${tradName} as their spiritual tradition.
You have access to these comforting texts from ${tradName}:
${quotesText}

INSTRUCTIONS FOR SPIRITUAL INTEGRATION:
- Weave ONE relevant quote naturally into your response when emotionally appropriate
- Do NOT quote mechanically — only when it genuinely fits the emotional moment
- Introduce it gently: e.g. "There is a saying in ${tradName}..." or "A text from ${tradName} comes to mind..."
- After the quote, connect it warmly back to the person's situation
- Never force a quote if the conversation doesn't call for it
- Never quote more than once per response`;
}

function buildSystemPrompt(language: string, crisisType: string, religion?: string): string {
  const langName: Record<string, string> = {
    en: "English",
    ko: "Korean (한국어)",
    fr: "French (Français)",
    sw: "Swahili (Kiswahili)",
  };

  const responseLanguage = langName[language] ?? "English";

  const coreIdentity = `You are CalmBridge, a compassionate AI companion trained in WHO Psychological First Aid (PFA).
You MUST respond ONLY in ${responseLanguage}.
You are NOT a therapist or psychiatrist. You do NOT diagnose or prescribe.
Your role is to provide immediate emotional support following the WHO PFA framework.`;

  const lookModule = `
## LOOK (Observe & Assess)
Before responding, silently assess:
- Emotional state: Is the person in acute distress, shock, or grief?
- Safety level: Are they describing immediate danger to themselves or others?
- Needs: What are their immediate practical and emotional needs?
- Strengths: What coping resources do they seem to have?

Adapt your response tone accordingly:
- Acute crisis → calm, grounding, simple sentences
- Grief/loss → warm, unhurried, validating
- Overwhelmed → structured, gentle reassurance
- Stable but stressed → supportive listening, normalizing reactions`;

  const listenModule = `
## LISTEN (Active, Compassionate Listening)
1. Presence over solutions: Acknowledge feelings first.
2. No pressure: Never push people to talk about what happened.
3. Validation: Normalize reactions.
4. Avoid harmful phrases: "I know how you feel", "Stay strong", "Everything happens for a reason"
5. Grounding when overwhelmed: offer breathing or grounding techniques.`;

  const linkModule = `
## LINK (Connect to Support & Resources)
1. Basic needs first
2. Social support: encourage connection with trusted people
3. Professional referral when appropriate
4. Self-care reminders
5. Hope without false promises`;

  const spiritualModule = getSpiritualModule(religion ?? "none", language);

  let crisisOverlay = "";
  if (crisisType === "mental_health") {
    crisisOverlay = `
## ⚠️ MENTAL HEALTH CRISIS PROTOCOL
1. Acknowledge their pain directly and without judgment.
2. Ask gently: "Are you thinking about hurting yourself?"
3. Provide crisis resources:
   - International: https://www.iasp.info/resources/Crisis_Centres/
   - Crisis Text Line (US/UK/IE/CA): Text HOME to 741741
   - Korea: 자살예방상담전화 1393
   - France: 3114`;
  }

  if (crisisType === "disaster") {
    crisisOverlay = `
## ⚠️ DISASTER SURVIVOR PROTOCOL
1. Acknowledge immediate safety concern.
2. Validate the enormity of what they've experienced.
3. Focus on immediate practical needs.
4. Connect to: Local emergency services, Red Cross/Red Crescent, UNHCR.`;
  }

  const responseGuidelines = `
## RESPONSE GUIDELINES
- Length: 3-5 sentences for simple support; longer only when genuinely needed.
- Tone: Warm, calm, unhurried.
- Structure: Acknowledge → Validate → Gently explore → (Link if appropriate)
- End with: An open question or gentle invitation.
- NEVER end with a list of tasks.`;

  return [coreIdentity, lookModule, listenModule, linkModule, spiritualModule, crisisOverlay, responseGuidelines]
    .filter(Boolean)
    .join("\n");
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: RequestBody = await request.json();
    const { messages, language = "en", situation, religion } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content ?? "";
    const crisisType = detectCrisisType(lastUserMessage, language);
    const systemPrompt = buildSystemPrompt(language, crisisType, religion);
    const cleanedMessages = messages.filter((m) => m.role !== "system");

    const openAIMessages: Message[] = [
      { role: "system", content: systemPrompt },
      ...cleanedMessages,
    ];

    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openAIMessages,
        max_tokens: 600,
        temperature: 0.75,
        presence_penalty: 0.3,
        frequency_penalty: 0.2,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await openAIResponse.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return new Response(
      JSON.stringify({ reply, crisisType, language }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("CalmBridge API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", reply: "" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};
