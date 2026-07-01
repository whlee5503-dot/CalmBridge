// src/components/SpiritualComfort.tsx
// Static spiritual comfort card — shows a random verse from the pool
// matching the current situation and the tradition chosen during onboarding.
// Scripture: 성경전서 개역한글판 (저작재산권 보호기간 만료, 대한성서공회)
// Conditions: 동일성유지권 + 성명표시권 준수 (원문 그대로, 출처 표기)

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Language = "en" | "ko" | "fr" | "sw";

interface VerseSet {
  quotes: { text: string; source: string }[];
  reflection: string;
}

const CHRISTIANITY_KO: Record<string, VerseSet> = {
  disaster: {
    quotes: [
      { text: "하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 큰 도움이시라", source: "시편 46:1 (개역한글)" },
      { text: "내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올꼬 나의 도움이 천지를 지으신 여호와에게서로다", source: "시편 121:1-2 (개역한글)" },
      { text: "두려워하지 말라 내가 너와 함께 함이니라 놀라지 말라 나는 네 하나님이 됨이니라 내가 너를 굳세게 하리라 참으로 너를 도와주리라", source: "이사야 41:10 (개역한글)" },
      { text: "평안을 너희에게 끼치노니 곧 나의 평안을 너희에게 주노라 내가 너희에게 주는 것은 세상이 주는 것 같지 아니하니라 너희는 마음에 근심도 말고 두려워하지도 말라", source: "요한복음 14:27 (개역한글)" },
      { text: "광풍을 평정히 하사 물결로 잔잔케 하시는도다 저희가 평온함을 인하여 기뻐하는 중에 여호와께서 저희를 소원의 항구로 인도하시는도다", source: "시편 107:29-30 (개역한글)" },
    ],
    reflection: "지금은 아무것도 할 수 없을 만큼 막막하고 두려울 수 있습니다. 하지만 기억하세요. 거센 폭풍 속에서도 당신을 품에 안고 계신 분은 결코 흔들리지 않습니다. 안심하고 그 사랑의 품에 당신의 거친 숨을 맡기세요. 당신은 안전합니다.",
  },
  conflict: {
    quotes: [
      { text: "내가 사망의 음침한 골짜기로 다닐찌라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라", source: "시편 23:4 (개역한글)" },
      { text: "여호와께서 너를 지켜 모든 환난을 면케 하시며 또 네 영혼을 지키시리로다", source: "시편 121:7 (개역한글)" },
      { text: "여호와는 나의 반석이시요 나의 요새시요 나를 건지시는 자시요 나의 하나님이시요 나의 피할 바위시요 나의 방패시요 나의 구원의 뿔이시요 나의 산성이시로다", source: "시편 18:2 (개역한글)" },
      { text: "너는 밤에 놀램과 낮에 흐르는 살과 흑암 중에 행하는 염병과 백주에 황폐케 하는 파멸을 두려워 아니하리로다 천인이 네 곁에서, 만인이 네 우편에서 엎드러지나 이 재앙이 네게 가까이 못하리로다", source: "시편 91:5-7 (개역한글)" },
    ],
    reflection: "사방이 어둡고 위태로울지라도, 당신은 결코 혼자가 아닙니다. 하나님께서 당신의 눈물과 숨소리를 모두 듣고 계시며, 가장 안전한 팔로 당신을 감싸 안고 계십니다. 당신은 결코 잊혀지지 않았습니다. 안심하고 그분의 보호 아래 머무르세요.",
  },
  accident: {
    quotes: [
      { text: "상심한 자를 고치시며 저희 상처를 싸매시는도다", source: "시편 147:3 (개역한글)" },
      { text: "너는 마음을 강하게 하고 담대히 하라 그들을 두려워 말라 그들 앞에서 떨지 말라 이는 네 하나님 여호와 그가 너와 함께 행하실 것임이라 반드시 너를 떠나지 아니하시며 버리지 아니하시리라", source: "신명기 31:6 (개역한글)" },
      { text: "상한 갈대를 꺾지 아니하며 꺼져가는 등불을 끄지 아니하고 진리로 공의를 베풀 것이며", source: "이사야 42:3 (개역한글)" },
      { text: "내가 평안히 눕고 자기도 하리니 나를 안전히 거하게 하시는 이는 오직 여호와시니이다", source: "시편 4:8 (개역한글)" },
    ],
    reflection: "지금 느끼는 멍함과 혼란스러움은 큰 충격 앞에서 당신의 마음이 스스로를 지키려고 애쓰는 자연스러운 반응입니다. 당신이 잘못한 것이 아닙니다. 찢긴 마음을 조심스레 싸매시는 주님의 손길을 의지하며, 아주 천천히 호흡을 가다듬어 보세요. 당신은 혼자가 아닙니다.",
  },
  loss: {
    quotes: [
      { text: "수고하고 무거운 짐진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라", source: "마태복음 11:28 (개역한글)" },
      { text: "여호와는 마음이 상한 자에게 가까이 하시고 중심에 통회하는 자를 구원하시는도다", source: "시편 34:18 (개역한글)" },
      { text: "내가 탄식함으로 곤핍하여 밤마다 눈물로 내 침상을 띄우며 내 요를 적시나이다 여호와께서 내 곡성을 들으셨도다", source: "시편 6:6, 8 (개역한글)" },
      { text: "모든 눈물을 그 눈에서 씻기시매 다시 사망이 없고 애통하는 것이나 곡하는 것이나 아픈 것이 다시 있지 아니하리니 처음 것들이 다 지나갔음이러라", source: "요한계시록 21:4 (개역한글)" },
    ],
    reflection: "가슴이 찢어질 듯한 슬픔과 눈물은 떠나간 이를 향한 당연한 사랑의 흔적입니다. 억지로 참으려 하지 말고 마음껏 슬퍼하셔도 괜찮습니다. 이 무거운 슬픔의 무게를 혼자 지려 하지 마세요. 주님이 지금 당신의 곁에서 그 눈물을 함께 흘리며 묵묵히 안아주고 계십니다.",
  },
  refugee: {
    quotes: [
      { text: "여호와께서 객을 보호하시며 고아와 과부를 붙드시고 악인의 길은 굽게 하시는도다", source: "시편 146:9 (개역한글)" },
      { text: "내가 너와 함께 있어 네가 어디로 가든지 너를 지키며 너를 이끌어 이 땅으로 돌아오게 할찌라 내가 네게 허락한 것을 다 이루기까지 너를 떠나지 아니하리라 하신지라", source: "창세기 28:15 (개역한글)" },
      { text: "나 여호와가 말하노라 너희를 향한 나의 생각은 내가 아나니 재앙이 아니라 곧 평안이요 너희 장래에 소망을 주려하는 생각이라", source: "예레미야 29:11 (개역한글)" },
    ],
    reflection: "익숙한 터전과 정체성을 잃어버린 채 서 있는 낯선 길, 미래를 알 수 없어 막막하고 외로울 수 있습니다. 하지만 기억하세요. 하나님은 건물이나 땅에 갇혀 계신 분이 아니라, 지금 당신의 걸음과 함께 이동하시는 분입니다. 당신이 발을 딛는 그 낯선 곳에서도 주님은 당신의 피난처가 되어 주실 것이며, 그 걸음의 끝에 반드시 평안과 소망을 예비해 두셨습니다. 당신은 혼자가 아닙니다.",
  },
  isolation: {
    quotes: [
      { text: "내가 주의 신을 떠나 어디로 가며 주의 앞에서 어디로 피하리이까 내가 하늘에 올라갈찌라도 거기 계시며 음부에 내 자리를 펼찌라도 거기 계시니이다", source: "시편 139:7-8 (개역한글)" },
      { text: "여호와께서는 자기에게 간구하는 모든 자 곧 진실하게 간구하는 모든 자에게 가까이 하시는도다", source: "시편 145:18 (개역한글)" },
      { text: "너희 염려를 다 주께 맡겨 버리라 이는 저가 너희를 권고하심이니라", source: "베드로전서 5:7 (개역한글)" },
      { text: "여호와께서 내 간구를 들으셨음이여 여호와께서 내 기도를 받으시리로다", source: "시편 6:9 (개역한글)" },
    ],
    reflection: "세상과의 모든 연결이 끊어진 듯한 깊은 적막 속에서 외로움과 두려움이 밀려올 수 있습니다. 하지만 기억하세요. 사방이 가로막힌 그곳에도 주님의 영은 이미 당신과 함께 숨 쉬고 계십니다. 사람의 귀에는 닿지 못하는 당신의 작은 신음과 눈물도 주님은 지금 가장 가까이서 듣고 계십니다. 당신은 결코 혼자가 아니며, 잊혀지지 않았습니다.",
  },
  panic: {
    quotes: [
      { text: "광풍을 평정히 하사 물결로 잔잔케 하시는도다", source: "시편 107:29 (개역한글)" },
      { text: "실로 내가 내 영혼으로 고요하고 평온하게 하기를 젖 뗀 아이가 그의 어머니 품에 있음 같게 하였나니 내 영혼이 젖 뗀 아이와 같도다", source: "시편 131:2 (개역한글)" },
      { text: "내 마음이 눌릴 때에 땅 끝에서부터 주께 부르짖으오리니 나보다 높은 바위에 나를 인도하소서", source: "시편 61:2 (개역한글)" },
    ],
    reflection: "지금 온몸이 떨리고 숨이 막히는 듯한 공포가 당신을 덮쳤을 수 있습니다. 하지만 괜찮습니다. 이 고통스러운 순간은 곧 지나갈 것이며 결코 영원하지 않습니다. 안심하고 잠시 눈을 감으세요. 나보다 높은 바위가 되시는 주님의 품 안에서, 들이쉬고... 내쉬며... 천천히 숨을 쉬어 보세요. 주님이 지금 당신의 호흡을 붙들고 계십니다.",
  },
};


