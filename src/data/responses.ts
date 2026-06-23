// src/data/responses.ts
// 7 situations × 5 emotional states × 4 languages = 140 static responses
// WHO PFA Look-Listen-Link framework — works fully offline

export interface Response {
  comfort: string
  message: string
  action?: string
  grounding?: string
}

export const RESPONSES: Record<string, Record<string, Record<string, Response>>> = {
  "en": {
    "disaster": {
      "numb": {
        "comfort": "You are alive. That matters.",
        "message": "What you're feeling right now — the numbness, the emptiness — is a completely normal response to something overwhelming. Your mind is protecting you. You don't need to feel anything in particular right now. Just breathe. You are safe enough in this moment to simply exist.",
        "action": "If you need immediate help: contact local emergency services or Red Cross/Red Crescent in your area."
      },
      "scared": {
        "comfort": "Your fear makes complete sense.",
        "message": "Of course you're shaking. What you've been through is terrifying, and your body is responding exactly as it should. That trembling is your nervous system doing its job. You are not weak. You are human, and you survived something enormous.",
        "grounding": "Try this: press your feet firmly into the ground. Feel the surface beneath you. Name 3 things you can see right now."
      },
      "family": {
        "comfort": "The love driving you to find them is real.",
        "message": "Not knowing where your family is may be the hardest thing a person can face. Many families are separated in disasters and are found. Keep trying to reach them. Tell someone in authority that you are separated from family.",
        "action": "Red Cross Family Links: familylinks.icrc.org"
      },
      "lost": {
        "comfort": "You lost things. You are still here.",
        "message": "Losing your home and belongings is a profound grief. It's okay to grieve this deeply. Right now, your most important task is simply: stay safe, find shelter, find water.",
        "action": "Contact local disaster relief organizations or UNHCR (unhcr.org) if you need shelter."
      },
      "hurt": {
        "comfort": "You are doing the right thing by seeking help.",
        "message": "Seeing someone hurt is deeply distressing. Stay as calm as you can. Focus on one thing: getting help to them as quickly as possible.",
        "action": "Call emergency services immediately. Keep them still and warm if possible. Stay with them."
      }
    },
    "conflict": {
      "heard": {
        "comfort": "You heard it. You survived it.",
        "message": "Hearing explosions or gunfire leaves an imprint on your body and mind. Your fear is completely justified. Right now, the most important thing is your physical safety. Get low, find cover, move away from the sound if safe.",
        "action": "If safe: move to a sturdy building, stay away from windows. Contact UNHCR or local emergency services."
      },
      "fleeing": {
        "comfort": "Fleeing is survival. You are brave.",
        "message": "The decision to flee is one of the hardest a person can make. You are not running away — you are choosing life. It's okay not to know exactly where you're going yet. Focus on the next step, not the whole journey.",
        "action": "Look for UNHCR checkpoints, Red Cross/Crescent, or official evacuation routes."
      },
      "separated": {
        "comfort": "Being separated doesn't mean lost forever.",
        "message": "Being cut off from the people you love in chaos is one of the deepest fears we can face. Many families separated in conflict are eventually reunited. Keep your phone charged if possible. Register with authorities so others can find you.",
        "action": "ICRC Family Links: familylinks.icrc.org — register yourself and search for family."
      },
      "witness": {
        "comfort": "What you saw was real. Your pain is real.",
        "message": "Witnessing violence leaves a mark that words can barely hold. What you're experiencing — the images, the shock — is a normal response to an abnormal event. You are not broken.",
        "grounding": "When images come unbidden: press your feet to the ground, say your name aloud, name where you are. You are here. You are now."
      },
      "lost": {
        "comfort": "You are still here. That is not nothing.",
        "message": "When you lose everything and everyone, the weight can feel unsurvivable. But you are reading this, which means you are still here. Right now, your only task is to keep yourself alive and find one safe place.",
        "action": "Contact UNHCR (unhcr.org), Red Cross, or local humanitarian organizations for immediate support."
      }
    },
    "accident": {
      "shock": {
        "comfort": "It happened. You are still here.",
        "message": "Shock after an accident is your mind and body's emergency response. Everything may feel unreal right now. That's normal. Don't push yourself to process what happened yet. Focus on whether you are physically safe.",
        "action": "Call emergency services if needed. Don't drive. Find someone to be with you."
      },
      "violated": {
        "comfort": "This was not your fault. Not even a little.",
        "message": "Being hurt or attacked by another person violates something deep. Whatever happened, you did not deserve it. Your feelings right now — fear, anger, shame, confusion — are all completely valid.",
        "action": "You can contact local police, a crisis line, or a trusted person. You choose who knows and when."
      },
      "frozen": {
        "comfort": "Freezing is survival. Your body protected you.",
        "message": "When the body freezes, it's not weakness — it's one of the oldest survival responses we have. You didn't fail. Your nervous system did exactly what it was built to do. The freeze will pass.",
        "grounding": "Slowly wiggle your fingers and toes. Press your palms together. Take one slow breath. You are here."
      },
      "angry": {
        "comfort": "Your anger is justified. Feel it.",
        "message": "Anger after violence or injustice is not only normal — it's healthy. It means you know this was wrong. Don't let anyone tell you to calm down. Your anger is information: this should not have happened to you.",
        "action": "When you're ready: consider reporting to authorities, speaking to a counselor, or contacting a victim support line."
      },
      "silent": {
        "comfort": "You don't have to tell anyone right now.",
        "message": "You get to decide who knows, when they know, and how much they know. You are not obligated to speak before you're ready. When you're ready, there are people who will listen without judgment.",
        "action": "Crisis Text Line: text HOME to 741741 (US/UK/CA/IE). Korea: 1393. France: 3114."
      }
    },
    "loss": {
      "unreal": {
        "comfort": "It's okay that it doesn't feel real yet.",
        "message": "The mind often protects us from the full force of loss by making it feel unreal at first. This is not denial — it's how we survive the unsurvivable. You don't have to feel it all at once. The grief will come in its own time."
      },
      "miss": {
        "comfort": "Missing them this much means they mattered.",
        "message": "Grief that lives in the body — the ache, the physical weight of missing someone — is one of the truest forms of love. It hurts this much because they mattered this much. You don't need to move on quickly."
      },
      "alone": {
        "comfort": "You are not as alone as it feels right now.",
        "message": "Loss can make the whole world feel empty. That feeling of aloneness is real and valid. And yet you are still connected to others, even if it doesn't feel that way. Reaching out — even a small message — can help.",
        "action": "Is there one person you could contact right now? Just to say you're having a hard time?"
      },
      "why": {
        "comfort": "You may never have a satisfying answer. That's not your fault.",
        "message": "When someone is taken suddenly, the 'why' can become consuming. Some losses simply don't make sense, and that's one of the hardest things to accept."
      },
      "numb": {
        "comfort": "Numbness is grief too.",
        "message": "Not feeling anything after loss is not coldness or failure to love. It's often the first layer of grief — the body's way of absorbing something too large to take in all at once. The feelings will come."
      }
    },
    "refugee": {
      "home": {
        "comfort": "Leaving was an act of courage.",
        "message": "Leaving behind everything you know is one of the deepest losses a human being can experience. You did not leave because you wanted to. You left because you had to. That distinction matters.",
        "action": "Register with UNHCR as soon as possible: unhcr.org"
      },
      "separated": {
        "comfort": "Separation is not the end of your family.",
        "message": "Families separated by displacement are found and reunited every day. Register yourself everywhere you can so you can be found.",
        "action": "ICRC Family Links: familylinks.icrc.org — register and search. UNHCR can also assist."
      },
      "shelter": {
        "comfort": "Finding shelter tonight is the only goal right now.",
        "message": "Everything else can wait. Right now, the one thing that matters is finding a safe place to rest. You are allowed to focus on just this one thing.",
        "action": "Look for UNHCR registration points, local shelters, churches/mosques/temples, or ask police for refugee services."
      },
      "language": {
        "comfort": "Not speaking the language doesn't make you invisible.",
        "message": "You have rights even when you cannot speak the language. Humanitarian workers are trained to help people who don't speak the local language.",
        "action": "Show this to someone: 'I need help. I am a refugee/displaced person. Please contact UNHCR or local authorities.'"
      },
      "future": {
        "comfort": "You cannot see the future yet. That is okay.",
        "message": "When you have lost everything, the future can feel like a wall of darkness. You don't need to see the whole path right now. One day. One step.",
        "action": "Connect with UNHCR or local refugee support organizations — they can help you build next steps."
      }
    },
    "isolation": {
      "noone": {
        "comfort": "You reached out here. That took courage.",
        "message": "Being physically alone in a crisis is one of the hardest situations. But you are not invisible — you are here, and you reached out. Try to make yourself visible to someone: move toward people, toward light, toward sound.",
        "action": "Call emergency services if you are in danger. Crisis Text Line: text HOME to 741741."
      },
      "contact": {
        "comfort": "Keep trying. Someone will answer.",
        "message": "When you cannot reach anyone, the silence can feel like abandonment. It is not. Networks get overwhelmed in crises. Keep trying — vary who you contact, try different methods.",
        "action": "Try: emergency services (112/911), local radio, social media posts with your location."
      },
      "unseen": {
        "comfort": "You are seen here, in this moment.",
        "message": "When no one knows what you're going through, it adds a layer of loneliness on top of crisis. Your experience is real even if no one around you knows it. Try to tell someone — even one person, even briefly."
      },
      "give_up": {
        "comfort": "Please stay. This moment will pass.",
        "message": "When you feel like giving up, it usually means you've been carrying too much for too long without enough support. That's not a character flaw — it's an impossible weight. You deserve help. Please reach out to someone who can be with you right now.",
        "action": "Korea: 1393 · France: 3114 · Crisis Text Line: text HOME to 741741 · International: iasp.info/resources/Crisis_Centres/"
      },
      "presence": {
        "comfort": "You don't have to go through this alone.",
        "message": "Wanting someone to simply be there is one of the most human needs we have. That need is valid. You deserve presence.",
        "action": "Is there one person — even someone you haven't spoken to in a while — you could reach out to right now?"
      }
    },
    "panic": {
      "breath": {
        "comfort": "You are breathing. Stay with the breath.",
        "message": "When panic tightens the chest, the breath becomes the anchor. You don't need to breathe perfectly — just a little slower than you are now.",
        "grounding": "Breathe in for 4 counts. Hold for 4. Out for 6. Again. And again."
      },
      "shaking": {
        "comfort": "The shaking is your body releasing. Let it.",
        "message": "Trembling after shock is not weakness — it's your nervous system discharging the excess energy of extreme stress. Don't try to stop it. Let your body do what it needs to do.",
        "grounding": "Sit or lie down if you can. Press your back against something solid. Feel the support beneath you."
      },
      "blank": {
        "comfort": "A blank mind is a mind that survived something.",
        "message": "When the mind goes blank, it's often protecting itself from overload. You don't need to think clearly right now. Just stay where you are and let the blankness be.",
        "grounding": "Name 5 things you can see. 4 you can touch. 3 you can hear. 2 you can smell. 1 you can taste."
      },
      "crying": {
        "comfort": "Let the tears come. They are doing something.",
        "message": "Crying is not falling apart — it's one of the body's most effective ways of processing overwhelming emotion. Let yourself cry without judging it. You are not weak. You are human.",
        "grounding": "If you need to slow down: press a cold cloth to your face, or hold something cold in your hands."
      },
      "nothing": {
        "comfort": "Not wanting anything is okay right now.",
        "message": "After extreme stress or shock, the desire to do nothing is a completely valid response. Your system is overwhelmed and asking for rest. You don't have to recover quickly. Just stay safe and let yourself rest.",
        "grounding": "Find the most comfortable position you can. Close your eyes if it feels safe. Just breathe."
      }
    }
  },
  "ko": {
    "disaster": {
      "numb": {
        "comfort": "살아있습니다. 그것으로 충분합니다.",
        "message": "지금 느끼는 무감각함과 공허함은 압도적인 상황에 대한 완전히 정상적인 반응입니다. 당신의 마음이 당신을 보호하고 있는 것입니다. 지금 당장 무언가를 느껴야 할 필요는 없습니다. 그냥 숨을 쉬세요.",
        "action": "즉각적인 도움이 필요하면: 지역 긴급구조대 또는 대한적십자사에 연락하세요."
      },
      "scared": {
        "comfort": "두려움은 당연합니다. 당신은 살아남았습니다.",
        "message": "몸이 떨리는 것은 당연합니다. 당신이 겪은 것은 정말 무서운 일이었고, 당신의 몸은 정확히 그래야 할 대로 반응하고 있습니다. 당신은 약한 것이 아닙니다. 당신은 인간이고, 엄청난 것을 견뎌냈습니다.",
        "grounding": "이렇게 해보세요: 발을 바닥에 단단히 딛으세요. 바닥의 감촉을 느끼세요. 지금 보이는 것 3가지를 말해보세요."
      },
      "family": {
        "comfort": "가족을 찾으려는 사랑이 당신을 이끌고 있습니다.",
        "message": "가족이 어디 있는지 모르는 것은 사람이 직면할 수 있는 가장 힘든 상황 중 하나입니다. 재난 중에 많은 가족이 헤어지지만 다시 만납니다. 계속 연락을 시도하고, 당국에 가족과 헤어졌다고 알리세요.",
        "action": "적십자 이산가족 찾기: familylinks.icrc.org"
      },
      "lost": {
        "comfort": "많은 것을 잃었습니다. 하지만 당신은 남아있습니다.",
        "message": "집과 소지품을 잃는 것은 깊은 슬픔입니다. 깊이 슬퍼해도 됩니다. 지금 당장 가장 중요한 것은: 안전하게 있고, 피난처를 찾고, 물을 찾는 것입니다.",
        "action": "지역 재난구호기관 또는 피난처가 필요하면 UNHCR(unhcr.org)에 연락하세요."
      },
      "hurt": {
        "comfort": "도움을 구하는 것은 옳은 일입니다.",
        "message": "누군가가 다친 것을 보는 것은 매우 고통스럽습니다. 최대한 침착하게 있으세요. 한 가지에 집중하세요: 최대한 빨리 도움을 받는 것.",
        "action": "즉시 긴급구조대에 전화하세요 (119). 가능하면 다친 사람을 움직이지 않게 하고 따뜻하게 해주세요."
      }
    },
    "conflict": {
      "heard": {
        "comfort": "들었습니다. 살아남았습니다.",
        "message": "폭발음이나 총소리는 몸과 마음에 오래 남는 흔적을 남깁니다. 당신의 두려움은 완전히 정당합니다. 지금 가장 중요한 것은 신체적 안전입니다. 몸을 낮추고, 엄폐물을 찾으세요.",
        "action": "안전하다면: 튼튼한 건물로 이동하고 창문에서 멀어지세요. UNHCR이나 지역 긴급구조대에 연락하세요."
      },
      "fleeing": {
        "comfort": "피난은 생존입니다. 당신은 용감합니다.",
        "message": "피난을 결정하는 것은 사람이 내릴 수 있는 가장 어려운 결정 중 하나입니다. 도망치는 것이 아닙니다 — 삶을 선택하는 것입니다. 정확히 어디로 가야 할지 아직 모르는 것은 괜찮습니다. 다음 한 걸음에 집중하세요.",
        "action": "UNHCR 체크포인트, 적십자/적신월사, 또는 공식 대피 경로를 찾으세요."
      },
      "separated": {
        "comfort": "헤어진 것이 영원히 잃은 것은 아닙니다.",
        "message": "분쟁 중에 헤어진 많은 가족들이 결국 재결합합니다. 가능하면 휴대폰을 충전해 두세요. 당국에 등록하여 다른 사람들이 당신을 찾을 수 있게 하세요.",
        "action": "ICRC 이산가족 찾기: familylinks.icrc.org — 등록하고 가족을 검색하세요."
      },
      "witness": {
        "comfort": "당신이 본 것은 실제였습니다. 당신의 고통도 실제입니다.",
        "message": "폭력이나 죽음을 목격하는 것은 말로 담기 어려운 흔적을 남깁니다. 지금 경험하는 것들은 비정상적인 사건에 대한 정상적인 반응입니다. 당신은 부서진 것이 아닙니다.",
        "grounding": "이미지가 갑자기 떠오를 때: 발을 바닥에 딛고, 자신의 이름을 소리내어 말하고, 지금 있는 곳을 말하세요."
      },
      "lost": {
        "comfort": "당신은 아직 여기 있습니다. 그것은 작은 일이 아닙니다.",
        "message": "모든 것과 모든 사람을 잃었을 때, 그 무게는 견딜 수 없을 것처럼 느껴집니다. 하지만 당신은 이것을 읽고 있습니다. 지금 당신의 유일한 과제는: 살아있는 것과 안전한 곳을 찾는 것입니다.",
        "action": "즉각적인 지원을 위해 UNHCR(unhcr.org), 적십자, 또는 지역 인도주의 기관에 연락하세요."
      }
    },
    "accident": {
      "shock": {
        "comfort": "일어났습니다. 당신은 아직 여기 있습니다.",
        "message": "사고 후 충격은 마음과 몸의 비상 반응입니다. 모든 것이 비현실적으로 느껴질 수 있습니다. 정상입니다. 지금 있는 곳과 신체적으로 안전한지에만 집중하세요.",
        "action": "필요하면 긴급구조대에 전화하세요 (112/119). 운전하지 마세요. 함께 있어줄 사람을 찾으세요."
      },
      "violated": {
        "comfort": "이것은 당신의 잘못이 아닙니다. 전혀.",
        "message": "다른 사람에게 다치거나 공격당하는 것은 깊은 것을 침범합니다. 무슨 일이 있었든, 당신은 그럴 자격이 없었습니다. 지금 느끼는 감정들은 모두 완전히 타당합니다.",
        "action": "경찰, 위기상담전화, 또는 신뢰하는 사람에게 연락할 수 있습니다. 누가 알고 언제 알지는 당신이 결정합니다."
      },
      "frozen": {
        "comfort": "굳어버린 것은 생존입니다. 몸이 당신을 보호했습니다.",
        "message": "몸이 굳는 것은 약함이 아닙니다 — 극한 상황에서 인간이 가진 가장 오래된 생존 반응 중 하나입니다. 당신은 실패한 것이 아닙니다. 굳음은 지나갑니다.",
        "grounding": "천천히 손가락과 발가락을 움직여보세요. 손바닥을 맞대어 보세요. 천천히 숨을 한 번 쉬세요."
      },
      "angry": {
        "comfort": "당신의 분노는 정당합니다. 느끼세요.",
        "message": "폭력이나 부당함 후의 분노는 정상일 뿐 아니라 건강한 것입니다. 이것이 잘못된 일임을 알고 있다는 의미입니다. 진정하라는 말을 듣지 마세요.",
        "action": "준비가 되면: 당국에 신고하거나, 상담사와 대화하거나, 피해자 지원 전화에 연락하는 것을 고려해보세요."
      },
      "silent": {
        "comfort": "지금 당장 아무에게도 말하지 않아도 됩니다.",
        "message": "누가 알고, 언제 알고, 얼마나 알지를 결정하는 것은 당신입니다. 준비되기 전에 말할 의무는 없습니다. 준비가 되면 판단 없이 들어줄 사람들이 있습니다.",
        "action": "자살예방상담전화: 1393 (24시간) · 정신건강위기상담전화: 1577-0199"
      }
    },
    "loss": {
      "unreal": {
        "comfort": "아직 실감이 안 나도 괜찮습니다.",
        "message": "마음은 처음에는 상실의 전체적인 충격을 비현실적으로 느끼게 함으로써 우리를 보호하는 경우가 많습니다. 이것은 부정이 아닙니다 — 견딜 수 없는 것을 견디는 방식입니다. 한꺼번에 모든 것을 느낄 필요는 없습니다."
      },
      "miss": {
        "comfort": "이렇게 보고 싶다는 것은 그만큼 소중했다는 뜻입니다.",
        "message": "몸에 사는 슬픔 — 그리움의 아픔, 누군가를 그리워하는 물리적 무게 — 은 가장 진실한 사랑의 형태 중 하나입니다. 이렇게 아픈 것은 그만큼 소중했기 때문입니다. 빨리 좋아지거나 앞으로 나아갈 필요가 없습니다."
      },
      "alone": {
        "comfort": "지금 느끼는 것만큼 혼자가 아닙니다.",
        "message": "상실은 온 세상을 가득 채워주던 한 사람이 없는 것처럼 느끼게 합니다. 그 외로움은 실제이고 타당합니다. 작은 연락 — 문자, 전화 — 이 도움이 될 수 있습니다.",
        "action": "지금 연락할 수 있는 한 사람이 있나요? 힘든 시간을 보내고 있다고 말하기 위해?"
      },
      "why": {
        "comfort": "만족스러운 답을 찾지 못할 수도 있습니다. 그것은 당신의 잘못이 아닙니다.",
        "message": "누군가가 갑자기 떠났을 때, '왜'라는 질문이 머릿속을 지배할 수 있습니다. 어떤 상실은 그냥 말이 되지 않습니다. 그것을 받아들이는 것이 가장 힘든 일 중 하나입니다."
      },
      "numb": {
        "comfort": "무감각함도 슬픔입니다.",
        "message": "상실 후 아무것도 느끼지 못하는 것은 냉정함이나 사랑의 실패가 아닙니다. 그것은 종종 슬픔의 첫 번째 층입니다. 감정은 올 것입니다. 그때까지 무감각함은 괜찮습니다."
      }
    },
    "refugee": {
      "home": {
        "comfort": "떠나는 것은 용기 있는 행동이었습니다.",
        "message": "당신이 아는 모든 것을 뒤에 남겨두는 것은 인간이 경험할 수 있는 가장 깊은 상실 중 하나입니다. 원해서 떠난 것이 아닙니다. 어쩔 수 없어서 떠났습니다. 그 차이가 중요합니다.",
        "action": "가능한 빨리 UNHCR에 등록하세요: unhcr.org"
      },
      "separated": {
        "comfort": "헤어짐이 가족의 끝은 아닙니다.",
        "message": "이주로 헤어진 가족들은 매일 찾아지고 재결합합니다. 찾을 수 있도록 모든 곳에 당신을 등록하세요.",
        "action": "ICRC 이산가족 찾기: familylinks.icrc.org"
      },
      "shelter": {
        "comfort": "오늘 밤 피난처를 찾는 것이 지금의 유일한 목표입니다.",
        "message": "나머지 모든 것은 기다릴 수 있습니다. 지금 중요한 단 하나는 안전하게 쉴 곳을 찾는 것입니다. 지금은 이 한 가지에만 집중해도 됩니다.",
        "action": "UNHCR 등록 지점, 지역 쉼터, 교회/모스크/사원, 또는 경찰에게 난민 서비스 방향을 물어보세요."
      },
      "language": {
        "comfort": "언어가 안 통해도 당신은 보이지 않는 존재가 아닙니다.",
        "message": "언어를 못 해도 당신에게는 권리가 있습니다. 인도주의 활동가들은 현지 언어를 못 하는 사람들을 돕도록 훈련받았습니다.",
        "action": "이것을 누군가에게 보여주세요: '도움이 필요합니다. 저는 난민/이재민입니다. UNHCR이나 지역 당국에 연락해 주세요.'"
      },
      "future": {
        "comfort": "아직 미래가 보이지 않아도 괜찮습니다.",
        "message": "모든 것을 잃고 삶에서 뿌리 뽑혔을 때, 미래는 어둠의 벽처럼 느껴질 수 있습니다. 지금 전체 길을 볼 필요는 없습니다. 하루. 한 걸음.",
        "action": "UNHCR이나 지역 난민 지원 기관과 연결하세요."
      }
    },
    "isolation": {
      "noone": {
        "comfort": "여기 연락하셨습니다. 용기 있는 행동입니다.",
        "message": "위기 중에 신체적으로 혼자인 것은 가장 힘든 상황 중 하나입니다. 하지만 당신은 보이지 않는 존재가 아닙니다. 사람들을 향해, 빛을 향해, 소리를 향해 이동해보세요.",
        "action": "위험하다면 긴급구조대에 전화하세요 (112). 자살예방상담전화: 1393 (24시간)"
      },
      "contact": {
        "comfort": "계속 시도하세요. 누군가 받을 것입니다.",
        "message": "아무에게도 연락이 안 될 때, 그 침묵은 버림받은 것처럼 느껴질 수 있습니다. 그렇지 않습니다. 위기 중에는 네트워크가 과부하됩니다. 연락하는 사람을 바꾸거나 다른 방법을 써보세요.",
        "action": "시도해보세요: 긴급구조대(112/119), 지역 라디오, 위치와 함께 SNS 게시."
      },
      "unseen": {
        "comfort": "이 순간, 여기서 당신은 보입니다.",
        "message": "아무도 당신이 무엇을 겪고 있는지 모를 때, 위기 위에 외로움이 더해집니다. 당신의 경험은 실제입니다. 한 사람에게라도 말해보려 해보세요."
      },
      "give_up": {
        "comfort": "부탁드립니다, 여기 계세요. 이 순간은 지나갑니다.",
        "message": "포기하고 싶을 때, 그것은 보통 충분한 지원 없이 너무 오래 너무 많이 짊어져왔다는 의미입니다. 성격의 결함이 아닙니다. 당신은 도움받을 자격이 있습니다.",
        "action": "자살예방상담전화: 1393 (24시간) · 정신건강위기상담전화: 1577-0199 · 청소년상담전화: 1388"
      },
      "presence": {
        "comfort": "혼자 견디지 않아도 됩니다.",
        "message": "그냥 곁에 있어주기를 원하는 것은 인간의 가장 근본적인 필요 중 하나입니다. 그 필요는 타당합니다. 당신은 곁에 있어줄 사람을 받을 자격이 있습니다.",
        "action": "한동안 연락하지 않은 사람이라도 — 지금 연락할 수 있는 한 사람이 있나요?"
      }
    },
    "panic": {
      "breath": {
        "comfort": "숨을 쉬고 있습니다. 숨에 집중하세요.",
        "message": "공황이 가슴을 죄어올 때, 숨이 닻이 됩니다. 완벽하게 숨 쉴 필요는 없습니다 — 지금보다 조금만 천천히 쉬면 됩니다.",
        "grounding": "4를 세며 들이쉬세요. 4를 세며 참으세요. 6을 세며 내쉬세요. 다시. 또 다시."
      },
      "shaking": {
        "comfort": "떨림은 몸이 해소하는 것입니다. 그대로 두세요.",
        "message": "충격이나 공포 후 떨리는 것은 약함이 아닙니다 — 극도의 스트레스의 과잉 에너지를 방출하는 신경계가 정확히 해야 할 일을 하는 것입니다.",
        "grounding": "가능하면 앉거나 누우세요. 등을 단단한 것에 기대세요. 아래의 지지를 느끼세요."
      },
      "blank": {
        "comfort": "머리가 하얘진 것은 살아남은 마음입니다.",
        "message": "마음이 하얘지면, 그것은 종종 과부하로부터 스스로를 보호하는 것입니다. 지금 명확하게 생각할 필요가 없습니다. 그냥 있는 곳에 있으세요.",
        "grounding": "볼 수 있는 것 5가지. 만질 수 있는 것 4가지. 들을 수 있는 것 3가지. 냄새 맡을 수 있는 것 2가지. 맛볼 수 있는 것 1가지."
      },
      "crying": {
        "comfort": "눈물이 오도록 두세요. 눈물은 무언가를 하고 있습니다.",
        "message": "우는 것은 무너지는 것이 아닙니다 — 압도적인 감정을 처리하는 몸의 가장 효과적인 방법 중 하나입니다. 판단하지 말고 울도록 두세요.",
        "grounding": "속도를 늦추고 싶다면: 차가운 수건을 얼굴에 대거나, 차가운 것을 손에 쥐어보세요."
      },
      "nothing": {
        "comfort": "지금 아무것도 원하지 않는 것은 괜찮습니다.",
        "message": "극도의 스트레스나 충격 후, 아무것도 하고 싶지 않은 욕구는 완전히 타당한 반응입니다. 시스템이 과부하되어 휴식을 요청하고 있습니다. 생산적일 필요가 없습니다. 그냥 안전하게 있고 쉬세요.",
        "grounding": "가장 편한 자세를 찾으세요. 안전하다면 눈을 감으세요. 그냥 숨을 쉬세요."
      }
    }
  },
  "fr": {
    "disaster": {
      "numb": {
        "comfort": "Vous êtes en vie. C'est ce qui compte.",
        "message": "Ce que vous ressentez — l'engourdissement, le vide — est une réponse tout à fait normale à quelque chose d'écrasant. Votre esprit vous protège. Respirez simplement.",
        "action": "Si vous avez besoin d'aide: contactez les services d'urgence ou la Croix-Rouge."
      },
      "scared": {
        "comfort": "Votre peur est tout à fait normale.",
        "message": "Bien sûr que vous tremblez. Ce que vous avez vécu était terrifiant, et votre corps réagit exactement comme il le devrait. Ce tremblement est votre système nerveux qui fait son travail. Vous n'êtes pas faible.",
        "grounding": "Appuyez fermement vos pieds sur le sol. Sentez la surface sous vous. Nommez 3 choses que vous voyez maintenant."
      },
      "family": {
        "comfort": "L'amour qui vous pousse à les chercher est réel.",
        "message": "Ne pas savoir où est votre famille peut être la chose la plus difficile à affronter. Beaucoup de familles sont séparées lors de catastrophes et se retrouvent. Continuez à essayer de les joindre.",
        "action": "Croix-Rouge Liens familiaux: familylinks.icrc.org"
      },
      "lost": {
        "comfort": "Vous avez perdu des choses. Vous êtes toujours là.",
        "message": "Perdre sa maison est un deuil profond. Il est normal de le ressentir intensément. En ce moment: rester en sécurité, trouver un abri, trouver de l'eau.",
        "action": "Contactez les organisations de secours locales ou le HCR (unhcr.org)."
      },
      "hurt": {
        "comfort": "Vous faites ce qu'il faut en cherchant de l'aide.",
        "message": "Voir quelqu'un de blessé est profondément pénible. Restez aussi calme que vous pouvez. Concentrez-vous sur une chose: obtenir de l'aide le plus rapidement possible.",
        "action": "Appelez le 15 (SAMU) ou le 18 (pompiers) immédiatement."
      }
    },
    "conflict": {
      "heard": {
        "comfort": "Vous avez entendu. Vous avez survécu.",
        "message": "Entendre des explosions laisse une empreinte durable. Votre peur est tout à fait justifiée. En ce moment, l'essentiel est votre sécurité physique. Baissez-vous, trouvez un abri.",
        "action": "Déplacez-vous vers un bâtiment solide. Contactez le HCR ou les services d'urgence."
      },
      "fleeing": {
        "comfort": "Fuir c'est survivre. Vous êtes courageux(se).",
        "message": "La décision de fuir est l'une des plus difficiles. Vous ne fuyez pas — vous choisissez la vie. Il est normal de ne pas savoir exactement où aller. Concentrez-vous sur le prochain pas.",
        "action": "Cherchez des points de contrôle du HCR ou des voies d'évacuation officielles."
      },
      "separated": {
        "comfort": "Être séparé(e) ne signifie pas perdu(e) pour toujours.",
        "message": "Beaucoup de familles séparées par des conflits finissent par se retrouver. Gardez votre téléphone chargé si possible. Inscrivez-vous auprès des autorités.",
        "action": "CICR Liens familiaux: familylinks.icrc.org"
      },
      "witness": {
        "comfort": "Ce que vous avez vu était réel. Votre douleur est réelle.",
        "message": "Être témoin de violence laisse une marque que les mots peinent à contenir. Ce que vous vivez est une réponse normale à un événement anormal. Vous n'êtes pas brisé(e).",
        "grounding": "Quand des images surgissent: appuyez vos pieds sur le sol, dites votre nom à voix haute, nommez où vous êtes."
      },
      "lost": {
        "comfort": "Vous êtes toujours là. Ce n'est pas rien.",
        "message": "Quand on perd tout et tout le monde, le poids peut sembler insupportable. Mais vous lisez ceci. En ce moment, votre seule tâche est de rester en vie et de trouver un endroit sûr.",
        "action": "Contactez le HCR, la Croix-Rouge ou des organisations humanitaires locales."
      }
    },
    "accident": {
      "shock": {
        "comfort": "C'est arrivé. Vous êtes toujours là.",
        "message": "Le choc après un accident est la réponse d'urgence de votre esprit et de votre corps. Tout peut sembler irréel. C'est normal. Concentrez-vous sur l'endroit où vous êtes et si vous êtes physiquement en sécurité.",
        "action": "Appelez le 15 ou le 18 si nécessaire. Ne conduisez pas. Trouvez quelqu'un pour être avec vous."
      },
      "violated": {
        "comfort": "Ce n'est pas votre faute. Pas du tout.",
        "message": "Être blessé(e) ou attaqué(e) viole quelque chose de profond. Quoi qu'il se soit passé, vous ne le méritez pas. Vos sentiments maintenant — peur, colère, honte, confusion — sont tous valides.",
        "action": "Vous pouvez contacter la police (17), une ligne de crise, ou une personne de confiance. Vous choisissez qui sait et quand."
      },
      "frozen": {
        "comfort": "Se figer c'est survivre. Votre corps vous a protégé(e).",
        "message": "Se figer n'est pas une faiblesse — c'est l'une des réponses de survie les plus anciennes. Vous n'avez pas échoué. Le gel passera.",
        "grounding": "Bougez lentement vos doigts et orteils. Pressez vos paumes ensemble. Prenez une lente inspiration."
      },
      "angry": {
        "comfort": "Votre colère est justifiée. Ressentez-la.",
        "message": "La colère après la violence est non seulement normale — elle est saine. Cela signifie que vous savez que c'était mal. Ne laissez personne vous dire de vous calmer.",
        "action": "Quand vous êtes prêt(e): envisagez de signaler aux autorités ou de parler à un(e) conseiller(ère)."
      },
      "silent": {
        "comfort": "Vous n'avez pas à le dire à quelqu'un maintenant.",
        "message": "Vous décidez qui sait, quand et combien. Vous n'êtes pas obligé(e) de parler avant d'être prêt(e). Quand vous serez prêt(e), des personnes écouteront sans jugement.",
        "action": "France: 3114 (Numéro National Prévention Suicide, 24h/24)"
      }
    },
    "loss": {
      "unreal": {
        "comfort": "C'est normal que ça ne semble pas réel encore.",
        "message": "L'esprit nous protège souvent en rendant la perte irréelle au début. Ce n'est pas du déni — c'est la façon dont nous survivons à l'insupportable. Le deuil viendra en son temps."
      },
      "miss": {
        "comfort": "Le manque à cette intensité prouve combien ils comptaient.",
        "message": "Le deuil qui vit dans le corps — cette douleur physique du manque — est l'une des formes d'amour les plus vraies. Ça fait si mal parce qu'ils comptaient autant."
      },
      "alone": {
        "comfort": "Vous n'êtes pas aussi seul(e) que ça semble.",
        "message": "La perte peut rendre le monde entier vide. Ce sentiment de solitude est réel et valide. Vous êtes encore connecté(e) aux autres. Tendre la main — même un court message — peut aider.",
        "action": "Y a-t-il une personne que vous pourriez contacter maintenant?"
      },
      "why": {
        "comfort": "Vous n'aurez peut-être jamais de réponse satisfaisante. Ce n'est pas votre faute.",
        "message": "Quand quelqu'un est soudainement parti, le 'pourquoi' peut devenir obsédant. Certaines pertes n'ont tout simplement pas de sens, et c'est l'une des choses les plus difficiles à accepter."
      },
      "numb": {
        "comfort": "L'engourdissement est aussi du deuil.",
        "message": "Ne rien ressentir après une perte n'est pas de la froideur. C'est souvent la première couche du deuil. Les sentiments viendront."
      }
    },
    "refugee": {
      "home": {
        "comfort": "Partir était un acte de courage.",
        "message": "Laisser derrière soi tout ce que vous connaissez est l'une des pertes les plus profondes. Vous n'êtes pas parti(e) parce que vous le vouliez. Cette distinction compte.",
        "action": "Inscrivez-vous au HCR dès que possible: unhcr.org"
      },
      "separated": {
        "comfort": "La séparation n'est pas la fin de votre famille.",
        "message": "Les familles séparées par le déplacement se retrouvent chaque jour. Inscrivez-vous partout pour pouvoir être trouvé(e).",
        "action": "CICR Liens familiaux: familylinks.icrc.org"
      },
      "shelter": {
        "comfort": "Trouver un abri ce soir est le seul objectif maintenant.",
        "message": "Tout le reste peut attendre. En ce moment, une seule chose compte: trouver un endroit sûr pour se reposer.",
        "action": "Cherchez des points HCR, des abris locaux, ou demandez à la police."
      },
      "language": {
        "comfort": "Ne pas parler la langue ne vous rend pas invisible.",
        "message": "Vous avez des droits même si vous ne parlez pas la langue. Les travailleurs humanitaires sont formés pour aider.",
        "action": "Montrez ceci à quelqu'un: 'J'ai besoin d'aide. Je suis réfugié(e). Contactez le HCR ou les autorités locales.'"
      },
      "future": {
        "comfort": "Vous ne pouvez pas encore voir l'avenir. C'est normal.",
        "message": "Quand vous avez tout perdu, l'avenir peut sembler un mur d'obscurité. Vous n'avez pas besoin de voir tout le chemin maintenant. Un jour. Un pas.",
        "action": "Connectez-vous au HCR ou aux organisations de soutien aux réfugiés locales."
      }
    },
    "isolation": {
      "noone": {
        "comfort": "Vous avez contacté ici. Ça demande du courage.",
        "message": "Être physiquement seul(e) dans une crise est l'une des situations les plus difficiles. Vous n'êtes pas invisible. Bougez vers des gens, vers la lumière.",
        "action": "Appelez le 112 si vous êtes en danger. France: 3114"
      },
      "contact": {
        "comfort": "Continuez d'essayer. Quelqu'un répondra.",
        "message": "Les réseaux sont surchargés en crise. Continuez à essayer — variez qui vous contactez, essayez différentes méthodes.",
        "action": "Essayez: services d'urgence (112), radio locale, publications sur les réseaux sociaux avec votre localisation."
      },
      "unseen": {
        "comfort": "Vous êtes vu(e) ici, en ce moment.",
        "message": "Quand personne ne sait ce que vous traversez, une couche de solitude s'ajoute. Votre expérience est réelle. Essayez de le dire à quelqu'un — même brièvement."
      },
      "give_up": {
        "comfort": "S'il vous plaît, restez. Ce moment passera.",
        "message": "Vouloir abandonner signifie généralement que vous portez trop depuis trop longtemps sans assez de soutien. Vous méritez de l'aide. Veuillez contacter quelqu'un qui peut être avec vous maintenant.",
        "action": "France: 3114 · International: iasp.info/resources/Crisis_Centres/"
      },
      "presence": {
        "comfort": "Vous n'avez pas à traverser ça seul(e).",
        "message": "Vouloir que quelqu'un soit simplement là est l'un des besoins les plus humains. Ce besoin est valide. Vous méritez une présence.",
        "action": "Y a-t-il une personne — même quelqu'un que vous n'avez pas contacté depuis un moment — que vous pourriez appeler?"
      }
    },
    "panic": {
      "breath": {
        "comfort": "Vous respirez. Restez avec le souffle.",
        "message": "Quand la panique serre la poitrine, le souffle devient l'ancre. Vous n'avez pas besoin de respirer parfaitement — juste un peu plus lentement qu'en ce moment.",
        "grounding": "Inspirez sur 4 temps. Retenez sur 4. Expirez sur 6. Encore. Et encore."
      },
      "shaking": {
        "comfort": "Les tremblements sont votre corps qui se libère. Laissez-le.",
        "message": "Trembler après un choc n'est pas une faiblesse — c'est votre système nerveux qui libère l'énergie du stress extrême. Ne cherchez pas à l'arrêter.",
        "grounding": "Asseyez-vous ou allongez-vous si vous pouvez. Appuyez votre dos contre quelque chose de solide."
      },
      "blank": {
        "comfort": "Un esprit vide est un esprit qui a survécu.",
        "message": "Quand l'esprit se vide, il se protège souvent de la surcharge. Vous n'avez pas besoin de penser clairement maintenant. Restez juste là où vous êtes.",
        "grounding": "Nommez 5 choses que vous voyez. 4 que vous touchez. 3 que vous entendez. 2 que vous sentez. 1 que vous goûtez."
      },
      "crying": {
        "comfort": "Laissez les larmes venir. Elles font quelque chose.",
        "message": "Pleurer n'est pas s'effondrer — c'est l'une des façons les plus efficaces du corps de traiter une émotion écrasante. Laissez-vous pleurer sans jugement.",
        "grounding": "Pour ralentir: posez un tissu froid sur votre visage, ou tenez quelque chose de froid dans vos mains."
      },
      "nothing": {
        "comfort": "Ne rien vouloir est normal maintenant.",
        "message": "Après un stress ou un choc extrême, le désir de ne rien faire est une réponse tout à fait valide. Votre système demande du repos. Restez en sécurité et reposez-vous.",
        "grounding": "Trouvez la position la plus confortable possible. Fermez les yeux si ça semble sûr. Respirez simplement."
      }
    }
  },
  "sw": {
    "disaster": {
      "numb": {
        "comfort": "Uko hai. Hiyo inatosha.",
        "message": "Unachohisi sasa hivi — kutohisi kitu chochote, utupu — ni jibu la kawaida kabisa. Akili yako inakuinda. Huhitaji kuhisi chochote maalum sasa hivi. Pumua tu.",
        "action": "Ukihitaji msaada wa haraka: wasiliana na huduma za dharura za karibu au Msalaba Mwekundu."
      },
      "scared": {
        "comfort": "Hofu yako ina maana kabisa.",
        "message": "Bila shaka unatetemeka. Ulichopitia kilikuwa cha kutisha, na mwili wako unajibu hasa jinsi unavyopaswa. Wewe si dhaifu. Wewe ni mwanadamu, na umeokoka.",
        "grounding": "Shindilia miguu yako imara kwenye ardhi. Hisi uso wa chini yako. Taja vitu 3 unavyoviona sasa hivi."
      },
      "family": {
        "comfort": "Upendo unaokusukuma kuwatafuta ni wa kweli.",
        "message": "Kutojua familia yako ipo wapi ni jambo gumu zaidi kukabiliana nalo. Familia nyingi zinatengwa katika maafa na zinapatikana. Endelea kujaribu kuwafikia.",
        "action": "Msalaba Mwekundu Viungo vya Familia: familylinks.icrc.org"
      },
      "lost": {
        "comfort": "Umepoteza vitu. Bado uko hapa.",
        "message": "Kupoteza nyumba yako ni huzuni kubwa. Ni sawa kuhuzunika sana. Kwa sasa: kaa salama, tafuta makazi, tafuta maji.",
        "action": "Wasiliana na mashirika ya msaada wa maafa au UNHCR (unhcr.org)."
      },
      "hurt": {
        "comfort": "Unafanya jambo sahihi kutafuta msaada.",
        "message": "Kuona mtu ameumia ni jambo la kusumbua sana. Kaa utulivu iwezekanavyo. Uzingatie jambo moja: kupata msaada haraka iwezekanavyo.",
        "action": "Piga simu huduma za dharura mara moja (112)."
      }
    },
    "conflict": {
      "heard": {
        "comfort": "Ulisikia. Umeokoka.",
        "message": "Kusikia milipuko au risasi kunacha alama ya kudumu. Hofu yako ina haki kabisa. Sasa hivi, jambo muhimu zaidi ni usalama wako wa kimwili. Inama chini, tafuta kifuniko.",
        "action": "Ukiwa salama: nenda kwenye jengo imara. Wasiliana na UNHCR au huduma za dharura za karibu."
      },
      "fleeing": {
        "comfort": "Kukimbia ni kuokoka. Wewe ni jasiri.",
        "message": "Uamuzi wa kukimbia ni mojawapo ya magumu zaidi mtu anaweza kufanya. Hukimbi — unachagua maisha. Ni sawa kujua wapi hasa unaenda. Zingatia hatua moja inayofuata.",
        "action": "Tafuta vituo vya UNHCR, Msalaba Mwekundu, au njia rasmi za uokoaji."
      },
      "separated": {
        "comfort": "Kutengana si kupoteza milele.",
        "message": "Familia nyingi zilizotengwa katika migogoro mwishowe zinaungana tena. Shikilia simu yako ikichajwa iwezekanavyo. Jiandikishe na mamlaka.",
        "action": "ICRC Viungo vya Familia: familylinks.icrc.org"
      },
      "witness": {
        "comfort": "Ulichokiona kilikuwa cha kweli. Maumivu yako ni ya kweli.",
        "message": "Kushuhudia ukatili kunacha alama. Hukuchagua kukiona. Unachopitia ni jibu la kawaida kwa tukio lisilo la kawaida. Hujapasuka.",
        "grounding": "Picha zinapokuja: shindilia miguu kwenye ardhi, sema jina lako kwa sauti, sema uko wapi."
      },
      "lost": {
        "comfort": "Bado uko hapa. Hiyo si kitu kidogo.",
        "message": "Unapopoteza kila kitu na kila mtu, uzito unaweza kuhisi hauvumiliki. Lakini unasoma hili. Kazi yako pekee sasa hivi: kaa hai na tafuta mahali salama.",
        "action": "Wasiliana na UNHCR, Msalaba Mwekundu, au mashirika ya kibinadamu ya karibu."
      }
    },
    "accident": {
      "shock": {
        "comfort": "Ilitokea. Bado uko hapa.",
        "message": "Mshtuko baada ya ajali ni jibu la dharura la akili na mwili wako. Kila kitu kinaweza kuhisi si cha kweli. Hiyo ni ya kawaida. Zingatia tu mahali ulipo na kama uko salama kimwili.",
        "action": "Piga simu huduma za dharura ukihitajika (112). Usiende. Tafuta mtu awe nawe."
      },
      "violated": {
        "comfort": "Hii haikuwa kosa lako. Hata kidogo.",
        "message": "Kudhulumwa au kushambuliwa na mtu mwingine kunakiuka kitu cha kina. Chochote kilichotokea, hukustahili. Hisia zako sasa hivi ni sahihi zote.",
        "action": "Unaweza kuwasiliana na polisi, mstari wa msaada wa dharura, au mtu unayemwamini."
      },
      "frozen": {
        "comfort": "Kuganda ni kuokoka. Mwili wako ulikuinda.",
        "message": "Mwili ukiganda si udhaifu — ni mojawapo ya majibu ya kale zaidi ya kuokoka. Hukushindwa. Ugandaji utapita.",
        "grounding": "Sogeza kidole gumba na vidole vya miguu polepole. Bonyeza viganja vyako pamoja. Pumua polepole mara moja."
      },
      "angry": {
        "comfort": "Hasira yako ina haki. Ihisi.",
        "message": "Hasira baada ya ukatili si ya kawaida tu — ni yenye afya. Inamaanisha unajua hii ilikuwa vibaya. Usiruhusu mtu yeyote kukuambia utulie.",
        "action": "Utakapokuwa tayari: fikiria kuripoti kwa mamlaka au kuzungumza na mshauri."
      },
      "silent": {
        "comfort": "Huhitaji kumwambia mtu yeyote sasa hivi.",
        "message": "Wewe ndiye unayeamua nani anajua, wakati gani wanajua, na kiasi gani wanajua. Huna wajibu wa kuzungumza kabla hujaandaliwa.",
        "action": "Nambari za msaada wa dharura: 112 (Kimataifa) · iasp.info/resources/Crisis_Centres/"
      }
    },
    "loss": {
      "unreal": {
        "comfort": "Ni sawa ikiwa haionekani kweli bado.",
        "message": "Akili mara nyingi inatulinda kutoka nguvu kamili ya huzuni kwa kuifanya ionekane si ya kweli mwanzoni. Hii si kukataa — ni jinsi tunavyookoka kisichovumilika."
      },
      "miss": {
        "comfort": "Kumkosa kwa nguvu hii inamaanisha alikuwa muhimu.",
        "message": "Huzuni inayoishi mwilini — maumivu ya kumkosa mtu — ni mojawapo ya aina za kweli zaidi za upendo. Inaumia sana kwa sababu alihusika sana."
      },
      "alone": {
        "comfort": "Huko peke yako sio kiasi anavyohisi sasa hivi.",
        "message": "Hasara inaweza kufanya ulimwengu wote uonekane tupu. Hilo hisia la upweke ni la kweli na sahihi. Kuwasiliana — hata ujumbe mfupi — kunaweza kusaidia.",
        "action": "Je, kuna mtu mmoja unayeweza kuwasiliana naye sasa hivi?"
      },
      "why": {
        "comfort": "Huenda usipate jibu la kuridhisha. Hiyo si kosa lako.",
        "message": "Mtu anapoondolewa ghafla, 'kwa nini' inaweza kuwa inachukua kabisa. Baadhi ya hasara hazina maana tu."
      },
      "numb": {
        "comfort": "Kutohisi pia ni huzuni.",
        "message": "Kutohisi chochote baada ya hasara si baridi au kushindwa kupenda. Mara nyingi ni safu ya kwanza ya huzuni. Hisia zitakuja."
      }
    },
    "refugee": {
      "home": {
        "comfort": "Kuondoka kulikuwa tendo la ujasiri.",
        "message": "Kuacha nyuma kila kitu unachojua ni mojawapo ya hasara za kina zaidi mwanadamu anaweza kupitia. Huondoka kwa sababu ulitaka. Uliondoka kwa sababu ulilazimika.",
        "action": "Jiandikishe na UNHCR haraka iwezekanavyo: unhcr.org"
      },
      "separated": {
        "comfort": "Kutengana si mwisho wa familia yako.",
        "message": "Familia zilizotengwa na uhamisho zinapatikana na kuungana upya kila siku. Jiandikishe kila mahali uwezapo ili uweze kupatikana.",
        "action": "ICRC Viungo vya Familia: familylinks.icrc.org"
      },
      "shelter": {
        "comfort": "Kupata makazi usiku huu ndio lengo pekee sasa hivi.",
        "message": "Kila kitu kingine kinaweza kusubiri. Sasa hivi, jambo moja tu linalohusu: kupata mahali salama pa kupumzika.",
        "action": "Tafuta vituo vya usajili vya UNHCR, makazi ya karibu, makanisa/misikiti, au uliza polisi."
      },
      "language": {
        "comfort": "Kutozungumza lugha haifanyi usionekane.",
        "message": "Una haki hata usipoweza kuzungumza lugha. Wafanyakazi wa kibinadamu wamefunzwa kusaidia watu wasiozungumza lugha ya mahali.",
        "action": "Onyesha hii kwa mtu: 'Ninahitaji msaada. Mimi ni mkimbizi. Tafadhali wasiliana na UNHCR au mamlaka za karibu.'"
      },
      "future": {
        "comfort": "Huwezi kuona mustakabali bado. Hiyo ni sawa.",
        "message": "Unapopoteza kila kitu, mustakabali unaweza kuhisi kama ukuta wa giza. Huhitaji kuona njia yote sasa hivi. Siku moja. Hatua moja.",
        "action": "Unganika na UNHCR au mashirika ya msaada wa wakimbizi wa karibu."
      }
    },
    "isolation": {
      "noone": {
        "comfort": "Uliwasiliana hapa. Hiyo ilihitaji ujasiri.",
        "message": "Kuwa peke yako kimwili katika hali ya dharura ni mojawapo ya hali ngumu zaidi. Lakini wewe si asiyeonekana. Jaribu kujifanya uonekane kwa mtu: nenda kuelekea watu, mwanga, sauti.",
        "action": "Piga simu huduma za dharura ukiwa katika hatari (112)."
      },
      "contact": {
        "comfort": "Endelea kujaribu. Mtu atajibu.",
        "message": "Mitandao inazidiwa katika hali za dharura. Endelea kujaribu — badilisha unayewasiliana nao, jaribu njia tofauti.",
        "action": "Jaribu: huduma za dharura (112), redio ya karibu, machapisho ya mitandao ya kijamii na eneo lako."
      },
      "unseen": {
        "comfort": "Unaonaonekana hapa, wakati huu.",
        "message": "Hakuna anayejua unachopitia kunaongeza safu ya upweke. Uzoefu wako ni wa kweli. Jaribu kumwambia mtu mmoja — hata kwa ufupi."
      },
      "give_up": {
        "comfort": "Tafadhali kaa. Wakati huu utapita.",
        "message": "Unapotaka kuacha, kawaida inamaanisha umebeba sana kwa muda mrefu sana bila msaada wa kutosha. Hustahili msaada. Tafadhali wasiliana na mtu anayeweza kuwa nawe sasa hivi.",
        "action": "Msaada wa dharura: 112 · iasp.info/resources/Crisis_Centres/"
      },
      "presence": {
        "comfort": "Huhitaji kupita hili peke yako.",
        "message": "Kutaka mtu awe tu karibu nawe ni mojawapo ya mahitaji ya msingi ya binadamu. Hilo hitaji ni sahihi. Unastahili uwepo.",
        "action": "Je, kuna mtu mmoja — hata ambaye hujazungumza naye kwa muda — ambaye unaweza kumpigia simu sasa hivi?"
      }
    },
    "panic": {
      "breath": {
        "comfort": "Unapumua. Kaa na pumzi.",
        "message": "Hofu inapobana kifua, pumzi inakuwa nanga. Huhitaji kupumua vizuri — polepole zaidi kidogo kuliko unavyopumua sasa.",
        "grounding": "Pumua ndani kwa hesabu 4. Shikilia kwa 4. Toa nje kwa 6. Tena. Na tena."
      },
      "shaking": {
        "comfort": "Kutetemeka ni mwili wako ukitoa. Acha.",
        "message": "Kutetemeka baada ya mshtuko si udhaifu — ni mfumo wako wa neva ukifanya hasa kile kinachopaswa. Usijaribu kuizuia.",
        "grounding": "Kaa au lala ukiweza. Bonyeza mgongo wako dhidi ya kitu imara. Hisi msaada chini yako."
      },
      "blank": {
        "comfort": "Akili tupu ni akili iliyookoka.",
        "message": "Akili inapokuwa tupu, mara nyingi inajilinda kutoka mzigo mzito. Huhitaji kufikiria wazi sasa hivi. Kaa tu mahali ulipo.",
        "grounding": "Taja vitu 5 unavyoviona. 4 unavyovigusa. 3 unavyoviskia. 2 unavyovionea harufu. 1 unaloweza kionja."
      },
      "crying": {
        "comfort": "Acha machozi yaje. Yanafanya kitu.",
        "message": "Kulia si kuanguka — ni mojawapo ya njia bora zaidi za mwili kushughulikia hisia zinazozidi. Acha ujilie bila kukuhukumu.",
        "grounding": "Ukitaka kupunguza kasi: weka kitambaa baridi usoni mwako, au shika kitu baridi mikononi mwako."
      },
      "nothing": {
        "comfort": "Kutotaka chochote ni sawa sasa hivi.",
        "message": "Baada ya msongo au mshtuko mkubwa, hamu ya kufanya chochote ni jibu sahihi kabisa. Mfumo wako unazidiwa na unaomba mapumziko. Kaa salama na pumzika.",
        "grounding": "Tafuta nafasi ya starehe zaidi unayoweza. Funga macho yako ikiwa inahisi salama. Pumua tu."
      }
    }
  }
}
