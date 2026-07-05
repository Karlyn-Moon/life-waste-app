const modes = [
  { id: "wander", name: "脑内旅行", hint: "人没动，心已经办完登机", icon: "⌁" },
  { id: "delay", name: "精致拖延", hint: "把正事绕成一盘漂亮蚊香", icon: "◷" },
  { id: "archive", name: "桌面考古", hint: "翻出三年前的截图，研究文明遗迹", icon: "▧" },
  { id: "social", name: "低电量社交", hint: "只点赞，不解释，不承担剧情", icon: "♡" },
  { id: "make", name: "无意义创作", hint: "做一个毫无用处但很完整的东西", icon: "✦" },
  { id: "observe", name: "宇宙旁观", hint: "盯着窗外，把自己调成风景模式", icon: "◎" },
];

const defaultStrategies = [
  {
    mode: "wander",
    title: "楼下便利店远征",
    minutes: 18,
    level: "温和虚度",
    description: "不买必需品，只认真比较三种你平时根本不会喝的饮料包装。",
    ritual: "出门前宣布自己在进行消费人类学调研，回来后给饮料起一个很离谱的名字。",
    tags: ["短途", "可补水", "微冒险"],
  },
  {
    mode: "wander",
    title: "地图无目的漂流",
    minutes: 25,
    level: "中度失踪",
    description: "打开地图，从当前位置一路缩放到陌生城市，随便点开一家店看评论。",
    ritual: "给自己安排一个永远不会成行的周末计划，并挑出一个听起来像电影名的街道。",
    tags: ["云旅游", "不花钱", "假装远方"],
  },
  {
    mode: "delay",
    title: "文件夹改名大典",
    minutes: 12,
    level: "效率幻觉",
    description: "把桌面文件夹改成更有秩序的名字，但不真正整理里面的东西。",
    ritual: "每改完一个名字就点头一次，像刚完成某种企业级迁移。",
    tags: ["办公室适用", "有成就感", "零产出"],
  },
  {
    mode: "delay",
    title: "待办事项再包装",
    minutes: 20,
    level: "高阶拖延",
    description: "把一条待办拆成八条更小的待办，然后郑重其事地完成其中最无关紧要的一条。",
    ritual: "给最小的那条加一个星标，奖励自己暂时不用面对最大的那条。",
    tags: ["伪进展", "心理按摩", "适合周一"],
  },
  {
    mode: "archive",
    title: "截图博物馆巡礼",
    minutes: 16,
    level: "怀旧考古",
    description: "翻相册里的旧截图，寻找那些当年觉得很重要、现在完全看不懂的证据。",
    ritual: "挑一张最荒谬的截图，给它写一句馆藏说明。",
    tags: ["旧时代", "轻微尴尬", "低成本"],
  },
  {
    mode: "archive",
    title: "聊天记录断章取义",
    minutes: 14,
    level: "私人档案",
    description: "搜索一个常见词，随机阅读五年前的自己，感受语言风格的物种演化。",
    ritual: "不要评价过去的你，只给那个人发放一枚精神纪念章。",
    tags: ["慎入", "怀旧", "自我研究"],
  },
  {
    mode: "social",
    title: "朋友圈轻触巡逻",
    minutes: 10,
    level: "社交省电",
    description: "只看前三屏，只给猫、晚霞和明显需要鼓励的人点赞。",
    ritual: "全程不点开长文，不参与争论，不被任何热闹征召。",
    tags: ["低风险", "可撤退", "人情续杯"],
  },
  {
    mode: "social",
    title: "表情包库存盘点",
    minutes: 15,
    level: "情绪物流",
    description: "清点表情包，挑出三张已经过气但仍然忠诚的老成员。",
    ritual: "给其中一张发送给自己，确认它还能承担复杂情绪。",
    tags: ["库存管理", "聊天装备", "可爱废物"],
  },
  {
    mode: "make",
    title: "荒唐命名工程",
    minutes: 22,
    level: "创造性白忙",
    description: "给家里的物件起正式名称，比如把遥控器命名为客厅权杖。",
    ritual: "至少写下五个名字，并把最庄严的那个小声念出来。",
    tags: ["创作", "无需发表", "好笑"],
  },
  {
    mode: "make",
    title: "无用排行榜",
    minutes: 17,
    level: "一本正经",
    description: "制作一个只服务于你的榜单，例如今天最像云的三件衣服。",
    ritual: "第一名必须发表获奖感言，内容由你代写。",
    tags: ["排名", "小题大做", "可收藏"],
  },
  {
    mode: "observe",
    title: "窗外天气鉴定",
    minutes: 11,
    level: "低速冥想",
    description: "看窗外十分钟，判断今天的光线更像请假、迟到还是周末。",
    ritual: "给天空打一个不超过十分的分数，并接受它不会整改。",
    tags: ["安静", "不费眼", "适合午后"],
  },
  {
    mode: "observe",
    title: "水杯气泡观测",
    minutes: 8,
    level: "微型宇宙",
    description: "盯着一杯水或饮料，看气泡、冰块、茶叶或倒影慢慢挪动。",
    ritual: "在心里给它配一段纪录片旁白，语气越庄重越好。",
    tags: ["短时", "办公桌", "慢下来"],
  },
];

