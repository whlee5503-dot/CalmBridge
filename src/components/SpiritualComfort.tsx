// src/components/SpiritualComfort.tsx
// Spiritual comfort module: user selects their tradition → receives a comforting text
// Supports EN / KO / FR / SW via i18next

import { useState } from "react";
import { useTranslation } from "react-i18next";

// ── Types ─────────────────────────────────────────────────────────────────────

type Tradition =
  | "none"
  | "christianity"
  | "islam"
  | "buddhism"
  | "hinduism"
  | "judaism"
  | "secular";

type Language = "en" | "ko" | "fr" | "sw";

interface ComfortText {
  quote: string;
  source: string;
  reflection: string;
}

// ── Comfort Content ───────────────────────────────────────────────────────────
// Each tradition has comforting words in all 4 languages.

const COMFORT_TEXTS: Record<Tradition, Record<Language, ComfortText>> = {
  none: {
    en: { quote: "", source: "", reflection: "" },
    ko: { quote: "", source: "", reflection: "" },
    fr: { quote: "", source: "", reflection: "" },
    sw: { quote: "", source: "", reflection: "" },
  },
  christianity: {
    en: {
      quote: "Come to me, all you who are weary and burdened, and I will give you rest.",
      source: "Matthew 11:28",
      reflection: "You are not carrying this alone. There is grace enough for this moment.",
    },
    ko: {
      quote: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라.",
      source: "마태복음 11:28",
      reflection: "당신은 혼자 이 짐을 지지 않아도 됩니다. 이 순간을 위한 은혜가 충분히 있습니다.",
    },
    fr: {
      quote: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
      source: "Matthieu 11:28",
      reflection: "Vous ne portez pas ce fardeau seul. Il y a assez de grâce pour ce moment.",
    },
    sw: {
      quote: "Njooni kwangu, nyote mnaochoka na kubeba mzigo, nami nitawapumzisha.",
      source: "Mathayo 11:28",
      reflection: "Haubeba hizi peke yako. Kuna neema ya kutosha kwa wakati huu.",
    },
  },
  islam: {
    en: {
      quote: "Verily, with hardship comes ease.",
      source: "Quran 94:5-6",
      reflection: "This difficulty is not permanent. Peace will come — hold on.",
    },
    ko: {
      quote: "진실로 고난과 함께 안도가 옵니다.",
      source: "꾸란 94:5-6",
      reflection: "이 어려움은 영원하지 않습니다. 평화가 올 것입니다. 버텨내세요.",
    },
    fr: {
      quote: "Certes, avec la difficulté vient la facilité.",
      source: "Coran 94:5-6",
      reflection: "Cette difficulté n'est pas permanente. La paix viendra — tenez bon.",
    },
    sw: {
      quote: "Hakika, pamoja na ugumu kuna urahisi.",
      source: "Quran 94:5-6",
      reflection: "Ugumu huu si wa kudumu. Amani itakuja — subiri.",
    },
  },
  buddhism: {
    en: {
      quote: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
      source: "The Buddha",
      reflection: "Suffering is part of being human. You can hold your pain with compassion — the same compassion you'd offer a dear friend.",
    },
    ko: {
      quote: "당신 자신도 온 우주 어디에 있는 누구만큼이나 사랑과 애정을 받을 자격이 있습니다.",
      source: "붓다",
      reflection: "고통은 인간 존재의 일부입니다. 소중한 친구에게 그러하듯, 자신의 아픔을 자비로 안아줄 수 있습니다.",
    },
    fr: {
      quote: "Vous-même, autant que quiconque dans l'univers entier, méritez votre amour et votre affection.",
      source: "Le Bouddha",
      reflection: "La souffrance fait partie de l'humanité. Vous pouvez tenir votre douleur avec compassion — la même que vous offririez à un ami cher.",
    },
    sw: {
      quote: "Wewe mwenyewe, kama mtu yeyote katika ulimwengu wote, unastahili upendo na mshikamano wako.",
      source: "Buddha",
      reflection: "Mateso ni sehemu ya ubinadamu. Unaweza kushika maumivu yako kwa huruma — huruma ile ile unayompa rafiki mpendwa.",
    },
  },
  hinduism: {
    en: {
      quote: "The soul is never born, nor dies at any time. It is not slain when the body is slain.",
      source: "Bhagavad Gita 2:20",
      reflection: "You are more than this pain, more than this moment. Your essence is whole and cannot be broken.",
    },
    ko: {
      quote: "영혼은 언제도 태어나거나 죽지 않는다. 몸이 소멸해도 영혼은 소멸하지 않는다.",
      source: "바가바드 기타 2:20",
      reflection: "당신은 이 고통보다, 이 순간보다 더 큰 존재입니다. 당신의 본질은 온전하며 부서질 수 없습니다.",
    },
    fr: {
      quote: "L'âme n'est jamais née, ni ne meurt. Elle n'est pas tuée quand le corps est tué.",
      source: "Bhagavad Gita 2:20",
      reflection: "Vous êtes plus que cette douleur, plus que ce moment. Votre essence est entière et ne peut être brisée.",
    },
    sw: {
      quote: "Roho haizaliwi wala kufa wakati wowote. Haiuawiwi wakati mwili unaouawa.",
      source: "Bhagavad Gita 2:20",
      reflection: "Wewe ni zaidi ya maumivu haya, zaidi ya wakati huu. Kiini chako ni kamili na hakiwezi kuvunjika.",
    },
  },
  judaism: {
    en: {
      quote: "Even when I walk through the darkest valley, I will not be afraid, for you are close beside me.",
      source: "Psalm 23:4",
      reflection: "Darkness does not mean you are abandoned. You are accompanied, even now.",
    },
    ko: {
      quote: "내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라.",
      source: "시편 23:4",
      reflection: "어둠이 당신이 버림받았다는 뜻은 아닙니다. 지금 이 순간에도 당신은 함께함을 받고 있습니다.",
    },
    fr: {
      quote: "Même si je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi.",
      source: "Psaume 23:4",
      reflection: "L'obscurité ne signifie pas que vous êtes abandonné. Vous êtes accompagné, même maintenant.",
    },
    sw: {
      quote: "Hata kama nitapita katika bonde la uvuli wa mauti, sitaogopa mabaya, kwa maana uko karibu nami.",
      source: "Zaburi 23:4",
      reflection: "Giza halimaanishi umesalitiwa. Unaandamana, hata sasa.",
    },
  },
  secular: {
    en: {
      quote: "You don't have to have it all figured out to move forward.",
      source: "A reminder for hard days",
      reflection: "You've made it through every hard day so far. That is real strength.",
    },
    ko: {
      quote: "나아가기 위해 모든 것을 이해할 필요는 없습니다.",
      source: "힘든 날을 위한 위로",
      reflection: "당신은 지금까지의 모든 힘든 날을 헤쳐왔습니다. 그것이 진짜 강인함입니다.",
    },
    fr: {
      quote: "Vous n'avez pas besoin d'avoir tout compris pour avancer.",
      source: "Un rappel pour les jours difficiles",
      reflection: "Vous avez traversé chaque jour difficile jusqu'à présent. C'est une vraie force.",
    },
    sw: {
      quote: "Huhitaji kuelewa kila kitu ili kusonga mbele.",
      source: "Ukumbusho kwa siku ngumu",
      reflection: "Umepita kila siku ngumu hadi sasa. Hiyo ni nguvu ya kweli.",
    },
  },
};

