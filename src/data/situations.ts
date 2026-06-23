// src/data/situations.ts
// 7 situations × 5 emotional states × 4 languages
// Static content — no API needed, works offline

export interface EmotionalState {
  id: string
  text: string
}

export interface Situation {
  id: string
  icon: string
  label: string
  sub: string
  states: EmotionalState[]
}

export const SITUATIONS: Record<string, Situation[]> = {
  en: [
    {
      id: 'disaster',
      icon: '🌊',
      label: 'Natural Disaster',
      sub: 'earthquake · flood · storm · wildfire',
      states: [
        { id: 'numb',   text: "I'm alive, but I feel completely numb" },
        { id: 'scared', text: "I'm shaking — I can't stop feeling terrified" },
        { id: 'family', text: "I can't find my family" },
        { id: 'lost',   text: "I've lost my home and everything in it" },
        { id: 'hurt',   text: "Someone is hurt and I don't know what to do" },
      ],
    },
    {
      id: 'conflict',
      icon: '⚔️',
      label: 'War or Conflict',
      sub: 'bombing · displacement · violence',
      states: [
        { id: 'heard',    text: "I heard explosions or gunfire" },
        { id: 'fleeing',  text: "I'm fleeing and don't know where to go" },
        { id: 'separated',text: "I've been separated from my family" },
        { id: 'witness',  text: "I witnessed something I can't unsee" },
        { id: 'lost',     text: "I've lost everything and everyone" },
      ],
    },
    {
      id: 'accident',
      icon: '🚨',
      label: 'Accident or Violence',
      sub: 'crash · assault · crime',
      states: [
        { id: 'shock',    text: "It just happened — I'm in shock" },
        { id: 'violated', text: "I was hurt or attacked by someone" },
        { id: 'frozen',   text: "My body is frozen, I can't move" },
        { id: 'angry',    text: "I'm furious and this is so unfair" },
        { id: 'silent',   text: "I can't tell anyone what happened" },
      ],
    },
    {
      id: 'loss',
      icon: '🕯️',
      label: 'Sudden Loss',
      sub: 'unexpected death · disappearance',
      states: [
        { id: 'unreal',  text: "I just got the news — it doesn't feel real" },
        { id: 'miss',    text: "I miss them so much it physically hurts" },
        { id: 'alone',   text: "I feel completely alone now" },
        { id: 'why',     text: "I don't understand why this happened" },
        { id: 'numb',    text: "I feel nothing at all" },
      ],
    },
    {
      id: 'refugee',
      icon: '🏚️',
      label: 'Forced Displacement',
      sub: 'refugee · evacuation · exile',
      states: [
        { id: 'home',     text: "I had to leave my home and country" },
        { id: 'separated',text: "My family is scattered" },
        { id: 'shelter',  text: "I don't know where to sleep tonight" },
        { id: 'language', text: "I can't communicate — no one understands me" },
        { id: 'future',   text: "I can't see any future ahead of me" },
      ],
    },
    {
      id: 'isolation',
      icon: '😶',
      label: 'Alone in Crisis',
      sub: 'no one nearby · cut off · abandoned',
      states: [
        { id: 'noone',   text: "There is no one around me" },
        { id: 'contact', text: "I can't reach anyone" },
        { id: 'unseen',  text: "No one knows what I'm going through" },
        { id: 'give_up', text: "I want to give up" },
        { id: 'presence',text: "I just need someone to be here with me" },
      ],
    },
    {
      id: 'panic',
      icon: '😰',
      label: 'Panic or Shock',
      sub: "can't breathe · shaking · mind blank",
      states: [
        { id: 'breath',  text: "I can't breathe properly" },
        { id: 'shaking', text: "My hands and body won't stop shaking" },
        { id: 'blank',   text: "My mind has gone completely blank" },
        { id: 'crying',  text: "I can't stop crying" },
        { id: 'nothing', text: "I don't want to do anything" },
      ],
    },
  ],

  ko: [
    {
      id: 'disaster',
      icon: '🌊',
      label: '자연재해',
      sub: '지진 · 홍수 · 태풍 · 산불',
      states: [
        { id: 'numb',   text: '살아있지만 아무 감각이 없어요' },
        { id: 'scared', text: '몸이 떨리고 무서움이 멈추지 않아요' },
        { id: 'family', text: '가족을 찾을 수가 없어요' },
        { id: 'lost',   text: '집과 모든 것을 잃었어요' },
        { id: 'hurt',   text: '다친 사람이 있는데 어떻게 해야 할지 모르겠어요' },
      ],
    },
    {
      id: 'conflict',
      icon: '⚔️',
      label: '전쟁 또는 분쟁',
      sub: '폭격 · 피난 · 폭력',
      states: [
        { id: 'heard',    text: '폭발음이나 총소리를 들었어요' },
        { id: 'fleeing',  text: '피난 중인데 어디로 가야 할지 모르겠어요' },
        { id: 'separated',text: '가족과 헤어졌어요' },
        { id: 'witness',  text: '잊을 수 없는 장면을 목격했어요' },
        { id: 'lost',     text: '모든 것과 모든 사람을 잃었어요' },
      ],
    },
    {
      id: 'accident',
      icon: '🚨',
      label: '사고 또는 폭력 피해',
      sub: '교통사고 · 폭행 · 범죄',
      states: [
        { id: 'shock',    text: '방금 일어났어요 — 너무 충격적이에요' },
        { id: 'violated', text: '누군가에게 다치거나 공격을 당했어요' },
        { id: 'frozen',   text: '몸이 굳어버렸어요' },
        { id: 'angry',    text: '너무 화나고 억울해요' },
        { id: 'silent',   text: '아무에게도 말할 수가 없어요' },
      ],
    },
    {
      id: 'loss',
      icon: '🕯️',
      label: '갑작스러운 상실',
      sub: '갑작스러운 사망 · 실종',
      states: [
        { id: 'unreal',  text: '방금 소식을 들었는데 실감이 안 나요' },
        { id: 'miss',    text: '너무 보고 싶어서 몸이 아파요' },
        { id: 'alone',   text: '완전히 혼자 남겨진 것 같아요' },
        { id: 'why',     text: '왜 이런 일이 생겼는지 모르겠어요' },
        { id: 'numb',    text: '아무 감각도 없어요' },
      ],
    },
    {
      id: 'refugee',
      icon: '🏚️',
      label: '강제 이주',
      sub: '난민 · 대피 · 추방',
      states: [
        { id: 'home',     text: '고향과 나라를 떠나야 했어요' },
        { id: 'separated',text: '가족이 뿔뿔이 흩어졌어요' },
        { id: 'shelter',  text: '오늘 밤 어디서 자야 할지 모르겠어요' },
        { id: 'language', text: '말이 안 통해요 — 아무도 이해를 못 해요' },
        { id: 'future',   text: '앞날이 전혀 보이지 않아요' },
      ],
    },
    {
      id: 'isolation',
      icon: '😶',
      label: '위기 속 고립',
      sub: '주변에 아무도 없음 · 연락 두절',
      states: [
        { id: 'noone',   text: '주변에 아무도 없어요' },
        { id: 'contact', text: '아무에게도 연락이 닿지 않아요' },
        { id: 'unseen',  text: '내 상황을 아는 사람이 아무도 없어요' },
        { id: 'give_up', text: '다 포기하고 싶어요' },
        { id: 'presence',text: '그냥 누군가 곁에 있어줬으면 해요' },
      ],
    },
    {
      id: 'panic',
      icon: '😰',
      label: '공황 또는 충격',
      sub: '숨이 막힘 · 몸이 떨림 · 머리가 하얘짐',
      states: [
        { id: 'breath',  text: '숨이 잘 쉬어지지 않아요' },
        { id: 'shaking', text: '손과 몸이 멈추지 않고 떨려요' },
        { id: 'blank',   text: '머리가 완전히 하얘졌어요' },
        { id: 'crying',  text: '울음이 멈추지 않아요' },
        { id: 'nothing', text: '아무것도 하고 싶지 않아요' },
      ],
    },
  ],

  fr: [
    {
      id: 'disaster',
      icon: '🌊',
      label: 'Catastrophe naturelle',
      sub: 'tremblement de terre · inondation · tempête · incendie',
      states: [
        { id: 'numb',   text: "Je suis en vie, mais je ne ressens plus rien" },
        { id: 'scared', text: "Je tremble — la terreur ne s'arrête pas" },
        { id: 'family', text: "Je ne trouve pas ma famille" },
        { id: 'lost',   text: "J'ai perdu ma maison et tout ce que j'avais" },
        { id: 'hurt',   text: "Quelqu'un est blessé et je ne sais pas quoi faire" },
      ],
    },
    {
      id: 'conflict',
      icon: '⚔️',
      label: 'Guerre ou conflit',
      sub: 'bombardement · déplacement · violence',
      states: [
        { id: 'heard',    text: "J'ai entendu des explosions ou des coups de feu" },
        { id: 'fleeing',  text: "Je fuis et je ne sais pas où aller" },
        { id: 'separated',text: "J'ai été séparé(e) de ma famille" },
        { id: 'witness',  text: "J'ai vu quelque chose que je ne peux pas oublier" },
        { id: 'lost',     text: "J'ai tout perdu — personnes et biens" },
      ],
    },
    {
      id: 'accident',
      icon: '🚨',
      label: 'Accident ou violence',
      sub: 'accident · agression · crime',
      states: [
        { id: 'shock',    text: "Ça vient de se passer — je suis sous le choc" },
        { id: 'violated', text: "J'ai été blessé(e) ou attaqué(e)" },
        { id: 'frozen',   text: "Mon corps est figé, je ne peux pas bouger" },
        { id: 'angry',    text: "Je suis furieux(se) — c'est tellement injuste" },
        { id: 'silent',   text: "Je ne peux en parler à personne" },
      ],
    },
    {
      id: 'loss',
      icon: '🕯️',
      label: 'Perte soudaine',
      sub: 'décès inattendu · disparition',
      states: [
        { id: 'unreal',  text: "Je viens d'apprendre la nouvelle — ce n'est pas réel" },
        { id: 'miss',    text: "Elle/il me manque tellement que j'en ai mal physiquement" },
        { id: 'alone',   text: "Je me sens complètement seul(e) maintenant" },
        { id: 'why',     text: "Je ne comprends pas pourquoi c'est arrivé" },
        { id: 'numb',    text: "Je ne ressens absolument rien" },
      ],
    },
    {
      id: 'refugee',
      icon: '🏚️',
      label: 'Déplacement forcé',
      sub: 'réfugié · évacuation · exil',
      states: [
        { id: 'home',     text: "J'ai dû quitter mon foyer et mon pays" },
        { id: 'separated',text: "Ma famille est dispersée" },
        { id: 'shelter',  text: "Je ne sais pas où dormir cette nuit" },
        { id: 'language', text: "Je ne parle pas la langue — personne ne me comprend" },
        { id: 'future',   text: "Je ne vois aucun avenir devant moi" },
      ],
    },
    {
      id: 'isolation',
      icon: '😶',
      label: 'Seul(e) en crise',
      sub: 'personne autour · coupé(e) · abandonné(e)',
      states: [
        { id: 'noone',   text: "Il n'y a personne autour de moi" },
        { id: 'contact', text: "Je n'arrive à joindre personne" },
        { id: 'unseen',  text: "Personne ne sait ce que je vis" },
        { id: 'give_up', text: "Je veux tout abandonner" },
        { id: 'presence',text: "J'ai juste besoin que quelqu'un soit là" },
      ],
    },
    {
      id: 'panic',
      icon: '😰',
      label: 'Panique ou choc',
      sub: 'souffle coupé · tremblements · esprit vide',
      states: [
        { id: 'breath',  text: "Je n'arrive pas à respirer correctement" },
        { id: 'shaking', text: "Mes mains et mon corps tremblent sans arrêt" },
        { id: 'blank',   text: "Mon esprit est complètement vide" },
        { id: 'crying',  text: "Je n'arrête pas de pleurer" },
        { id: 'nothing', text: "Je ne veux rien faire" },
      ],
    },
  ],

  sw: [
    {
      id: 'disaster',
      icon: '🌊',
      label: 'Maafa ya Asili',
      sub: 'tetemeko · mafuriko · dhoruba · moto',
      states: [
        { id: 'numb',   text: 'Niko hai lakini sihisi chochote' },
        { id: 'scared', text: 'Ninatetemeka — hofu haipungui' },
        { id: 'family', text: 'Siwezi kupata familia yangu' },
        { id: 'lost',   text: 'Nimepoteza nyumba yangu na kila kitu' },
        { id: 'hurt',   text: 'Mtu ameumia na sijui nifanye nini' },
      ],
    },
    {
      id: 'conflict',
      icon: '⚔️',
      label: 'Vita au Mgogoro',
      sub: 'mapigano · kukimbia · ukatili',
      states: [
        { id: 'heard',    text: 'Nilisikia milipuko au risasi' },
        { id: 'fleeing',  text: 'Ninakimbia lakini sijui niende wapi' },
        { id: 'separated',text: 'Nimetengwa na familia yangu' },
        { id: 'witness',  text: 'Nilishuhudia jambo ambalo siwezi lisahau' },
        { id: 'lost',     text: 'Nimepoteza kila kitu na kila mtu' },
      ],
    },
    {
      id: 'accident',
      icon: '🚨',
      label: 'Ajali au Ukatili',
      sub: 'ajali · shambulio · uhalifu',
      states: [
        { id: 'shock',    text: 'Imetokea sasa hivi — niko mshtuko' },
        { id: 'violated', text: 'Nilidhulumwa au kushambuliwa' },
        { id: 'frozen',   text: 'Mwili wangu umeganda, siwezi kusogea' },
        { id: 'angry',    text: 'Ninakasirika sana — hii ni dhuluma' },
        { id: 'silent',   text: 'Siwezi kumwambia mtu yeyote' },
      ],
    },
    {
      id: 'loss',
      icon: '🕯️',
      label: 'Kupoteza Ghafla',
      sub: 'kifo kisichotarajiwa · kutoweka',
      states: [
        { id: 'unreal',  text: 'Nimepata habari tu — haionekani kweli' },
        { id: 'miss',    text: 'Ninamkosa sana hadi mwili wangu unaumia' },
        { id: 'alone',   text: 'Nahisi nimebaki peke yangu kabisa' },
        { id: 'why',     text: 'Sielewi kwa nini hii ilitokea' },
        { id: 'numb',    text: 'Sihisi chochote kabisa' },
      ],
    },
    {
      id: 'refugee',
      icon: '🏚️',
      label: 'Kukimbia Makwao',
      sub: 'mkimbizi · uokoaji · uhamisho',
      states: [
        { id: 'home',     text: 'Nililazimika kuacha nyumbani na nchini mwangu' },
        { id: 'separated',text: 'Familia yangu imetawanyika' },
        { id: 'shelter',  text: 'Sijui nitakalala wapi usiku huu' },
        { id: 'language', text: 'Siwezi kuwasiliana — hakuna anayenielewa' },
        { id: 'future',   text: 'Sioni mustakabali wowote mbele yangu' },
      ],
    },
    {
      id: 'isolation',
      icon: '😶',
      label: 'Peke Yangu Msibani',
      sub: 'hakuna karibu · kukatika · kuachwa',
      states: [
        { id: 'noone',   text: 'Hakuna mtu karibu nami' },
        { id: 'contact', text: 'Siwezi kuwasiliana na mtu yeyote' },
        { id: 'unseen',  text: 'Hakuna anayejua ninachopitia' },
        { id: 'give_up', text: 'Nataka kuacha kila kitu' },
        { id: 'presence',text: 'Ninahitaji tu mtu awe karibu nami' },
      ],
    },
    {
      id: 'panic',
      icon: '😰',
      label: 'Hofu au Mshtuko',
      sub: 'kushindwa kupumua · kutetemeka · akili tupu',
      states: [
        { id: 'breath',  text: 'Siwezi kupumua vizuri' },
        { id: 'shaking', text: 'Mikono na mwili wangu havisimami kutetemeka' },
        { id: 'blank',   text: 'Akili yangu imekuwa tupu kabisa' },
        { id: 'crying',  text: 'Siwezi kuacha kulia' },
        { id: 'nothing', text: 'Sitaki kufanya chochote' },
      ],
    },
  ],
}