const achievements = [
  {
    id: "firstWaste",
    icon: "01",
    title: "开摆执照",
    description: "完成第一次正式浪费记录。",
    check: () => totalAllLogs() >= 1,
  },
  {
    id: "hourToday",
    icon: "60",
    title: "今日缓行者",
    description: "单日浪费累计达到 60 分钟。",
    check: () => totalTodayMinutes() >= 60,
  },
  {
    id: "threeModes",
    icon: "03",
    title: "多线程虚度",
    description: "同一天尝试 3 种不同浪费模式。",
    check: () => new Set(getTodayLogs().map((item) => item.mode)).size >= 3,
  },
  {
    id: "customAuthor",
    icon: "私",
    title: "宝典撰稿人",
    description: "添加 1 条私人浪费秘籍。",
    check: () => state.customStrategies.length >= 1,
  },
  {
    id: "streakThree",
    icon: "连",
    title: "连续摆烂专家",
    description: "连续 3 天留下浪费记录。",
    check: () => (state.streak || 0) >= 3,
  },
  {
    id: "grandTotal",
    icon: "∞",
    title: "时间炼金术",
    description: "累计浪费达到 180 分钟。",
    check: () => totalAllMinutes() >= 180,
  },
];

const moodLabels = {
  tired: "累",
  restless: "坐不住",
  blank: "脑袋空",
  dramatic: "想演一点",
};

const placeLabels = {
  desk: "工位",
  sofa: "沙发",
  outside: "楼下",
  bed: "床边",
};

const timeWindows = {
  tiny: { label: "5-10 分钟", min: 1, max: 10 },
  short: { label: "10-20 分钟", min: 10, max: 20 },
  long: { label: "20-45 分钟", min: 20, max: 45 },
};

const moodModes = {
  tired: ["observe", "social"],
  restless: ["wander", "make"],
  blank: ["archive", "observe"],
  dramatic: ["make", "social"],
};

const placeModes = {
  desk: ["delay", "archive", "observe"],
  sofa: ["observe", "social", "make"],
  outside: ["wander", "observe"],
  bed: ["observe", "archive", "social"],
};

const storageKey = "lifeWasteCodexState";
const todayKey = new Date().toISOString().slice(0, 10);

let strategies = [...defaultStrategies];
let selectedMode = "wander";
let selectedStrategy = strategies[0];
let activeFilter = "all";
let timerSeconds = 15 * 60;
let timerHandle = null;
let toastHandle = null;
let generatedPrescription = null;

const state = loadState();
strategies = [...defaultStrategies, ...state.customStrategies];