const CHRISTIANITY_EN: Record<string, VerseSet> = {
  disaster: {
    quotes: [
      { text: "God is our refuge and strength, a very present help in trouble.", source: "Psalm 46:1 (KJV)" },
      { text: "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.", source: "Psalm 121:1-2 (KJV)" },
      { text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.", source: "Isaiah 41:10 (KJV)" },
      { text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.", source: "John 14:27 (KJV)" },
      { text: "He maketh the storm a calm, so that the waves thereof are still. Then are they glad because they be quiet; so he bringeth them unto their desired haven.", source: "Psalm 107:29-30 (KJV)" },
    ],
    reflection: "You may feel utterly overwhelmed right now, unable to do anything. But remember: even in the fiercest storm, the One who holds you does not shake. Rest in that love. You are safe.",
  },
  conflict: {
    quotes: [
      { text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me.", source: "Psalm 23:4 (KJV)" },
      { text: "The LORD shall preserve thee from all evil: he shall preserve thy soul.", source: "Psalm 121:7 (KJV)" },
      { text: "The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust; my buckler, and the horn of my salvation, and my high tower.", source: "Psalm 18:2 (KJV)" },
      { text: "Thou shalt not be afraid for the terror by night; nor for the arrow that flieth by day; nor for the pestilence that walketh in darkness; nor for the destruction that wasteth at noonday. A thousand shall fall at thy side, and ten thousand at thy right hand; but it shall not come nigh thee.", source: "Psalm 91:5-7 (KJV)" },
    ],
    reflection: "Even in the darkest hour, you are not alone. God hears your every breath and tear, and holds you in the safest arms. You have not been forgotten. Rest under His protection.",
  },
  accident: {
    quotes: [
      { text: "He healeth the broken in heart, and bindeth up their wounds.", source: "Psalm 147:3 (KJV)" },
      { text: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.", source: "Deuteronomy 31:6 (KJV)" },
      { text: "A bruised reed shall he not break, and the smoking flax shall he not quench: he shall bring forth judgment unto truth.", source: "Isaiah 42:3 (KJV)" },
      { text: "I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.", source: "Psalm 4:8 (KJV)" },
    ],
    reflection: "The numbness and confusion you feel right now is your heart's natural way of protecting itself from shock. You have done nothing wrong. Let the Lord's gentle hands bind up what has been torn. Breathe slowly. You are not alone.",
  },
  loss: {
    quotes: [
      { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", source: "Matthew 11:28 (KJV)" },
      { text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.", source: "Psalm 34:18 (KJV)" },
      { text: "I am weary with my groaning; all the night make I my bed to swim; I water my couch with my tears. The LORD hath heard my supplication; the LORD will receive my prayer.", source: "Psalm 6:6, 8 (KJV)" },
      { text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.", source: "Revelation 21:4 (KJV)" },
    ],
    reflection: "Your tears and grief are the natural mark of love for one who is gone. You do not need to hold back. The Lord is weeping with you right now, quietly holding you. You do not have to carry this weight alone.",
  },
  refugee: {
    quotes: [
      { text: "The LORD preserveth the strangers; he relieveth the fatherless and widow: but the way of the wicked he turneth upside down.", source: "Psalm 146:9 (KJV)" },
      { text: "Behold, I am with thee, and will keep thee in all places whither thou goest, and will bring thee again into this land; for I will not leave thee, until I have done that which I have spoken to thee of.", source: "Genesis 28:15 (KJV)" },
      { text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", source: "Jeremiah 29:11 (KJV)" },
    ],
    reflection: "Standing on an unfamiliar road, the future uncertain and lonely — remember: God is not bound to a place or building. He moves with your every step. He will be your refuge wherever you land, and He has prepared peace and hope at the end of that road. You are not alone.",
  },
  isolation: {
    quotes: [
      { text: "Whither shall I go from thy spirit? or whither shall I flee from thy presence? If I ascend up into heaven, thou art there: if I make my bed in hell, behold, thou art there.", source: "Psalm 139:7-8 (KJV)" },
      { text: "The LORD is nigh unto all them that call upon him, to all that call upon him in truth.", source: "Psalm 145:18 (KJV)" },
      { text: "Casting all your care upon him; for he careth for you.", source: "1 Peter 5:7 (KJV)" },
      { text: "The LORD hath heard my supplication; the LORD will receive my prayer.", source: "Psalm 6:9 (KJV)" },
    ],
    reflection: "In the deepest silence, when every connection seems cut — His Spirit is already there, breathing with you. Even your smallest sigh, inaudible to human ears, He hears from the closest place. You are never alone, and you have not been forgotten.",
  },
  panic: {
    quotes: [
      { text: "He maketh the storm a calm, so that the waves thereof are still.", source: "Psalm 107:29 (KJV)" },
      { text: "Surely I have behaved and quieted myself, as a child that is weaned of his mother: my soul is even as a weaned child.", source: "Psalm 131:2 (KJV)" },
      { text: "From the end of the earth will I cry unto thee, when my heart is overwhelmed: lead me to the rock that is higher than I.", source: "Psalm 61:2 (KJV)" },
    ],
    reflection: "The fear crashing over you right now will pass — it will not last forever. Close your eyes. In the arms of the Rock who is higher than you, breathe in... and breathe out... slowly. The Lord is holding your very breath.",
  },
};


const CHRISTIANITY_FR: Record<string, VerseSet> = {
  disaster: {
    quotes: [
      { text: "Dieu est pour nous un refuge et un appui, Un secours qui ne manque jamais dans la détresse.", source: "Psaume 46:1 (LSG 1910)" },
      { text: "Je lève mes yeux vers les montagnes... D'où me viendra le secours ? Le secours me vient de l'Éternel, Qui a fait les cieux et la terre.", source: "Psaume 121:1-2 (LSG 1910)" },
      { text: "Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu ; je te fortifie, je viens à ton secours.", source: "Ésaïe 41:10 (LSG 1910)" },
      { text: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point.", source: "Jean 14:27 (LSG 1910)" },
      { text: "Il change la tempête en calme, Et les flots s'apaisent. On se réjouit de la tranquillité, Et l'Éternel les conduit au port désiré.", source: "Psaume 107:29-30 (LSG 1910)" },
    ],
    reflection: "Vous vous sentez peut-être dépassé, incapable de faire quoi que ce soit. Mais souvenez-vous : celui qui vous tient dans ses bras ne vacille pas, même au cœur de la tempête la plus violente. Confiez-lui votre souffle. Vous êtes en sécurité.",
  },
  conflict: {
    quotes: [
      { text: "Quand je marche dans la vallée de l'ombre de la mort, Je ne crains aucun mal, car tu es avec moi : Ta houlette et ton bâton me rassurent.", source: "Psaume 23:4 (LSG 1910)" },
      { text: "L'Éternel te gardera de tout mal, Il gardera ton âme.", source: "Psaume 121:7 (LSG 1910)" },
      { text: "L'Éternel est mon rocher, ma forteresse, mon libérateur ; Mon Dieu, mon rocher, où je me réfugie, Mon bouclier, la force qui me sauve, ma haute retraite.", source: "Psaume 18:2 (LSG 1910)" },
      { text: "Tu ne craindras ni les terreurs de la nuit, Ni la flèche qui vole de jour, Ni la peste qui marche dans les ténèbres, Ni la contagion qui frappe en plein midi. Qu'il en tombe mille à ton côté, Et dix mille à ta droite, Tu n'en seras pas atteint.", source: "Psaume 91:5-7 (LSG 1910)" },
    ],
    reflection: "Même dans l'obscurité la plus profonde, vous n'êtes pas seul. Dieu entend chacune de vos larmes et de vos respirations, et vous tient dans les bras les plus sûrs qui soient. Vous n'avez pas été oublié. Reposez-vous sous sa protection.",
  },
  accident: {
    quotes: [
      { text: "Il guérit ceux qui ont le cœur brisé, Et il panse leurs blessures.", source: "Psaume 147:3 (LSG 1910)" },
      { text: "Fortifiez-vous et ayez du courage ! Ne craignez point et ne soyez point effrayés devant eux, car l'Éternel, ton Dieu, marchera avec toi ; il ne te délaissera point et ne t'abandonnera point.", source: "Deutéronome 31:6 (LSG 1910)" },
      { text: "Il ne brisera pas le roseau froissé, Et il n'éteindra pas le lumignon qui fume encore.", source: "Ésaïe 42:3 (LSG 1910)" },
      { text: "Je me couche et je m'endors en paix, Car toi seul, ô Éternel ! tu me donnes la sécurité dans ma demeure.", source: "Psaume 4:9 (LSG 1910)" },
    ],
    reflection: "L'engourdissement et la confusion que vous ressentez maintenant sont la façon naturelle de votre cœur de se protéger du choc. Vous n'avez rien fait de mal. Appuyez-vous sur la main douce du Seigneur qui panse ce qui est déchiré. Respirez lentement. Vous n'êtes pas seul.",
  },
  loss: {
    quotes: [
      { text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", source: "Matthieu 11:28 (LSG 1910)" },
      { text: "L'Éternel est près de ceux qui ont le cœur brisé, Et il sauve ceux qui ont l'esprit dans l'abattement.", source: "Psaume 34:18 (LSG 1910)" },
      { text: "Je suis épuisé à force de gémir ; chaque nuit j'inonde ma couche de larmes, j'arrose ma couche de mes pleurs... L'Éternel a entendu mes supplications, L'Éternel a agréé ma prière.", source: "Psaume 6:7, 9 (LSG 1910)" },
      { text: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu.", source: "Apocalypse 21:4 (LSG 1910)" },
    ],
    reflection: "Vos larmes et votre chagrin sont la marque naturelle de l'amour que vous portiez à celui qui est parti. Vous n'avez pas besoin de vous retenir. Le Seigneur pleure avec vous en ce moment, vous tenant silencieusement dans ses bras. Vous n'avez pas à porter ce fardeau seul.",
  },
  refugee: {
    quotes: [
      { text: "L'Éternel protège les étrangers, Il soutient l'orphelin et la veuve.", source: "Psaume 146:9 (LSG 1910)" },
      { text: "Je suis avec toi, et je te garderai partout où tu iras, et je te ramènerai dans ce pays ; car je ne t'abandonnerai point que je n'aie exécuté ce que je t'ai dit.", source: "Genèse 28:15 (LSG 1910)" },
      { text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.", source: "Jérémie 29:11 (LSG 1910)" },
    ],
    reflection: "Sur ce chemin inconnu, l'avenir incertain et solitaire — souvenez-vous : Dieu n'est pas lié à un lieu ou à un bâtiment. Il marche à chacun de vos pas. Il sera votre refuge où que vous posiez le pied, et il a préparé paix et espoir au bout de ce chemin. Vous n'êtes pas seul.",
  },
  isolation: {
    quotes: [
      { text: "Où irais-je loin de ton esprit ? Où fuirais-je loin de ta face ? Si je monte aux cieux, tu y es ; si je me couche au séjour des morts, t'y voilà.", source: "Psaume 139:7-8 (LSG 1910)" },
      { text: "L'Éternel est près de tous ceux qui l'invoquent, De tous ceux qui l'invoquent avec sincérité.", source: "Psaume 145:18 (LSG 1910)" },
      { text: "Déchargez-vous sur lui de tous vos soucis, car il prend soin de vous.", source: "1 Pierre 5:7 (LSG 1910)" },
      { text: "L'Éternel a entendu mes supplications, L'Éternel a agréé ma prière.", source: "Psaume 6:9 (LSG 1910)" },
    ],
    reflection: "Dans le silence le plus profond, quand tout lien semble rompu — son Esprit est déjà là, respirant avec vous. Même votre plus petit soupir, inaudible aux oreilles humaines, il l'entend de tout près. Vous n'êtes jamais seul, et vous n'avez pas été oublié.",
  },
  panic: {
    quotes: [
      { text: "Il change la tempête en calme, Et les flots s'apaisent.", source: "Psaume 107:29 (LSG 1910)" },
      { text: "Mais j'ai calmé et apaisé mon âme, Comme un enfant sevré qui est avec sa mère : Mon âme est en moi comme un enfant sevré.", source: "Psaume 131:2 (LSG 1910)" },
      { text: "Du bout de la terre j'invoque l'Éternel, quand mon cœur est abattu. Conduis-moi sur un rocher plus élevé que moi.", source: "Psaume 61:2 (LSG 1910)" },
    ],
    reflection: "La peur qui vous submerge en ce moment passera — elle ne durera pas éternellement. Fermez les yeux. Dans les bras du Rocher qui est plus haut que vous, respirez lentement... inspirez... expirez... Le Seigneur tient votre souffle même maintenant.",
  },
};


const CHRISTIANITY_SW: Record<string, VerseSet> = {
  disaster: {
    quotes: [
      { text: "Mungu ni kimbilio letu na nguvu zetu, msaada wa karibu wakati wa dhiki.", source: "Zaburi 46:1 (ref.)" },
      { text: "Ninainua macho yangu kuelekea milima — msaada wangu unatoka wapi? Msaada wangu unatoka kwa BWANA, aliyeumba mbingu na nchi.", source: "Zaburi 121:1-2 (ref.)" },
      { text: "Usiogope, kwa maana mimi ni nawe; usifadhaike, kwa maana mimi ni Mungu wako. Nitakuimarisha, naam, nitakusaidia.", source: "Isaya 41:10 (ref.)" },
      { text: "Amani nawachia ninyi, amani yangu nawapa ninyi. Moyo wenu usifadhaike, wala usiogope.", source: "Yohana 14:27 (ref.)" },
      { text: "Akafanya dhoruba kutulia, na mawimbi yakanyamaza. Wakafurahi kwa sababu mawimbi yalitulia; naye akawaongoza hadi bandarini walipoitamani.", source: "Zaburi 107:29-30 (ref.)" },
    ],
    reflection: "Unaweza kuhisi umezidiwa, huwezi kufanya chochote. Lakini kumbuka: yeye anayekushikilia hakutikisiki hata katikati ya dhoruba kali zaidi. Pumzika katika upendo huo. Uko salama.",
  },
  conflict: {
    quotes: [
      { text: "Hata nikipita katika bonde la kivuli cha mauti, sitaogopa mabaya, kwa maana wewe u pamoja nami; fimbo yako na mkongojo wako vyanituliza.", source: "Zaburi 23:4 (ref.)" },
      { text: "BWANA atakuhifadhi na kila uovu; atalihifadhi nafsi yako.", source: "Zaburi 121:7 (ref.)" },
      { text: "BWANA ni mwamba wangu, ngome yangu, na mkombozi wangu; Mungu wangu, mwamba wangu, ninaomkimbilia, ngao yangu, na pembe ya wokovu wangu.", source: "Zaburi 18:2 (ref.)" },
      { text: "Hutaogopa hofu ya usiku, wala mshale urukao mchana, wala tauni ienendayo gizani, wala maangamizo yaleteao ukiwa adhuhuri. Watu elfu watapigwa upande wako wa kushoto, na elfu kumi upande wako wa kuume, lakini haitakujia wewe.", source: "Zaburi 91:5-7 (ref.)" },
    ],
    reflection: "Hata katika giza kubwa, huko peke yako. Mungu anasikia kila machozi na pumzi yako, na anakushika mikononi salama zaidi. Hukusahauliwa. Pumzika chini ya ulinzi wake.",
  },
  accident: {
    quotes: [
      { text: "Yeye huwaponya wale waliomvunjika moyo na kufunga vidonda vyao.", source: "Zaburi 147:3 (ref.)" },
      { text: "Uwe hodari na ushujaa; usiogope wala usifadhaike mbele yao, kwa maana BWANA, Mungu wako, ndiye aendaye nawe; hatakuacha wala hatakupoteza.", source: "Kumbukumbu 31:6 (ref.)" },
      { text: "Utepe uliopondeka hatautavunja, na kitambaa kinachofuka hatakizimisha.", source: "Isaya 42:3 (ref.)" },
      { text: "Nitalala na kulala kwa amani; kwa maana wewe peke yako, Ee BWANA, unaniwezesha kukaa salama.", source: "Zaburi 4:8 (ref.)" },
    ],
    reflection: "Ganzi na mkanganyiko unaohisi sasa ni jibu la asili la moyo wako kulindwa dhidi ya msongo wa mshtuko. Hukufanya kosa lolote. Tegemea mkono wa upole wa Bwana unaofunga majeraha. Pumua polepole. Huko peke yako.",
  },
  loss: {
    quotes: [
      { text: "Njooni kwangu, ninyi nyote mnaochoka na mzigo mzito, nami nitawapumzisha.", source: "Mathayo 11:28 (ref.)" },
      { text: "BWANA yuko karibu na wale waliomvunjika moyo, na huwaokoa wenye roho zilizovunjika.", source: "Zaburi 34:18 (ref.)" },
      { text: "Nimechoka kwa kuugua; kila usiku ninafurika machozi kitandani mwangu... BWANA amesikia sauti ya kulia kwangu.", source: "Zaburi 6:6, 8 (ref.)" },
      { text: "Naye atafuta kila chozi kutoka macho yao, na mauti hayatakuwepo tena, wala huzuni, wala kilio, wala maumivu hayatakuwepo tena.", source: "Ufunuo 21:4 (ref.)" },
    ],
    reflection: "Machozi yako na huzuni ni alama ya kawaida ya upendo kwa aliyeondoka. Huhitaji kuzuia. Bwana analia nawe sasa hivi, akikushika kwa kimya. Huhitaji kubeba mzigo huu peke yako.",
  },
  refugee: {
    quotes: [
      { text: "BWANA hulinda wageni; huwasaidia yatima na wajane.", source: "Zaburi 146:9 (ref.)" },
      { text: "Mimi niko pamoja nawe, na nitakulinda kila mahali uendapo, wala sitakuacha mpaka nitakapokutimizea niliyokuahidi.", source: "Mwanzo 28:15 (ref.)" },
      { text: "Kwa maana ninajua mawazo ninayowafikiria, asema BWANA, mawazo ya amani, wala si ya mabaya, kuwapa ninyi tumaini siku zijazo.", source: "Yeremia 29:11 (ref.)" },
    ],
    reflection: "Ukiwa barabarani isiyojulikana, mustakabali ni wa kutokuwa na uhakika — kumbuka: Mungu hafungwi mahali. Anatembea na kila hatua yako. Atakuwa kimbilio lako popote utakapoweka mguu wako, na ameandaa amani na matumaini mwishoni mwa safari hiyo. Huko peke yako.",
  },
  isolation: {
    quotes: [
      { text: "Nikienda wapi mbali na Roho wako? Au nikikimbia wapi mbali na uso wako? Nikipaa mbinguni, uko huko; nikilala kuzimu, uko huko.", source: "Zaburi 139:7-8 (ref.)" },
      { text: "BWANA yuko karibu na wote wamwitao, wote wamwitao kwa kweli.", source: "Zaburi 145:18 (ref.)" },
      { text: "Mtwike yeye makusudio yenu yote, kwa sababu yeye hujishughulisha na ninyi.", source: "1 Petro 5:7 (ref.)" },
      { text: "BWANA amesikia dua yangu; BWANA amepokea maombi yangu.", source: "Zaburi 6:9 (ref.)" },
    ],
    reflection: "Katika ukimya wa kina zaidi, wakati kila uhusiano unaonekana kukatika — Roho wake tayari yuko hapo, akipumua nawe. Hata hija yako ndogo, isiyosikika na masikio ya binadamu, anaisikia karibu sana. Huko peke yako kamwe, na hukusahauliwa.",
  },
  panic: {
    quotes: [
      { text: "Akafanya dhoruba kutulia, na mawimbi yakanyamaza.", source: "Zaburi 107:29 (ref.)" },
      { text: "Hakika nilikuwa nimetuliza na kutuliza nafsi yangu, kama mtoto aliyeachishwa maziwa kwa mama yake; nafsi yangu ilikuwa kama mtoto aliyeachishwa maziwa.", source: "Zaburi 131:2 (ref.)" },
      { text: "Kutoka miisho ya nchi nitamlilia, moyo wangu ukizidiwa nguvu. Niongoze kwenye mwamba mrefu zaidi kuliko mimi.", source: "Zaburi 61:2 (ref.)" },
    ],
    reflection: "Hofu inayokupigilia sasa itapita — haitadumu milele. Funga macho yako. Mikononi mwa Mwamba aliye juu zaidi kuliko wewe, pumua polepole... pumua ndani... pumua nje... Bwana anashika pumzi yako hata sasa.",
  },
};

const SECULAR_CONTENT: Record<Language, { quote: string; source: string; reflection: string }> = {
  ko: {
    quote: "나아가기 위해 모든 것을 이해할 필요는 없습니다.",
    source: "힘든 날을 위한 위로",
    reflection: "당신은 지금까지의 모든 힘든 날을 헤쳐왔습니다. 그것이 진짜 강인함입니다.",
  },
  en: {
    quote: "You don't have to have it all figured out to move forward.",
    source: "A reminder for hard days",
    reflection: "You've made it through every hard day so far. That is real strength.",
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
};

const TRADITION_META: Record<string, { emoji: string; labelKey: string }> = {
  christianity: { emoji: "✝️", labelKey: "spiritual.christianity" },
  secular:      { emoji: "🌿", labelKey: "spiritual.secular" },
};

interface SpiritualComfortProps {
  initialTradition?: string;
  situationId?: string;
}

export default function SpiritualComfort({ initialTradition, situationId }: SpiritualComfortProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const tradition = initialTradition ?? "none";
  if (tradition === "none") return null;

  const lang = (i18n.language?.slice(0, 2) as Language) || "en";
  const validLang: Language = ["en", "ko", "fr", "sw"].includes(lang) ? lang : "en";

  const meta = TRADITION_META[tradition];
  if (!meta) return null;

  const getPool = () => {
    if (tradition === "christianity") {
      const map = validLang === "ko" ? CHRISTIANITY_KO
                : validLang === "en" ? CHRISTIANITY_EN
                : validLang === "fr" ? CHRISTIANITY_FR
                : validLang === "sw" ? CHRISTIANITY_SW
                : null;
      if (map) return map[situationId ?? ""] ?? map["disaster"];
    }
    return null;
  };
  const pool = getPool();
  const [verseIndex, setVerseIndex] = React.useState(
    () => pool ? Math.floor(Math.random() * pool.quotes.length) : 0
  );
  const { quote, source, reflection } = useMemo(() => {
    if (pool) {
      const idx = verseIndex % pool.quotes.length;
      return { quote: pool.quotes[idx].text, source: pool.quotes[idx].source, reflection: pool.reflection };
    }
    const s = SECULAR_CONTENT[validLang];
    return { quote: s.quote, source: s.source, reflection: s.reflection };
  }, [tradition, validLang, situationId, verseIndex]);

  const changeLabel =
    validLang === "ko" ? "다른 전통 선택하기" :
    validLang === "fr" ? "Choisir une autre tradition" :
    validLang === "sw" ? "Chagua mila nyingine" :
    "Choose a different tradition";
  const nextVerseLabel =
    validLang === "ko" ? "다른 말씀 보기" :
    validLang === "fr" ? "Voir un autre verset" :
    validLang === "sw" ? "Ona aya nyingine" :
    "See another verse";
  const hasMultipleVerses = pool && pool.quotes.length > 1;

  return (
    <div style={{
      borderRadius: "16px",
      border: "1px solid var(--color-border)",
      backgroundColor: "var(--color-surface)",
      padding: "1.25rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
        <span style={{ fontSize: "1.1rem" }}>{meta.emoji}</span>
        <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text)", margin: 0 }}>
          {t(meta.labelKey)}
        </h3>
      </div>
      <blockquote style={{
        margin: "0 0 0.5rem",
        paddingLeft: "0.75rem",
        borderLeft: "3px solid var(--color-primary)",
        fontSize: "0.875rem",
        fontStyle: "italic",
        color: "var(--color-text)",
        lineHeight: 1.7,
      }}>
        "{quote}"
      </blockquote>
      <p style={{ margin: "0 0 0.875rem", textAlign: "right", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
        — {source}
      </p>
      <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.7, color: "var(--color-text-muted)" }}>
        {reflection}
      </p>
      {hasMultipleVerses && (
        <button
          onClick={() => setVerseIndex(i => i + 1)}
          style={{
            marginTop: "0.875rem",
            display: "block",
            width: "100%",
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid var(--color-border)",
            backgroundColor: "transparent",
            fontSize: "0.78rem",
            color: "var(--color-primary)",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          🔄 {nextVerseLabel}
        </button>
      )}
      <button
        onClick={() => navigate("/", { state: { step: 2 } })}
        style={{
          marginTop: "0.5rem",
          background: "none",
          border: "none",
          padding: 0,
          fontSize: "0.72rem",
          color: "var(--color-text-muted)",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {changeLabel}
      </button>
    </div>
  );
}