// ── Tradition Config ──────────────────────────────────────────────────────────

interface TraditionOption {
  id: Tradition;
  emoji: string;
  labelKey: string; // i18n key
}

const TRADITIONS: TraditionOption[] = [
  { id: "christianity", emoji: "✝️", labelKey: "spiritual.christianity" },
  { id: "islam",        emoji: "☪️", labelKey: "spiritual.islam" },
  { id: "buddhism",     emoji: "☸️", labelKey: "spiritual.buddhism" },
  { id: "hinduism",     emoji: "🕉️", labelKey: "spiritual.hinduism" },
  { id: "judaism",      emoji: "✡️", labelKey: "spiritual.judaism" },
  { id: "secular",      emoji: "🌿", labelKey: "spiritual.secular" },
];

// ── Component ─────────────────────────────────────────────────────────────────

interface SpiritualComfortProps {
  /** Called when user closes/dismisses the module */
  onClose?: () => void;
}

export default function SpiritualComfort({ onClose }: SpiritualComfortProps) {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<Tradition>("none");
  const [isExpanded, setIsExpanded] = useState(false);

  const currentLang = (i18n.language?.slice(0, 2) as Language) || "en";
  const validLang: Language = ["en", "ko", "fr", "sw"].includes(currentLang)
    ? currentLang
    : "en";

  const comfort =
    selected !== "none"
      ? COMFORT_TEXTS[selected][validLang]
      : null;

  const handleSelect = (tradition: Tradition) => {
    setSelected(tradition);
    setIsExpanded(true);
  };

  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 shadow-sm dark:border-blue-900/30 dark:from-blue-950/20 dark:to-indigo-950/20">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🕊️</span>
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
            {t("spiritual.title", "Spiritual & Reflective Comfort")}
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close spiritual comfort"
            className="rounded-full p-1 text-blue-400 transition hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/40"
          >
            ✕
          </button>
        )}
      </div>

      {/* Subtitle */}
      <p className="mb-4 text-xs text-blue-600/80 dark:text-blue-300/70">
        {t("spiritual.subtitle", "Choose a tradition that resonates with you for a moment of comfort.")}
      </p>

      {/* Tradition Selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {TRADITIONS.map((trad) => (
          <button
            key={trad.id}
            onClick={() => handleSelect(trad.id)}
            aria-pressed={selected === trad.id}
            className={`
              flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium
              transition-all duration-200
              ${
                selected === trad.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-blue-700 hover:bg-blue-50 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-800/40"
              }
            `}
          >
            <span>{trad.emoji}</span>
            <span>{t(trad.labelKey, trad.id)}</span>
          </button>
        ))}
      </div>

      {/* Comfort Display */}
      {comfort && isExpanded && (
        <div className="animate-fade-in rounded-xl bg-white/70 p-4 dark:bg-white/5">
          {/* Quote */}
          <blockquote className="mb-2 border-l-2 border-blue-400 pl-3 text-sm italic text-gray-700 dark:text-gray-300">
            "{comfort.quote}"
          </blockquote>

          {/* Source */}
          <p className="mb-3 text-right text-xs text-blue-500 dark:text-blue-400">
            — {comfort.source}
          </p>

          {/* Reflection */}
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {comfort.reflection}
          </p>

          {/* Dismiss */}
          <button
            onClick={() => {
              setSelected("none");
              setIsExpanded(false);
            }}
            className="mt-3 text-xs text-blue-400 underline-offset-2 hover:underline dark:text-blue-500"
          >
            {t("spiritual.clear", "Choose another")}
          </button>
        </div>
      )}
    </div>
  );
}