const modeGrid = document.querySelector("#modeGrid");
const filterTabs = document.querySelector("#filterTabs");
const cardList = document.querySelector("#cardList");
const logList = document.querySelector("#logList");
const currentTitle = document.querySelector("#currentTitle");
const currentDescription = document.querySelector("#currentDescription");
const currentRitual = document.querySelector("#currentRitual");
const currentTags = document.querySelector("#currentTags");
const todayMinutes = document.querySelector("#todayMinutes");
const streakDays = document.querySelector("#streakDays");
const achievementCount = document.querySelector("#achievementCount");
const timerMinutes = document.querySelector("#timerMinutes");
const durationRange = document.querySelector("#durationRange");
const startTimer = document.querySelector("#startTimer");
const finishNow = document.querySelector("#finishNow");
const drawCard = document.querySelector("#drawCard");
const randomMode = document.querySelector("#randomMode");
const addMinute = document.querySelector("#addMinute");
const resetToday = document.querySelector("#resetToday");
const clearLog = document.querySelector("#clearLog");
const achievementList = document.querySelector("#achievementList");
const generatePrescription = document.querySelector("#generatePrescription");
const applyPrescription = document.querySelector("#applyPrescription");
const moodSelect = document.querySelector("#moodSelect");
const timeSelect = document.querySelector("#timeSelect");
const placeSelect = document.querySelector("#placeSelect");
const prescriptionTitle = document.querySelector("#prescriptionTitle");
const prescriptionCopy = document.querySelector("#prescriptionCopy");
const prescriptionTags = document.querySelector("#prescriptionTags");
const customForm = document.querySelector("#customForm");
const customMode = document.querySelector("#customMode");
const customTitle = document.querySelector("#customTitle");
const customMinutes = document.querySelector("#customMinutes");
const customDescription = document.querySelector("#customDescription");
const customRitual = document.querySelector("#customRitual");
const toast = document.querySelector("#toast");

syncAchievements(true);
renderModes();
renderFilters();
renderCustomModeOptions();
drawForMode(selectedMode);
createPrescription();
renderLibrary();
renderStats();
renderLog();
renderAchievements();
syncTimerFromRange();

drawCard.addEventListener("click", () => {
  drawForMode(selectedMode);
  showToast("新的浪费路线已发放。");
});

randomMode.addEventListener("click", () => {
  const next = modes[Math.floor(Math.random() * modes.length)];
  selectMode(next.id);
  showToast(`已切换到「${next.name}」。`);
});

durationRange.addEventListener("input", syncTimerFromRange);

addMinute.addEventListener("click", () => {
  const next = Math.min(120, Number(durationRange.value) + 1);
  durationRange.value = String(next);
  syncTimerFromRange();
});

startTimer.addEventListener("click", () => {
  if (timerHandle) {
    stopTimer("继续浪费");
    showToast("计时暂停，浪费仍在精神层面持续。");
    return;
  }

  if (timerSeconds <= 0) {
    syncTimerFromRange();
  }

  startTimer.textContent = "暂停";
  timerHandle = window.setInterval(() => {
    timerSeconds -= 1;
    updateTimerFace();

    if (timerSeconds <= 0) {
      const minutes = Number(durationRange.value);
      stopTimer("开始浪费");
      addLog(selectedStrategy, minutes);
      syncTimerFromRange();
      showToast(`圆满虚度 ${minutes} 分钟。`);
    }
  }, 1000);
});

finishNow.addEventListener("click", () => {
  const minutes = Math.max(1, Math.ceil(timerSeconds / 60));
  addLog(selectedStrategy, minutes);
  stopTimer("开始浪费");
  syncTimerFromRange();
  showToast(`已记下 ${minutes} 分钟。`);
});

resetToday.addEventListener("click", () => {
  state.logsByDate[todayKey] = [];
  saveState();
  renderStats();
  renderLog();
  showToast("今日记录已归零。");
});

clearLog.addEventListener("click", () => {
  state.logsByDate[todayKey] = [];
  saveState();
  renderStats();
  renderLog();
  renderAchievements();
  showToast("账本已清空。");
});

generatePrescription.addEventListener("click", () => {
  createPrescription();
  showToast("处方已重新开好。");
});

applyPrescription.addEventListener("click", () => {
  if (!generatedPrescription) {
    createPrescription();
  }

  selectedStrategy = generatedPrescription;
  selectedMode = generatedPrescription.mode;
  renderModes();
  renderCurrent();
  showToast("处方已放到今日签文。");
});

customForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const entry = {
    id: `custom-${Date.now()}`,
    mode: customMode.value,
    title: customTitle.value.trim(),
    minutes: clamp(Number(customMinutes.value), 1, 120),
    level: "私人收藏",
    description: customDescription.value.trim(),
    ritual: customRitual.value.trim(),
    tags: ["自定义", "私人宝典"],
    custom: true,
  };

  if (!entry.title || !entry.description || !entry.ritual) {
    showToast("这条秘籍还没写完整。");
    return;
  }

  state.customStrategies.unshift(entry);
  strategies = [...defaultStrategies, ...state.customStrategies];
  selectedMode = entry.mode;
  selectedStrategy = entry;
  activeFilter = "all";
  saveState();
  renderModes();
  renderFilters();
  renderCurrent();
  renderLibrary();
  syncAchievements();
  renderStats();
  renderAchievements();
  customForm.reset();
  customMinutes.value = "12";
  showToast("已收入私人宝典。");
});

