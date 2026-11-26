/* ==========================================================================
   ឯកសារបញ្ជាមេរបស់កម្មវិធី (Main Controller - js/script.js)
   ភ្ជាប់ការប្តូរទំព័រ ម៉ឺនុយទូរស័ព្ទ ការប្តូរភាសា ផ្ទាំងងងឹត/ភ្លឺ និងប្រវត្តិគណនា
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ទាញយកធាតុ DOM សំខាន់ៗ (DOM Elements)
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const navItems = document.querySelectorAll(".nav-item");
  const pageSections = document.querySelectorAll(".page-section");
  const currentPageTitle = document.getElementById("currentPageTitle");
  const langToggleBtn = document.getElementById("langToggleBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  // រក្សាទុកលទ្ធផលចុងក្រោយដើម្បីបកប្រែភ្លាមៗពេលប្តូរភាសា
  let lastQuadResult = null;
  let lastCubicResult = null;
  let calcHistory = JSON.parse(localStorage.getItem("eqSolverHistory") || "[]");

  // ==================== ១. ប្រព័ន្ធប្តូរទំព័រ និងម៉ឺនុយ (NAVIGATION SYSTEM) ====================
  function navigateToPage(pageId) {
    // ដក active ចេញពីម៉ឺនុយ និងទំព័រទាំងអស់
    navItems.forEach((btn) => btn.classList.remove("active"));
    pageSections.forEach((sec) => sec.classList.remove("active"));

    // បើក active លើម៉ឺនុយ និងទំព័រដែលបានជ្រើសរើស
    const targetNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    const targetPage = document.getElementById(`page-${pageId}`);

    if (targetNav) {
      targetNav.classList.add("active");
      const labelEl = targetNav.querySelector(".nav-label");
      if (labelEl && currentPageTitle) {
        currentPageTitle.textContent = labelEl.textContent;
      }
    }
    if (targetPage) {
      targetPage.classList.add("active");
    }

    // បិទម៉ឺនុយលើទូរស័ព្ទដោយស្វ័យប្រវត្តិក្រោយពេលចុចជ្រើសរើស
    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ភ្ជាប់ព្រឹត្តិការណ៍ចុចលើប៊ូតុងម៉ឺនុយចំហៀងទាំង ៧
  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-page");
      navigateToPage(page);
    });
  });

  // ភ្ជាប់ប៊ូតុងផ្លូវកាត់លើទំព័រដើម (Hero & Feature Cards Shortcuts)
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", () => {
      const page = el.getAttribute("data-goto");
      navigateToPage(page);
    });
  });

  // ==================== ២. ម៉ឺនុយហាំប៊ឺហ្គឺលើទូរស័ព្ទ (MOBILE MENU) ====================
  function openMobileSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
  }

  function closeMobileSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
  }

  menuToggleBtn.addEventListener("click", openMobileSidebar);
  closeSidebarBtn.addEventListener("click", closeMobileSidebar);
  sidebarOverlay.addEventListener("click", closeMobileSidebar);

  // ==================== ៣. ការប្តូរផ្ទាំងភ្លឺ និងងងឹត (LIGHT / DARK MODE) ====================
  const savedTheme = localStorage.getItem("eqSolverTheme") || "light";
  setTheme(savedTheme);

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("eqSolverTheme", theme);
    const themeIcon = document.getElementById("themeIcon");
    const themeLabel = document.getElementById("themeLabel");
    if (themeIcon && themeLabel) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
      themeLabel.textContent = theme === "dark" ? t("lightMode") : t("darkMode");
    }
  }

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // ==================== ៤. ការប្តូរភាសាខ្មែរ / អង់គ្លេស (LANGUAGE SWITCH) ====================
  langToggleBtn.addEventListener("click", () => {
    const nextLang = currentLang === "km" ? "en" : "km";
    applyLanguage(nextLang);
    renderTeamMembers(nextLang);
    renderHistory();

    // គណនាឡើងវិញដោយស្វ័យប្រវត្តិប្រសិនបើមានលទ្ធផលកំពុងបង្ហាញ
    if (lastQuadResult) handleSolveQuadratic(false);
    if (lastCubicResult) handleSolveCubic(false);
  });

  // ==================== ៥. អនុគមន៍បង្ហាញប្រអប់លទ្ធផល (RESULT RENDERER) ====================
  function renderSolverResult(containerId, resultObj) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const rootsHtml = resultObj.roots
      .map((r) => `<div class="root-item math-font">${r}</div>`)
      .join("");

    const stepsHtml = resultObj.steps
      .map(
        (stepText, index) => `
        <div class="step-item">
          <span class="step-num">${index + 1}</span>
          <div>${stepText}</div>
        </div>`
      )
      .join("");

    container.innerHTML = `
      <div class="result-banner">
        <span class="result-condition-tag">${t(resultObj.conditionKey)}</span>
        <h4 class="steps-title">${t("finalAnswerHeading")}</h4>
        <div class="final-roots-box">${rootsHtml}</div>
      </div>
      <h4 class="steps-title">${t("stepsHeading")}</h4>
      <div class="step-list">${stepsHtml}</div>
    `;
  }

  // ==================== ៦. ការគ្រប់គ្រងសមីការដឺក្រេទី ២ (QUADRATIC CONTROLS) ====================
  const quadAInput = document.getElementById("quadA");
  const quadBInput = document.getElementById("quadB");
  const quadCInput = document.getElementById("quadC");
  const quadLivePreview = document.getElementById("quadLivePreview");

  function updateQuadPreview() {
    const a = parseFloat(quadAInput.value) || 0;
    const b = parseFloat(quadBInput.value) || 0;
    const c = parseFloat(quadCInput.value) || 0;
    quadLivePreview.textContent = formatQuadraticEquation(a, b, c);
  }

  [quadAInput, quadBInput, quadCInput].forEach((inp) => {
    inp.addEventListener("input", updateQuadPreview);
  });
  updateQuadPreview();

  function handleSolveQuadratic(saveToHistory = true) {
    const a = parseFloat(quadAInput.value);
    const b = parseFloat(quadBInput.value);
    const c = parseFloat(quadCInput.value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      alert(t("invalidInputError"));
      return;
    }

    const res = solveQuadraticEquation(a, b, c, currentLang);
    lastQuadResult = { a, b, c };
    renderSolverResult("quadResultContainer", res);

    if (saveToHistory) {
      addHistoryItem("Quadratic (x²)", res.equation, res.roots.join(" | "));
    }
  }

  document.getElementById("solveQuadBtn").addEventListener("click", () => handleSolveQuadratic(true));

  document.getElementById("clearQuadBtn").addEventListener("click", () => {
    quadAInput.value = "";
    quadBInput.value = "";
    quadCInput.value = "";
    lastQuadResult = null;
    updateQuadPreview();
    document.getElementById("quadResultContainer").innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🧮</div>
        <p>${t("emptyResultHint")}</p>
      </div>
    `;
  });

  // ប៊ូតុងឧទាហរណ៍សមីការដឺក្រេទី ២
  document.querySelectorAll(".quad-example").forEach((btn) => {
    btn.addEventListener("click", () => {
      quadAInput.value = btn.getAttribute("data-a");
      quadBInput.value = btn.getAttribute("data-b");
      quadCInput.value = btn.getAttribute("data-c");
      updateQuadPreview();
      handleSolveQuadratic(true);
    });
  });

  // ==================== ៧. ការគ្រប់គ្រងសមីការដឺក្រេទី ៣ (CUBIC CONTROLS) ====================
  const cubicAInput = document.getElementById("cubicA");
  const cubicBInput = document.getElementById("cubicB");
  const cubicCInput = document.getElementById("cubicC");
  const cubicDInput = document.getElementById("cubicD");
  const cubicLivePreview = document.getElementById("cubicLivePreview");

  function updateCubicPreview() {
    const a = parseFloat(cubicAInput.value) || 0;
    const b = parseFloat(cubicBInput.value) || 0;
    const c = parseFloat(cubicCInput.value) || 0;
    const d = parseFloat(cubicDInput.value) || 0;
    cubicLivePreview.textContent = formatCubicEquation(a, b, c, d);
  }

  [cubicAInput, cubicBInput, cubicCInput, cubicDInput].forEach((inp) => {
    inp.addEventListener("input", updateCubicPreview);
  });
  updateCubicPreview();

  function handleSolveCubic(saveToHistory = true) {
    const a = parseFloat(cubicAInput.value);
    const b = parseFloat(cubicBInput.value);
    const c = parseFloat(cubicCInput.value);
    const d = parseFloat(cubicDInput.value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
      alert(t("invalidInputError"));
      return;
    }

    const res = solveCubicEquation(a, b, c, d, currentLang);
    lastCubicResult = { a, b, c, d };
    renderSolverResult("cubicResultContainer", res);

    if (saveToHistory) {
      addHistoryItem("Cubic (x³)", res.equation, res.roots.join(" | "));
    }
  }

  document.getElementById("solveCubicBtn").addEventListener("click", () => handleSolveCubic(true));

  document.getElementById("clearCubicBtn").addEventListener("click", () => {
    cubicAInput.value = "";
    cubicBInput.value = "";
    cubicCInput.value = "";
    cubicDInput.value = "";
    lastCubicResult = null;
    updateCubicPreview();
    document.getElementById("cubicResultContainer").innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📐</div>
        <p>${t("emptyResultHint")}</p>
      </div>
    `;
  });

  // ប៊ូតុងឧទាហរណ៍សមីការដឺក្រេទី ៣
  document.querySelectorAll(".cubic-example").forEach((btn) => {
    btn.addEventListener("click", () => {
      cubicAInput.value = btn.getAttribute("data-a");
      cubicBInput.value = btn.getAttribute("data-b");
      cubicCInput.value = btn.getAttribute("data-c");
      cubicDInput.value = btn.getAttribute("data-d");
      updateCubicPreview();
      handleSolveCubic(true);
    });
  });

  // ==================== ៨. ប្រព័ន្ធប្រវត្តិគណនា (HISTORY MANAGEMENT) ====================
  function addHistoryItem(type, equation, answer) {
    const entry = {
      type,
      equation,
      answer,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    calcHistory.unshift(entry);
    if (calcHistory.length > 30) calcHistory.pop();
    localStorage.setItem("eqSolverHistory", JSON.stringify(calcHistory));
    renderHistory();
  }

  function renderHistory() {
    const historyList = document.getElementById("historyList");
    const historyBadge = document.getElementById("historyBadge");
    if (historyBadge) historyBadge.textContent = calcHistory.length;
    if (!historyList) return;

    if (calcHistory.length === 0) {
      historyList.innerHTML = `<div class="empty-state"><p>${t("noHistoryMsg")}</p></div>`;
      return;
    }

    historyList.innerHTML = calcHistory
      .map(
        (item) => `
        <div class="history-item">
          <div>
            <div class="history-meta">${item.type} • ${item.time}</div>
            <div class="history-eq math-font">${item.equation}</div>
          </div>
          <div class="history-ans math-font">${item.answer}</div>
        </div>`
      )
      .join("");
  }

  document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    calcHistory = [];
    localStorage.removeItem("eqSolverHistory");
    renderHistory();
  });

  // ចាប់ផ្តើមដំណើរការភាសា ក្រុមការងារ និងប្រវត្តិគណនាពេលបើកកម្មវិធីដំបូង
  applyLanguage(currentLang);
  renderTeamMembers(currentLang);
  renderHistory();
});
