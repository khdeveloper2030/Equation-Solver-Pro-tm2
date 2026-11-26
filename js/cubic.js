/* ==========================================================================
   ម៉ូឌុលដោះស្រាយសមីការដឺក្រេទី ៣ (Cubic Equation Solver - js/cubic.js)
   ប្រើវិធីសាស្ត្រ Cardano និង Trigonometric ព្រមទាំងកាត់បន្ថយទៅជាដឺក្រេទី ២ ពេល a = 0
   ========================================================================== */

// អនុគមន៍បង្កើតទម្រង់សមីការដឺក្រេទី ៣ ឱ្យស្អាត (Format ax³ + bx² + cx + d = 0)
function formatCubicEquation(a, b, c, d) {
  const parts = [];
  if (Math.abs(a) >= EPSILON) {
    parts.push(`${a === 1 ? "" : a === -1 ? "-" : fmtNum(a)}x³`);
  }
  if (Math.abs(b) >= EPSILON) {
    const sign = b > 0 && parts.length > 0 ? " + " : b < 0 ? (parts.length > 0 ? " - " : "-") : "";
    const absB = Math.abs(b);
    parts.push(`${sign}${absB === 1 ? "" : fmtNum(absB)}x²`);
  }
  if (Math.abs(c) >= EPSILON) {
    const sign = c > 0 && parts.length > 0 ? " + " : c < 0 ? (parts.length > 0 ? " - " : "-") : "";
    const absC = Math.abs(c);
    parts.push(`${sign}${absC === 1 ? "" : fmtNum(absC)}x`);
  }
  if (Math.abs(d) >= EPSILON || parts.length === 0) {
    const sign = d > 0 && parts.length > 0 ? " + " : d < 0 ? (parts.length > 0 ? " - " : "-") : "";
    parts.push(`${sign}${fmtNum(Math.abs(d))}`);
  }
  return `${parts.join("")} = 0`;
}