function renderModes() {
  modeGrid.innerHTML = modes
    .map(
      (mode) => `
        <button class="mode-button ${mode.id === selectedMode ? "active" : ""}" type="button" data-mode="${mode.id}">
          <span class="mode-icon">${mode.icon}</span>
          <span class="mode-text">
            <strong>${mode.name}</strong>
            <small>${mode.hint}</small>
          </span>
        </button>
      `,
    )
    .join("");

  modeGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => selectMode(button.dataset.mode));
  });
}

function renderFilters() {
  const filters = [{ id: "all", name: "全部" }, ...modes.map(({ id, name }) => ({ id, name }))];
  filterTabs.innerHTML = filters
    .map((filter) => `<button class="${filter.id === activeFilter ? "active" : ""}" type="button" data-filter="${filter.id}">${filter.name}</button>`)
    .join("");

  filterTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderLibrary();
    });
  });
}

function selectMode(modeId) {
  selectedMode = modeId;
  renderModes();
  drawForMode(modeId);
}

function drawForMode(modeId) {
  const pool = strategies.filter((item) => item.mode === modeId);
  selectedStrategy = pool[Math.floor(Math.random() * pool.length)];
  renderCurrent();
}

function renderCurrent() {
  currentTitle.textContent = selectedStrategy.title;
  currentDescription.textContent = selectedStrategy.description;
  currentRitual.textContent = selectedStrategy.ritual;
  currentTags.innerHTML = [
    ...selectedStrategy.tags,
    `${selectedStrategy.minutes} 分钟`,
    selectedStrategy.level,
  ]
    .map((tag) => `<span>${tag}</span>`)
    .join("");
  durationRange.value = String(selectedStrategy.minutes);
  syncTimerFromRange();
}

function renderLibrary() {
  const visible = activeFilter === "all" ? strategies : strategies.filter((item) => item.mode === activeFilter);
  cardList.innerHTML = visible
    .map((item) => {
      const mode = modes.find((entry) => entry.id === item.mode);
      return `
        <article class="waste-card" data-key="${strategyKey(item)}">
          <div class="card-meta">
            <span>${mode.icon}</span>
            <small>${mode.name} · ${item.minutes} 分钟${item.custom ? " · 私人" : ""}</small>
          </div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `;
    })
    .join("");

  cardList.querySelectorAll(".waste-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedStrategy = strategies.find((item) => strategyKey(item) === card.dataset.key);
      selectedMode = selectedStrategy.mode;
      renderModes();
      renderCurrent();
      showToast(`已选中「${selectedStrategy.title}」。`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function syncTimerFromRange() {
  timerSeconds = Number(durationRange.value) * 60;
  updateTimerFace();
}

function updateTimerFace() {
  const minutes = Math.floor(Math.max(0, timerSeconds) / 60);
  const seconds = Math.max(0, timerSeconds) % 60;
  timerMinutes.textContent = timerHandle ? `${minutes}:${String(seconds).padStart(2, "0")}` : String(minutes);
}

function stopTimer(label) {
  if (timerHandle) {
    window.clearInterval(timerHandle);
    timerHandle = null;
  }
  startTimer.textContent = label;
}

function addLog(strategy, minutes) {
  const previousTotal = getTodayLogs().length;

  if (!state.logsByDate[todayKey]) {
    state.logsByDate[todayKey] = [];
  }

  state.logsByDate[todayKey].unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: strategy.title,
    mode: strategy.mode,
    minutes,
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
  });

  if (previousTotal === 0) {
    updateStreak();
  }

  saveState();
  syncAchievements();
  renderStats();
  renderLog();
  renderAchievements();
}

function renderStats() {
  todayMinutes.textContent = String(totalTodayMinutes());
  streakDays.textContent = String(state.streak || 0);
  achievementCount.textContent = `${state.achievements.length}/${achievements.length}`;
}

function renderLog() {
  const logs = getTodayLogs();

  if (logs.length === 0) {
    logList.innerHTML = `<div class="log-empty">今天还没有正式浪费。可以从上面开始。</div>`;
    return;
  }

  logList.innerHTML = logs
    .map((item) => {
      const mode = modes.find((entry) => entry.id === item.mode);
      return `
        <div class="log-item">
          <div class="log-time">${item.time}</div>
          <div class="log-main">
            <strong>${item.title}</strong>
            <small>${mode.name}</small>
          </div>
          <span class="log-chip">${item.minutes} 分钟</span>
        </div>
      `;
    })
    .join("");
}

function getTodayLogs() {
  return state.logsByDate[todayKey] || [];
}

function totalTodayMinutes() {
  return getTodayLogs().reduce((sum, item) => sum + item.minutes, 0);
}

function totalAllLogs() {
  return Object.values(state.logsByDate).reduce((sum, logs) => sum + logs.length, 0);
}

function totalAllMinutes() {
  return Object.values(state.logsByDate).reduce(
    (sum, logs) => sum + logs.reduce((logSum, item) => logSum + item.minutes, 0),
    0,
  );
}

function updateStreak() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  if (state.lastWasteDate === todayKey) {
    return;
  }

  state.streak = state.lastWasteDate === yesterdayKey ? (state.streak || 0) + 1 : 1;
  state.lastWasteDate = todayKey;
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return {
      logsByDate: parsed.logsByDate || {},
      streak: Number(parsed.streak || 0),
      lastWasteDate: parsed.lastWasteDate || "",
      customStrategies: Array.isArray(parsed.customStrategies) ? parsed.customStrategies : [],
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
    };
  } catch {
    return { logsByDate: {}, streak: 0, lastWasteDate: "", customStrategies: [], achievements: [] };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastHandle);
  toastHandle = window.setTimeout(() => toast.classList.remove("show"), 2100);
}

