/* ==========================================================================
   ម៉ូឌុលដោះស្រាយសមីការដឺក្រេទី ២ (Quadratic Equation Solver - js/quadratic.js)
   គាំទ្រគ្រប់លក្ខខណ្ឌ៖ ឫសពិត ២, ឫសឌុប, ឫសកុំផ្លិច, a=0 (ដឺក្រេទី ១), គ្មានចម្លើយ និងចម្លើយរាប់មិនអស់
   ========================================================================== */

const EPSILON = 1e-10; // កម្រិតលម្អៀងតូចបំផុតសម្រាប់ផ្ទៀងផ្ទាត់តម្លៃសូន្យ (Floating-point tolerance)

// អនុគមន៍បង្គត់លេខឱ្យស្អាត (Format numbers cleanly without ugly floating errors)
function fmtNum(num) {
  if (Math.abs(num) < EPSILON) return "0";
  const rounded = Math.round(num * 1e6) / 1e6;
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(4).replace(/\.?0+$/, "");
}

// អនុគមន៍បង្កើតទម្រង់សមីការដឺក្រេទី ២ ឱ្យស្អាត (Format ax² + bx + c = 0)
function formatQuadraticEquation(a, b, c) {
  const parts = [];
  if (Math.abs(a) >= EPSILON) {
    parts.push(`${a === 1 ? "" : a === -1 ? "-" : fmtNum(a)}x²`);
  }
  if (Math.abs(b) >= EPSILON) {
    const sign = b > 0 && parts.length > 0 ? " + " : b < 0 ? (parts.length > 0 ? " - " : "-") : "";
    const absB = Math.abs(b);
    parts.push(`${sign}${absB === 1 ? "" : fmtNum(absB)}x`);
  }
  if (Math.abs(c) >= EPSILON || parts.length === 0) {
    const sign = c > 0 && parts.length > 0 ? " + " : c < 0 ? (parts.length > 0 ? " - " : "-") : "";
    parts.push(`${sign}${fmtNum(Math.abs(c))}`);
  }
  return `${parts.join("")} = 0`;
}