// អនុគមន៍មេសម្រាប់ដោះស្រាយសមីការ ax³ + bx² + cx + d = 0
function solveCubicEquation(a, b, c, d, lang = "km") {
  const isKm = lang === "km";
  const eqStr = formatCubicEquation(a, b, c, d);
  const steps = [];

  // ករណីពិសេស៖ a = 0 -> ក្លាយជាសមីការដឺក្រេទី ២ bx² + cx + d = 0
  if (Math.abs(a) < EPSILON) {
    const quadRes = solveQuadraticEquation(b, c, d, lang);
    const introStep = isKm
      ? `សមីការដើម៖ <strong class="math-font">${eqStr}</strong> — ដោយសារ <strong>a = 0</strong> សមីការក្លាយជាសមីការដឺក្រេទី ២។`
      : `Given equation: <strong class="math-font">${eqStr}</strong> — Since <strong>a = 0</strong>, this reduces to a quadratic equation.`;
    return {
      equation: eqStr,
      conditionKey: quadRes.conditionKey,
      steps: [introStep, ...quadRes.steps],
      roots: quadRes.roots
    };
  }

  // ជំហានទី ១៖ បង្ហាញមេគុណសមីការដឺក្រេទី ៣
  steps.push(
    isKm
      ? `សមីការដឺក្រេទី ៣៖ <strong class="math-font">${eqStr}</strong> (a = ${fmtNum(a)}, b = ${fmtNum(b)}, c = ${fmtNum(c)}, d = ${fmtNum(d)})`
      : `Cubic equation: <strong class="math-font">${eqStr}</strong> (a = ${fmtNum(a)}, b = ${fmtNum(b)}, c = ${fmtNum(c)}, d = ${fmtNum(d)})`
  );

  // ជំហានទី ២៖ បម្លែងទៅជាទម្រង់សង្ខេប t³ + pt + q = 0 ដោយតាង x = t - b/(3a)
  const shift = -b / (3 * a);
  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);

  steps.push(
    isKm
      ? `តាង <span class="math-font">x = t - b/(3a) = t + (${fmtNum(shift)})</span> ដើម្បីបំបាត់តួ x² យើងបានទម្រង់សង្ខេប <span class="math-font">t³ + pt + q = 0</span>៖`
      : `Substitute <span class="math-font">x = t - b/(3a) = t + (${fmtNum(shift)})</span> to obtain the depressed cubic <span class="math-font">t³ + pt + q = 0</span>:`
  );
  steps.push(
    `<span class="math-font">p = <strong>${fmtNum(p)}</strong> , &nbsp; q = <strong>${fmtNum(q)}</strong></span>`
  );

  // ជំហានទី ៣៖ គណនាឌីស្គ្រីមីណង់ Δ₀ = (q/2)² + (p/3)³
  const halfQ = q / 2;
  const thirdP = p / 3;
  const delta0 = halfQ * halfQ + thirdP * thirdP * thirdP;

  steps.push(
    isKm
      ? `គណនាឌីស្គ្រីមីណង់ដឺក្រេទី ៣៖ <span class="math-font">Δ₀ = (q/2)² + (p/3)³ = <strong>${fmtNum(delta0)}</strong></span>`
      : `Compute cubic discriminant: <span class="math-font">Δ₀ = (q/2)² + (p/3)³ = <strong>${fmtNum(delta0)}</strong></span>`
  );

  let conditionKey = "";
  const roots = [];

  if (delta0 > EPSILON) {
    // ករណី Δ₀ > 0 : មានឫសពិត ១ និងឫសកុំផ្លិចឆ្លាស់ ២
    conditionKey = "condCubic1Real2Comp";
    const sqrtD = Math.sqrt(delta0);
    const u = Math.cbrt(-halfQ + sqrtD);
    const v = Math.cbrt(-halfQ - sqrtD);

    const t1 = u + v;
    const x1 = t1 + shift;

    const realPart = -(u + v) / 2 + shift;
    const imagPart = Math.abs(((u - v) * Math.sqrt(3)) / 2);

    steps.push(
      isKm
        ? `ដោយសារ <strong>Δ₀ > 0</strong> ប្រើរូបមន្ត Cardano ៖ <span class="math-font">u = ∛(-q/2 + √Δ₀) = ${fmtNum(u)}</span>, <span class="math-font">v = ∛(-q/2 - √Δ₀) = ${fmtNum(v)}</span>`
        : `Since <strong>Δ₀ > 0</strong>, apply Cardano's formula: <span class="math-font">u = ∛(-q/2 + √Δ₀) = ${fmtNum(u)}</span>, <span class="math-font">v = ∛(-q/2 - √Δ₀) = ${fmtNum(v)}</span>`
    );
    steps.push(
      isKm
        ? `ឫសពិតទី ១៖ <span class="math-font">x₁ = u + v - b/(3a) = <strong>${fmtNum(x1)}</strong></span> និងឫសកុំផ្លិចឆ្លាស់ ២៖`
        : `Real root: <span class="math-font">x₁ = u + v - b/(3a) = <strong>${fmtNum(x1)}</strong></span> and two complex conjugate roots:`
    );

    const realStr = Math.abs(realPart) < EPSILON ? "" : `${fmtNum(realPart)} `;
    const plusSign = Math.abs(realPart) < EPSILON ? "" : "+ ";
    const minusSign = Math.abs(realPart) < EPSILON ? "-" : "- ";
    const imagStr = Math.abs(imagPart - 1) < EPSILON ? "i" : `${fmtNum(imagPart)}i`;

    roots.push(
      `x₁ = ${fmtNum(x1)}`,
      `x₂ = ${realStr}${plusSign}${imagStr}`,
      `x₃ = ${realStr}${minusSign}${imagStr}`
    );
  } else if (Math.abs(delta0) <= EPSILON) {
    // ករណី Δ₀ = 0 : ឫសពិតទាំងអស់ (ឫសត្រីគុណ ឬឫសឌុប)
    if (Math.abs(p) < EPSILON && Math.abs(q) < EPSILON) {
      conditionKey = "condCubicTriple";
      const x = shift;
      steps.push(
        isKm
          ? `ដោយសារ <strong>Δ₀ = 0</strong> និង <strong>p = q = 0</strong> សមីការមានឫសពិត ៣ ដូចគ្នា (ឫសត្រីគុណ)៖ <span class="math-font">x₁ = x₂ = x₃ = -b/(3a) = <strong>${fmtNum(x)}</strong></span>`
          : `Since <strong>Δ₀ = 0</strong> and <strong>p = q = 0</strong>, there is one triple real root: <span class="math-font">x₁ = x₂ = x₃ = -b/(3a) = <strong>${fmtNum(x)}</strong></span>`
      );
      roots.push(`x₁ = x₂ = x₃ = ${fmtNum(x)}`);
    } else {
      conditionKey = "condCubicDoubleReal";
      const x1 = (3 * q) / p + shift;
      const x2 = (-3 * q) / (2 * p) + shift;
      steps.push(
        isKm
          ? `ដោយសារ <strong>Δ₀ = 0</strong> សមីការមានឫសពិត ៣ ដែលក្នុងនោះមានឫសឌុប ១៖ <span class="math-font">x₁ = 3q/p - b/(3a) = <strong>${fmtNum(x1)}</strong></span> និង <span class="math-font">x₂ = x₃ = -3q/(2p) - b/(3a) = <strong>${fmtNum(x2)}</strong></span>`
          : `Since <strong>Δ₀ = 0</strong>, there are three real roots including a double root: <span class="math-font">x₁ = <strong>${fmtNum(x1)}</strong></span> and <span class="math-font">x₂ = x₃ = <strong>${fmtNum(x2)}</strong></span>`
      );
      roots.push(`x₁ = ${fmtNum(x1)}`, `x₂ = x₃ = ${fmtNum(x2)}`);
    }
  } else {
    // ករណី Δ₀ < 0 : ឫសពិត ៣ ផ្សេងគ្នា (Casus Irreducibilis -> Trigonometric Method)
    conditionKey = "condCubic3Real";
    const r = 2 * Math.sqrt(-thirdP);
    const cosArg = Math.max(-1, Math.min(1, -halfQ / Math.sqrt(-thirdP * thirdP * thirdP)));
    const theta = Math.acos(cosArg);

    const x1 = r * Math.cos(theta / 3) + shift;
    const x2 = r * Math.cos((theta + 2 * Math.PI) / 3) + shift;
    const x3 = r * Math.cos((theta + 4 * Math.PI) / 3) + shift;

    // តម្រៀបឫសពិតពីតូចទៅធំ ឬធំទៅតូចឱ្យងាយមើល
    const sorted = [x1, x2, x3].sort((m, n) => m - n);

    steps.push(
      isKm
        ? `ដោយសារ <strong>Δ₀ < 0</strong> សមីការមានឫសពិត ៣ ផ្សេងគ្នា។ ប្រើរូបមន្តត្រីកោណមាត្រ <span class="math-font">xₖ = 2√(-p/3)·cos((θ + 2kπ)/3) - b/(3a)</span>៖`
        : `Since <strong>Δ₀ < 0</strong>, there are three distinct real roots. Using the trigonometric formula <span class="math-font">xₖ = 2√(-p/3)·cos((θ + 2kπ)/3) - b/(3a)</span>:`
    );
    steps.push(
      `<span class="math-font">x₁ = <strong>${fmtNum(sorted[0])}</strong> , &nbsp; x₂ = <strong>${fmtNum(sorted[1])}</strong> , &nbsp; x₃ = <strong>${fmtNum(sorted[2])}</strong></span>`
    );

    roots.push(
      `x₁ = ${fmtNum(sorted[0])}`,
      `x₂ = ${fmtNum(sorted[1])}`,
      `x₃ = ${fmtNum(sorted[2])}`
    );
  }

  return { equation: eqStr, conditionKey, steps, roots };
}