function renderCustomModeOptions() {
  customMode.innerHTML = modes.map((mode) => `<option value="${mode.id}">${mode.name}</option>`).join("");
}

function createPrescription() {
  const mood = moodSelect.value;
  const place = placeSelect.value;
  const window = timeWindows[timeSelect.value];
  const moodPool = moodModes[mood];
  const placePool = placeModes[place];
  const inTime = (item) => item.minutes >= window.min && item.minutes <= window.max;

  let pool = strategies.filter((item) => moodPool.includes(item.mode) && placePool.includes(item.mode) && inTime(item));

  if (pool.length === 0) {
    pool = strategies.filter((item) => (moodPool.includes(item.mode) || placePool.includes(item.mode)) && inTime(item));
  }

  if (pool.length === 0) {
    pool = strategies.filter((item) => moodPool.includes(item.mode) || placePool.includes(item.mode));
  }

  const base = pool[Math.floor(Math.random() * pool.length)] || strategies[0];
  generatedPrescription = {
    ...base,
    id: `prescription-${Date.now()}`,
    title: `处方：${base.title}`,
    description: `你现在${moodLabels[mood]}，人在${placeLabels[place]}，适合执行「${base.description}」`,
    ritual: `${base.ritual} 结束后只需要点一次「记一笔」，不要追加自责环节。`,
    tags: ["今日处方", moodLabels[mood], placeLabels[place], window.label],
  };

  renderPrescription();
}

function renderPrescription() {
  prescriptionTitle.textContent = generatedPrescription.title;
  prescriptionCopy.textContent = generatedPrescription.description;
  prescriptionTags.innerHTML = generatedPrescription.tags.map((tag) => `<span>${tag}</span>`).join("");
}

function renderAchievements() {
  achievementList.innerHTML = achievements
    .map((achievement) => {
      const unlocked = state.achievements.includes(achievement.id);
      return `
        <article class="achievement ${unlocked ? "unlocked" : ""}">
          <span>${achievement.icon}</span>
          <div>
            <strong>${achievement.title}</strong>
            <small>${achievement.description}</small>
          </div>
        </article>
      `;
    })
    .join("");
}

function syncAchievements(silent = false) {
  const newlyUnlocked = achievements.filter(
    (achievement) => !state.achievements.includes(achievement.id) && achievement.check(),
  );

  if (newlyUnlocked.length === 0) {
    return;
  }

  state.achievements = [...state.achievements, ...newlyUnlocked.map((achievement) => achievement.id)];
  saveState();

  if (!silent) {
    showToast(`解锁成就：${newlyUnlocked[0].title}`);
  }
}

function strategyKey(strategy) {
  return strategy.id || strategy.title;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value || min));
}