// អនុគមន៍មេសម្រាប់ដោះស្រាយសមីការ ax² + bx + c = 0
function solveQuadraticEquation(a, b, c, lang = "km") {
  const isKm = lang === "km";
  const eqStr = formatQuadraticEquation(a, b, c);
  const steps = [];
  const roots = [];
  let conditionKey = "";

  // ជំហានទី ១៖ បង្ហាញសមីការដើម
  steps.push(
    isKm
      ? `សមីការដែលត្រូវដោះស្រាយ៖ <strong class="math-font">${eqStr}</strong> (a = ${fmtNum(a)}, b = ${fmtNum(b)}, c = ${fmtNum(c)})`
      : `Given equation: <strong class="math-font">${eqStr}</strong> (a = ${fmtNum(a)}, b = ${fmtNum(b)}, c = ${fmtNum(c)})`
  );

  // ករណីទី ១៖ a = 0 (សមីការក្លាយជាដឺក្រេទី ១ ឬសមីការថេរ)
  if (Math.abs(a) < EPSILON) {
    steps.push(
      isKm
        ? `ដោយសារមេគុណ <strong>a = 0</strong> សមីការក្លាយជាសមីការដឺក្រេទី ១៖ <span class="math-font">${fmtNum(b)}x + (${fmtNum(c)}) = 0</span>`
        : `Since <strong>a = 0</strong>, the equation reduces to linear form: <span class="math-font">${fmtNum(b)}x + (${fmtNum(c)}) = 0</span>`
    );

    if (Math.abs(b) < EPSILON) {
      if (Math.abs(c) < EPSILON) {
        // 0 = 0 -> ចម្លើយរាប់មិនអស់
        conditionKey = "condInf";
        steps.push(
          isKm
            ? `យើងបាន <strong>0 = 0</strong> ដែលពិតជានិច្ចចំពោះគ្រប់តម្លៃ x ∈ ℝ។`
            : `We obtain <strong>0 = 0</strong>, which holds true for every real number x ∈ ℝ.`
        );
        roots.push(isKm ? "x ∈ ℝ (ចម្លើយរាប់មិនអស់)" : "x ∈ ℝ (Infinitely many solutions)");
      } else {
        // c = 0 (c != 0) -> គ្មានចម្លើយ
        conditionKey = "condNoSol";
        steps.push(
          isKm
            ? `យើងបាន <strong>${fmtNum(c)} = 0</strong> ដែលមិនពិត (ផ្ទុយស្រឡះ) ដូច្នេះសមីការគ្មានចម្លើយ។`
            : `We obtain <strong>${fmtNum(c)} = 0</strong>, a contradiction, so there is no solution.`
        );
        roots.push(isKm ? "S = ∅ (គ្មានចម្លើយ)" : "S = ∅ (No solution)");
      }
    } else {
      // bx + c = 0 => x = -c / b
      conditionKey = "condLinear";
      const x = -c / b;
      steps.push(
        isKm
          ? `ទាញរក x៖ <span class="math-font">x = -c / b = -(${fmtNum(c)}) / ${fmtNum(b)} = <strong>${fmtNum(x)}</strong></span>`
          : `Solve for x: <span class="math-font">x = -c / b = -(${fmtNum(c)}) / ${fmtNum(b)} = <strong>${fmtNum(x)}</strong></span>`
      );
      roots.push(`x = ${fmtNum(x)}`);
    }

    return { equation: eqStr, conditionKey, steps, roots };
  }

  // ករណីទី ២៖ a ≠ 0 (សមីការដឺក្រេទី ២ ពេញលេញ)
  const delta = b * b - 4 * a * c;
  steps.push(
    isKm
      ? `គណនាឌីស្គ្រីមីណង់៖ <span class="math-font">Δ = b² - 4ac = (${fmtNum(b)})² - 4(${fmtNum(a)})(${fmtNum(c)}) = <strong>${fmtNum(delta)}</strong></span>`
      : `Compute discriminant: <span class="math-font">Δ = b² - 4ac = (${fmtNum(b)})² - 4(${fmtNum(a)})(${fmtNum(c)}) = <strong>${fmtNum(delta)}</strong></span>`
  );

  if (delta > EPSILON) {
    // Δ > 0 : ឫសពិត ២ ផ្សេងគ្នា
    conditionKey = "condQuad2Real";
    const sqrtDelta = Math.sqrt(delta);
    const x1 = (-b + sqrtDelta) / (2 * a);
    const x2 = (-b - sqrtDelta) / (2 * a);

    steps.push(
      isKm
        ? `ដោយសារ <strong>Δ = ${fmtNum(delta)} > 0</strong> សមីការមានឫសពិត ២ ផ្សេងគ្នា (√Δ = ${fmtNum(sqrtDelta)})៖`
        : `Since <strong>Δ = ${fmtNum(delta)} > 0</strong>, there are two distinct real roots (√Δ = ${fmtNum(sqrtDelta)}):`
    );
    steps.push(
      `<span class="math-font">x₁ = (-b + √Δ) / 2a = (${fmtNum(-b)} + ${fmtNum(sqrtDelta)}) / ${fmtNum(2 * a)} = <strong>${fmtNum(x1)}</strong></span>`
    );
    steps.push(
      `<span class="math-font">x₂ = (-b - √Δ) / 2a = (${fmtNum(-b)} - ${fmtNum(sqrtDelta)}) / ${fmtNum(2 * a)} = <strong>${fmtNum(x2)}</strong></span>`
    );

    roots.push(`x₁ = ${fmtNum(x1)}`, `x₂ = ${fmtNum(x2)}`);
  } else if (Math.abs(delta) <= EPSILON) {
    // Δ = 0 : ឫសឌុប
    conditionKey = "condQuadDouble";
    const x = -b / (2 * a);

    steps.push(
      isKm
        ? `ដោយសារ <strong>Δ = 0</strong> សមីការមានឫសឌុប (ឫសពិត ២ ដូចគ្នា)៖`
        : `Since <strong>Δ = 0</strong>, there is one repeated (double) real root:`
    );
    steps.push(
      `<span class="math-font">x₁ = x₂ = -b / 2a = ${fmtNum(-b)} / ${fmtNum(2 * a)} = <strong>${fmtNum(x)}</strong></span>`
    );

    roots.push(`x₁ = x₂ = ${fmtNum(x)}`);
  } else {
    // Δ < 0 : ឫសកុំផ្លិចឆ្លាស់ ២
    conditionKey = "condQuadComplex";
    const absDelta = Math.abs(delta);
    const sqrtAbsDelta = Math.sqrt(absDelta);
    const realPart = -b / (2 * a);
    const imagPart = Math.abs(sqrtAbsDelta / (2 * a));

    steps.push(
      isKm
        ? `ដោយសារ <strong>Δ = ${fmtNum(delta)} < 0</strong> សមីការគ្មានឫសពិតទេ តែមានឫសកុំផ្លិចឆ្លាស់ ២ (√|Δ| = ${fmtNum(sqrtAbsDelta)})៖`
        : `Since <strong>Δ = ${fmtNum(delta)} < 0</strong>, there are no real roots, only two complex conjugate roots (√|Δ| = ${fmtNum(sqrtAbsDelta)}):`
    );
    steps.push(
      `<span class="math-font">x = (-b ± i√|Δ|) / 2a = (${fmtNum(-b)} ± ${fmtNum(sqrtAbsDelta)}i) / ${fmtNum(2 * a)}</span>`
    );

    const realStr = Math.abs(realPart) < EPSILON ? "" : `${fmtNum(realPart)} `;
    const plusSign = Math.abs(realPart) < EPSILON ? "" : "+ ";
    const minusSign = Math.abs(realPart) < EPSILON ? "-" : "- ";
    const imagStr = Math.abs(imagPart - 1) < EPSILON ? "i" : `${fmtNum(imagPart)}i`;

    roots.push(`x₁ = ${realStr}${plusSign}${imagStr}`, `x₂ = ${realStr}${minusSign}${imagStr}`);
  }

  return { equation: eqStr, conditionKey, steps, roots };
}
