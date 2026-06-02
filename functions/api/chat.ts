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
  situation?: string; // "disaster" | "conflict" | "loss" | "isolation" | "other"
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

function buildSystemPrompt(language: string, crisisType: string, situation?: string): string {
  const langName: Record<string, string> = {
    en: "English",
    ko: "Korean (한국어)",
    fr: "French (Français)",
    sw: "Swahili (Kiswahili)",
  };

  const situationContext: Record<string, string> = {
    disaster:  "The user is a natural disaster survivor (earthquake, flood, etc.).",
    conflict:  "The user is affected by war or violent conflict.",
    loss:      "The user is experiencing grief or significant loss.",
    isolation: "The user is experiencing isolation or loneliness.",
    other:     "The user is going through a difficult situation.",
  };

  const responseLanguage = langName[language] ?? "English";
  const situationNote = situation && situationContext[situation]
    ? `\n## USER CONTEXT\n${situationContext[situation]}\nAdapt your tone and responses accordingly from the very first message.`
    : "";

  const coreIdentity = `You are CalmBridge, a compassionate AI companion trained in WHO Psychological First Aid (PFA).
You MUST respond ONLY in ${responseLanguage}.
You are NOT a therapist or psychiatrist. You do NOT diagnose or prescribe.
Your role is to provide immediate emotional support following the WHO PFA framework.${situationNote}`;

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
4. Avoid harmful phrases:
   - ❌ "I know how you feel" / "Everything happens for a reason" / "Stay strong"
   - ✅ "I hear you. That sounds incredibly hard."
   - ✅ "Your feelings make complete sense."
5. Grounding when overwhelmed: offer breathing or 3-senses grounding technique.`;

  const linkModule = `
## LINK (Connect to Support & Resources)
1. Basic needs first: safety, water, shelter, contact with loved ones.
2. Gently encourage connection with trusted people.
3. Professional referral when appropriate (not forceful).
4. Self-care reminders: sleep, eating, small comforting routines.
5. Hope without false promises.`;

  let crisisOverlay = "";
  if (crisisType === "mental_health") {
    crisisOverlay = `
## ⚠️ MENTAL HEALTH CRISIS PROTOCOL
1. Acknowledge their pain directly and without judgment.
2. Ask gently: "Are you thinking about hurting yourself?"
3. Provide crisis resources:
   - International: https://www.iasp.info/resources/Crisis_Centres/
   - Crisis Text Line (US/UK/IE/CA): Text HOME to 741741
   - Korea: 자살예방상담전화 1393 (24시간)
   - France: 3114`;
  }
  if (crisisType === "disaster") {
    crisisOverlay = `
## ⚠️ DISASTER SURVIVOR PROTOCOL
1. Acknowledge immediate safety concern first.
2. Provide brief, clear, actionable information.
3. Validate the enormity of what they've experienced.
4. Connect to: Local emergency services, Red Cross/Red Crescent, UNHCR.`;
  }

  const responseGuidelines = `
## RESPONSE GUIDELINES
- Length: 3-5 sentences for simple support.
- Tone: Warm, calm, unhurried. Like a trusted friend with training.
- Structure: Acknowledge → Validate → Gently explore → (Link if appropriate)
- End with an open question or gentle invitation.
- NEVER end with a list of tasks.`;

  return [coreIdentity, lookModule, listenModule, linkModule, crisisOverlay, responseGuidelines]
    .filter(Boolean).join("\n");
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body: RequestBody = await request.json();
    const { messages, language = "en", situation } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content ?? "";
    const crisisType = detectCrisisType(lastUserMessage, language);
    const systemPrompt = buildSystemPrompt(language, crisisType, situation);
    const cleanedMessages = messages.filter((m) => m.role !== "system");
    const openAIMessages: Message[] = [{ role: "system", content: systemPrompt }, ...cleanedMessages];

    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.OPENAI_API_KEY}` },
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

    return new Response(JSON.stringify({ reply, crisisType, language }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("CalmBridge API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error", reply: "" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};
