interface Env {
  OPENAI_API_KEY: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { messages, language } = await context.request.json() as {
      messages: { role: string; content: string }[]
      language: string
    }

    const langMap: Record<string, string> = {
      ko: 'Korean', fr: 'French', sw: 'Swahili', en: 'English'
    }
    const responseLang = langMap[language] ?? 'English'

    const systemPrompt = `You are CalmBridge, a compassionate Psychological First Aid (PFA) assistant based on WHO guidelines. Follow Look-Listen-Link principles. Always respond in ${responseLang}.
CRITICAL SAFETY RULE: If the user expresses suicidal ideation, self-harm, or immediate danger, you MUST immediately provide local emergency hotline information and strongly encourage professional help. Do not continue normal conversation until safety is confirmed.
You are NOT a therapist or doctor. Always remind users to seek professional help when needed.
Keep responses concise and warm. Maximum 3 sentences per response.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    const data = await response.json() as {
      choices: { message: { content: string } }[]
    }

    return new Response(
      JSON.stringify({ reply: data.choices[0].message.content }),
      { headers: { 'Content-Type': 'application/json',
                   'Access-Control-Allow-Origin': '*' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Service unavailable' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
