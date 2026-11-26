/* ==========================================================================
   ឯកសារគ្រប់គ្រងភាសាខ្មែរ និងអង់គ្លេស (Bilingual Dictionary - js/language.js)
   ផ្ទុកឃ្លាបកប្រែទាំងអស់សម្រាប់ចំណុចប្រទាក់ និងជំហានដោះស្រាយគណិតវិទ្យា
   ========================================================================== */

const TRANSLATIONS = {
  km: {
    brandSub: "គណិតវិទ្យាវិទ្យាល័យ",
    navHome: "ទំព័រដើម",
    navQuadratic: "សមីការដឺក្រេទី ២",
    navCubic: "សមីការដឺក្រេទី ៣",
    navFormulas: "រូបមន្តគណិតវិទ្យា",
    navHistory: "ប្រវត្តិគណនា",
    navTeam: "ក្រុមការងារ",
    navAbout: "អំពីកម្មវិធី",
    quickTipTitle: "គន្លឹះរហ័ស",
    darkMode: "ងងឹត",
    lightMode: "ភ្លឺ",
    heroBadge: "✨ ឧបករណ៍សិក្សាគណិតវិទ្យាទំនើប",
    heroTitle: "ដោះស្រាយសមីការដឺក្រេទី ២ និងទី ៣ យ៉ាងងាយស្រួល និងច្បាស់លាស់",
    heroDesc: "គណនាឫសពិត ឫសកុំផ្លិច ឫសឌុប និងករណីពិសេសទាំងអស់ ព្រមទាំងបង្ហាញដំណោះស្រាយជាជំហានៗ ជាភាសាខ្មែរ និងអង់គ្លេស។",
    startQuadBtn: "ដោះស្រាយសមីការដឺក្រេទី ២",
    startCubicBtn: "ដោះស្រាយសមីការដឺក្រេទី ៣",
    feat1Title: "សមីការដឺក្រេទី ២",
    feat1Desc: "គណនា Δ, ឫសពិត ២ ផ្សេងគ្នា, ឫសឌុប, ឫសកុំផ្លិច និងករណី a = 0 យ៉ាងលម្អិត។",
    feat2Title: "សមីការដឺក្រេទី ៣",
    feat2Desc: "ប្រើវិធីសាស្ត្រ Cardano & Trigonometric ដើម្បីរកឫសទាំង ៣ គ្រប់លក្ខខណ្ឌទាំងអស់។",
    feat3Title: "បណ្ណាល័យរូបមន្ត",
    feat3Desc: "សង្ខេបរូបមន្តសំខាន់ៗ ទ្រឹស្តីបទ Viète និងលក្ខខណ្ឌនៃឌីស្គ្រីមីណង់។",
    feat4Title: "គម្រោងក្រុមសិស្ស",
    feat4Desc: "រៀបចំឡើងសម្រាប់ការធ្វើបទបង្ហាញថ្នាក់វិទ្យាល័យ ដោយប្រធានក្រុម ១ នាក់ និងសមាជិក ៤ នាក់។",
    quadCardTitle: "សមីការដឺក្រេទី ២ (ax² + bx + c = 0)",
    cubicCardTitle: "សមីការដឺក្រេទី ៣ (ax³ + bx² + cx + d = 0)",
    coeffLabel: "មេគុណ",
    constLabel: "ចំនួនថេរ",
    examplesLabel: "ឧទាហរណ៍៖",
    exQuadReal: "ឫសពិត ២",
    exQuadDouble: "ឫសឌុប",
    exQuadComplex: "ឫសកុំផ្លិច",
    exQuadLinear: "ដឺក្រេទី ១ (a=0)",
    exNoSol: "គ្មានចម្លើយ",
    exInfSol: "ចម្លើយរាប់មិនអស់",
    exCubic3Real: "ឫសពិត ៣",
    exCubicTriple: "ឫសពិត ៣ ដូចគ្នា",
    exCubicDouble: "ឫសពិត & ឫសឌុប",
    exCubic1Real2Comp: "១ ពិត, ២ កុំផ្លិច",
    exCubicDeg2: "ដឺក្រេទី ២ (a=0)",
    btnCalculate: "គណនា",
    btnClear: "សម្អាត",
    emptyResultHint: "សូមបញ្ចូលមេគុណ រួចចុចប៊ូតុង \"គណនា\" ដើម្បីមើលដំណោះស្រាយលម្អិត។",
    stepsHeading: "ជំហាននៃការដោះស្រាយ (Step-by-Step):",
    finalAnswerHeading: "ចម្លើយចុងក្រោយ (Final Answer):",
    invalidInputError: "សូមបញ្ចូលលេខឱ្យបានត្រឹមត្រូវក្នុងប្រអប់មេគុណទាំងអស់!",
    formQuadTitle: "រូបមន្តសមីការដឺក្រេទី ២",
    formDiscriminant: "ឌីស្គ្រីមីណង់ (Discriminant):",
    formCase1: "ករណី Δ > 0 (ឫសពិត ២ ផ្សេងគ្នា):",
    formCase2: "ករណី Δ = 0 (ឫសឌុប):",
    formCase3: "ករណី Δ < 0 (ឫសកុំផ្លិចឆ្លាស់):",
    formViete: "ទំនាក់ទំនង Viète:",
    formCubicTitle: "រូបមន្តសមីការដឺក្រេទី ៣ (Cardano)",
    formDepressed: "បម្លែងជាទម្រង់សង្ខេប (x = t - b/3a):",
    formPQ: "មេគុណ p និង q:",
    formCubicDelta: "ឌីស្គ្រីមីណង់ដឺក្រេទី ៣:",
    formCardanoRoot: "រូបមន្ត Cardano (Δ₀ > 0):",
    formCubicViete: "ទំនាក់ទំនង Viète ដឺក្រេទី ៣:",
    historyTitle: "ប្រវត្តិនៃការគណនាសមីការ",
    historySub: "រក្សាទុកសមីការដែលអ្នកបានគណនាដោយស្វ័យប្រវត្តិក្នុងកម្មវិធី។",
    btnClearHistory: "លុបប្រវត្តិទាំងអស់",
    noHistoryMsg: "មិនទាន់មានប្រវត្តិគណនានៅឡើយទេ។ សូមសាកល្បងដោះស្រាយសមីការមួយ!",
    teamTitle: "សមាជិកក្រុមអភិវឌ្ឍន៍គម្រោង",
    teamSub: "គម្រោងបទបង្ហាញថ្នាក់វិទ្យាល័យ៖ ប្រធានក្រុម ១ នាក់ និងសមាជិក ៤ នាក់",
    aboutTagline: "កម្មវិធីដោះស្រាយសមីការពិជគណិតសម្រាប់សិស្សវិទ្យាល័យ",
    aboutDesc1: "Equation Solver Pro ត្រូវបានបង្កើតឡើងក្នុងគោលបំណងជួយសម្រួលដល់សិស្សានុសិស្ស និងលោកគ្រូអ្នកគ្រូក្នុងការសិក្សា ផ្ទៀងផ្ទាត់ចម្លើយ និងយល់ដឹងពីជំហានលម្អិតនៃការដោះស្រាយសមីការដឺក្រេទី ២ និងដឺក្រេទី ៣។",
    techUsedTitle: "បច្ចេកវិទ្យាដែលបានប្រើប្រាស់៖",
    // ឃ្លាបកប្រែសម្រាប់លក្ខខណ្ឌដោះស្រាយសមីការ (Solver Condition Labels)
    condInf: "ករណី 0 = 0 (សមីការមានចម្លើយរាប់មិនអស់)",
    condNoSol: "ករណី c = 0 ដែល c ≠ 0 (សមីការគ្មានចម្លើយ)",
    condLinear: "សមីការដឺក្រេទី ១ (Linear Equation: bx + c = 0)",
    condQuad2Real: "Δ > 0 : សមីការមានឫសពិត ២ ផ្សេងគ្នា",
    condQuadDouble: "Δ = 0 : សមីការមានឫសឌុប (ឫសពិត ២ ដូចគ្នា)",
    condQuadComplex: "Δ < 0 : សមីការមានឫសកុំផ្លិចឆ្លាស់ ២",
    condCubic3Real: "Δ₀ < 0 : សមីការដឺក្រេទី ៣ មានឫសពិត ៣ ផ្សេងគ្នា",
    condCubicTriple: "Δ₀ = 0, p = q = 0 : សមីការមានឫសពិត ៣ ដូចគ្នា (ឫសត្រីគុណ)",
    condCubicDoubleReal: "Δ₀ = 0 : សមីការមានឫសពិត ៣ (ឫសទោល ១ និងឫសឌុប ១)",
    condCubic1Real2Comp: "Δ₀ > 0 : សមីការមានឫសពិត ១ និងឫសកុំផ្លិចឆ្លាស់ ២"
  },
  en: {
    brandSub: "High School Mathematics",
    navHome: "Home",
    navQuadratic: "Quadratic Solver",
    navCubic: "Cubic Solver",
    navFormulas: "Formulas",
    navHistory: "History",
    navTeam: "Team Work",
    navAbout: "About",
    quickTipTitle: "Quick Formula",
    darkMode: "Dark",
    lightMode: "Light",
    heroBadge: "✨ Modern Math Learning Tool",
    heroTitle: "Solve Quadratic & Cubic Equations Easily and Accurately",
    heroDesc: "Compute real roots, complex roots, repeated roots, and degenerate edge cases with clear step-by-step explanations in Khmer & English.",
    startQuadBtn: "Solve Quadratic Equation",
    startCubicBtn: "Solve Cubic Equation",
    feat1Title: "Quadratic Solver",
    feat1Desc: "Computes Δ, two distinct real roots, double roots, complex conjugates, and linear cases (a = 0).",
    feat2Title: "Cubic Solver",
    feat2Desc: "Uses Cardano & Trigonometric methods to find all 3 roots across every mathematical condition.",
    feat3Title: "Formula Reference",
    feat3Desc: "Quick summary of discriminants, Viète's formulas, and Cardano's depressed cubic reduction.",
    feat4Title: "Student Team Project",
    feat4Desc: "Designed for high-school presentations by 1 Team Leader and 4 dedicated Members.",
    quadCardTitle: "Quadratic Equation (ax² + bx + c = 0)",
    cubicCardTitle: "Cubic Equation (ax³ + bx² + cx + d = 0)",
    coeffLabel: "Coeff",
    constLabel: "Constant",
    examplesLabel: "Examples:",
    exQuadReal: "2 Real Roots",
    exQuadDouble: "Double Root",
    exQuadComplex: "Complex Roots",
    exQuadLinear: "Linear (a=0)",
    exNoSol: "No Solution",
    exInfSol: "Infinite Solutions",
    exCubic3Real: "3 Real Roots",
    exCubicTriple: "Triple Real Root",
    exCubicDouble: "Real & Double Root",
    exCubic1Real2Comp: "1 Real, 2 Complex",
    exCubicDeg2: "Quadratic (a=0)",
    btnCalculate: "Calculate",
    btnClear: "Clear",
    emptyResultHint: "Enter the coefficients and click \"Calculate\" to view the step-by-step solution.",
    stepsHeading: "Step-by-Step Solution:",
    finalAnswerHeading: "Final Answer:",
    invalidInputError: "Please enter valid numbers for all coefficients!",
    formQuadTitle: "Quadratic Equation Formulas",
    formDiscriminant: "Discriminant:",
    formCase1: "Case Δ > 0 (Two Distinct Real Roots):",
    formCase2: "Case Δ = 0 (Repeated / Double Root):",
    formCase3: "Case Δ < 0 (Two Complex Conjugate Roots):",
    formViete: "Viète's Formulas:",
    formCubicTitle: "Cubic Equation Formulas (Cardano)",
    formDepressed: "Depressed Cubic Substitution (x = t - b/3a):",
    formPQ: "Coefficients p and q:",
    formCubicDelta: "Cubic Discriminant:",
    formCardanoRoot: "Cardano's Formula (Δ₀ > 0):",
    formCubicViete: "Cubic Viète's Formulas:",
    historyTitle: "Calculation History",
    historySub: "Automatically saves your solved equations locally in the browser.",
    btnClearHistory: "Clear All History",
    noHistoryMsg: "No calculation history yet. Try solving an equation!",
    teamTitle: "Project Development Team",
    teamSub: "High-School Presentation Project: 1 Team Leader & 4 Members",
    aboutTagline: "Algebraic Equation Solver Web App for High-School Students",
    aboutDesc1: "Equation Solver Pro is built to help students and teachers verify answers and understand every algebraic step in solving quadratic and cubic equations.",
    techUsedTitle: "Technologies Used:",
    condInf: "Identity 0 = 0 (Infinitely Many Solutions)",
    condNoSol: "Contradiction c = 0 where c ≠ 0 (No Solution)",
    condLinear: "Linear Equation (bx + c = 0)",
    condQuad2Real: "Δ > 0 : Two Distinct Real Roots",
    condQuadDouble: "Δ = 0 : One Repeated (Double) Real Root",
    condQuadComplex: "Δ < 0 : Two Complex Conjugate Roots",
    condCubic3Real: "Δ₀ < 0 : Three Distinct Real Roots",
    condCubicTriple: "Δ₀ = 0, p = q = 0 : One Triple Real Root",
    condCubicDoubleReal: "Δ₀ = 0 : Three Real Roots (One Simple & One Double)",
    condCubic1Real2Comp: "Δ₀ > 0 : One Real Root & Two Complex Conjugate Roots"
  }
};

