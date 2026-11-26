/* ==========================================================================
   ម៉ូឌុលទិន្នន័យក្រុមការងារ (Team Data & Renderer - js/team.js)
   បង្ហាញប្រធានក្រុម ១ នាក់ និងសមាជិក ៤ នាក់ ជាមួយរូបភាព JPG អាចប្តូរបាន
   ========================================================================== */

const TEAM_MEMBERS = [
  {
    isLeader: true,
    image: "assets/images/leader.jpg",
    nameKm: "សុខ វិសាល (Sok Visal)",
    nameEn: "Sok Visal",
    badgeKm: "👑 ប្រធានក្រុម (Team Leader)",
    badgeEn: "👑 Team Leader",
    roleKm: "អ្នកដឹកនាំគម្រោង និងក្បួនដោះស្រាយគណិតវិទ្យា",
    roleEn: "Project Lead & Mathematical Algorithms",
    respKm: "រៀបចំផែនការគម្រោង ផ្ទៀងផ្ទាត់រូបមន្តសមីការដឺក្រេទី ២ និងទី ៣ (Cardano) និងដឹកនាំការធ្វើបទបង្ហាញ។",
    respEn: "Planned project architecture, verified Quadratic & Cubic (Cardano) formulas, and led the class presentation."
  },
  {
    isLeader: false,
    image: "assets/images/member1.jpg",
    nameKm: "ចាន់ សុភា (Chan Sophea)",
    nameEn: "Chan Sophea",
    badgeKm: "សមាជិកទី ១ (Member 1)",
    badgeEn: "Member 1",
    roleKm: "អ្នករចនាចំណុចប្រទាក់ UI/UX និងរូបភាព",
    roleEn: "UI/UX Designer & Visual Assets",
    respKm: "រចនាពណ៌ Gradient, ផ្ទាំង Light/Dark Mode និងរៀបចំប្លង់ឱ្យស្រស់ស្អាតសម្រាប់ទូរស័ព្ទ និងកុំព្យូទ័រ។",
    respEn: "Designed gradient color palettes, Light/Dark themes, and responsive layouts across mobile and desktop."
  },
  {
    isLeader: false,
    image: "assets/images/member2.jpg",
    nameKm: "លី មករា (Ly Makara)",
    nameEn: "Ly Makara",
    badgeKm: "សមាជិកទី ២ (Member 2)",
    badgeEn: "Member 2",
    roleKm: "អ្នកអភិវឌ្ឍន៍ម៉ូឌុលសមីការដឺក្រេទី ២",
    roleEn: "Quadratic Solver Developer",
    respKm: "សរសេរកូដ JavaScript សម្រាប់គណនា Δ ឫសពិត ឫសឌុប ឫសកុំផ្លិច និងករណីពិសេស a = 0 ។",
    respEn: "Implemented JavaScript logic for Δ, real, repeated, complex conjugate roots, and degenerate a = 0 cases."
  },
  {
    isLeader: false,
    image: "assets/images/member3.jpg",
    nameKm: "កែវ រតនា (Keo Ratana)",
    nameEn: "Keo Ratana",
    badgeKm: "សមាជិកទី ៣ (Member 3)",
    badgeEn: "Member 3",
    roleKm: "អ្នកអភិវឌ្ឍន៍ម៉ូឌុលសមីការដឺក្រេទី ៣",
    roleEn: "Cubic Solver Developer",
    respKm: "សរសេរក្បួនដោះស្រាយសមីការដឺក្រេទី ៣ បង្ហាញជំហានលម្អិត និងប្រព័ន្ធរក្សាទុកប្រវត្តិគណនា។",
    respEn: "Built the Cubic equation engine, step-by-step generator, and local calculation history storage."
  },
  {
    isLeader: false,
    image: "assets/images/member4.jpg",
    nameKm: "ហេង ដារ៉ា (Heng Dara)",
    nameEn: "Heng Dara",
    badgeKm: "សមាជិកទី ៤ (Member 4)",
    badgeEn: "Member 4",
    roleKm: "អ្នកបកប្រែភាសា និងត្រួតពិនិត្យគុណភាព (QA)",
    roleEn: "Bilingual Localization & QA Tester",
    respKm: "បកប្រែខ្លឹមសារខ្មែរ-អង់គ្លេស សរសេរឯកសារ README.md និងសាកល្បងលំហាត់គណិតវិទ្យាគ្រប់លក្ខខណ្ឌ។",
    respEn: "Handled Khmer-English translation, wrote README.md documentation, and tested all mathematical edge cases."
  }
];

// អនុគមន៍បង្ហាញកាតសមាជិកក្រុមទាំង ៥ នាក់លើទំព័រ Team Work
function renderTeamMembers(lang = "km") {
  const teamGrid = document.getElementById("teamGrid");
  if (!teamGrid) return;

  const isKm = lang === "km";
  teamGrid.innerHTML = TEAM_MEMBERS.map((m) => `
    <article class="team-card ${m.isLeader ? "leader-card" : ""}">
      <span class="role-badge ${m.isLeader ? "leader" : "member"}">
        ${isKm ? m.badgeKm : m.badgeEn}
      </span>
      <img src="${m.image}" alt="${isKm ? m.nameKm : m.nameEn}" class="team-avatar" />
      <h4>${isKm ? m.nameKm : m.nameEn}</h4>
      <p class="team-role-title">${isKm ? m.roleKm : m.roleEn}</p>
      <p class="team-resp">${isKm ? m.respKm : m.respEn}</p>
    </article>
  `).join("");
}