// អថេររក្សាទុកភាសាបច្ចុប្បន្ន (Current Language State)
let currentLang = localStorage.getItem("eqSolverLang") || "km";

// អនុគមន៍ទាញយកពាក្យបកប្រែតាមរយៈ Key
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.km[key] || key;
}

// អនុគមន៍ធ្វើបច្ចុប្បន្នភាពភាសាលើធាតុ HTML ទាំងអស់ដែលមាន data-i18n
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("eqSolverLang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // ប្តូរស្លាកប៊ូតុងភាសា និងផ្ទាំងភ្លឺ/ងងឹត
  const langFlag = document.getElementById("langFlag");
  const langText = document.getElementById("langText");
  if (langFlag && langText) {
    langFlag.textContent = lang === "km" ? "🇰🇭" : "🇬🇧";
    langText.textContent = lang === "km" ? "ខ្មែរ / EN" : "EN / ខ្មែរ";
  }

  const theme = document.documentElement.getAttribute("data-theme");
  const themeLabel = document.getElementById("themeLabel");
  if (themeLabel) {
    themeLabel.textContent = theme === "dark" ? t("lightMode") : t("darkMode");
  }

  // 更新ចំណងជើងទំព័របច្ចុប្បន្ន
  const activeNav = document.querySelector(".nav-item.active .nav-label");
  const pageHeading = document.getElementById("currentPageTitle");
  if (activeNav && pageHeading) {
    pageHeading.textContent = activeNav.textContent;
  }
}
