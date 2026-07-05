/* =========================================================
   PRODUCTIVITY DASHBOARD — SCRIPT
   Sections: Theme | Date&Time | Weather | Navigation |
             Todo | Planner | Goals | Pomodoro | Motivation
   ========================================================= */

/* ================= THEME SWITCH ================= */
(function themeModule(){
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  // apply saved theme immediately (avoids flash of wrong theme)
  const saved = localStorage.getItem('pd_theme') || 'light';
  root.setAttribute('data-theme', saved);
  icon.innerHTML = saved === 'dark' ? '&#9788;' : '&#9789;';

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('pd_theme', next);
    icon.innerHTML = next === 'dark' ? '&#9788;' : '&#9789;';
  });
})();

/* ================= DATE & TIME ================= */
(function dateTimeModule(){
  const dateEl = document.getElementById('dateText');
  const timeEl = document.getElementById('timeText');
  let intervalId = null;

  function render(){
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
    timeEl.textContent = now.toLocaleTimeString(undefined, { hour12: true });
  }

  render(); // show immediately, don't wait a full second

  if(intervalId) clearInterval(intervalId); // guard against double-init
  intervalId = setInterval(render, 1000);
})();

/* ================= WEATHER WIDGET ================= */
(function weatherModule(){
  const iconEl = document.getElementById('weatherIcon');
  const textEl = document.getElementById('weatherText');

  // WMO weather codes -> readable text + icon
  const codeMap = {
    0: ['Clear sky', '\u2600\uFE0F'], 1: ['Mostly clear', '\u{1F324}\uFE0F'],
    2: ['Partly cloudy', '\u26C5'], 3: ['Overcast', '\u2601\uFE0F'],
    45: ['Fog', '\u{1F32B}\uFE0F'], 48: ['Fog', '\u{1F32B}\uFE0F'],
    51: ['Light drizzle', '\u{1F326}\uFE0F'], 61: ['Light rain', '\u{1F327}\uFE0F'],
    63: ['Rain', '\u{1F327}\uFE0F'], 65: ['Heavy rain', '\u{1F327}\uFE0F'],
    71: ['Light snow', '\u{1F328}\uFE0F'], 73: ['Snow', '\u{1F328}\uFE0F'],
    75: ['Heavy snow', '\u2744\uFE0F'], 80: ['Rain showers', '\u{1F326}\uFE0F'],
    95: ['Thunderstorm', '\u26C8\uFE0F']
  };

  async function fetchWeather(lat, lon){
    try{
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
      const res = await fetch(url);
      if(!res.ok) throw new Error('Weather request failed');
      const data = await res.json();
      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;
      const [label, icon] = codeMap[code] || ['Unknown', '\u{1F324}\uFE0F'];
      iconEl.textContent = icon;
      textEl.textContent = `${temp}\u00B0C \u00B7 ${label}`;
    }catch(err){
      textEl.textContent = 'Weather unavailable';
    }
  }

  function useFallbackCity(){
    // Default fallback: Lucknow, India
    fetchWeather(26.8467, 80.9462);
  }

  if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => useFallbackCity(),
      { timeout: 6000 }
    );
  }else{
    useFallbackCity();
  }
})();

/* ================= NAVIGATION ================= */
(function navigationModule(){
  const dashboardView = document.getElementById('dashboardView');
  const featureCards = document.querySelectorAll('.feature-card');
  const featureViews = document.querySelectorAll('.feature-view');
  let activeFeature = null;
  let switching = false; // guards against double-click race

  function openFeature(name){
    if(switching || activeFeature === name) return;
    switching = true;

    dashboardView.style.display = 'none';
    featureViews.forEach(view => view.classList.remove('active'));

    const target = document.getElementById(`view-${name}`);
    if(target) target.classList.add('active');

    activeFeature = name;
    switching = false;

    // let each feature refresh itself when opened
    document.dispatchEvent(new CustomEvent('feature:open', { detail: { name } }));
  }

  function goBack(){
    featureViews.forEach(view => view.classList.remove('active'));
    dashboardView.style.display = '';
    activeFeature = null;
  }

  featureCards.forEach(card => {
    card.addEventListener('click', () => openFeature(card.dataset.feature));
  });

  // one delegated listener handles every back button
  document.addEventListener('click', (e) => {
    if(e.target.closest('[data-action="back"]')) goBack();
  });
})();

/* ================= TODO LIST ================= */
(function todoModule(){
  const STORAGE_KEY = 'pd_todos';
  const form = document.getElementById('todoForm');
  const input = document.getElementById('todoInput');
  const listEl = document.getElementById('todoList');
  const emptyEl = document.getElementById('todoEmpty');
  const searchInput = document.getElementById('todoSearch');
  const filterGroup = document.getElementById('todoFilters');

  let todos = loadTodos();
  let activeFilter = 'all';
  let searchTerm = '';

  function loadTodos(){
    try{
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }catch(e){ return []; }
  }

  function saveTodos(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function render(){
    const fragment = document.createDocumentFragment();

    const visible = todos.filter(t => {
      if(activeFilter === 'active' && t.completed) return false;
      if(activeFilter === 'completed' && !t.completed) return false;
      if(activeFilter === 'important' && !t.important) return false;
      if(searchTerm && !t.text.toLowerCase().includes(searchTerm)) return false;
      return true;
    });

    visible.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'item-row' + (todo.completed ? ' completed' : '');
      li.dataset.id = todo.id;

      li.innerHTML = `
        <button class="item-check" data-action="toggle" aria-label="Toggle complete">&#10003;</button>
        <span class="item-text">${escapeHtml(todo.text)}${todo.important ? '<span class="item-badge">Important</span>' : ''}</span>
        <span class="item-actions">
          <button class="icon-btn star${todo.important ? ' active' : ''}" data-action="star" aria-label="Mark important">&#9733;</button>
          <button class="icon-btn danger" data-action="delete" aria-label="Delete task">&#10005;</button>
        </span>`;
      fragment.appendChild(li);
    });

    listEl.innerHTML = '';
    listEl.appendChild(fragment);
    emptyEl.classList.toggle('visible', todos.length === 0);
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if(!text) return;
    todos.unshift({ id: Date.now(), text, completed: false, important: false });
    saveTodos();
    render();
    input.value = '';
  });

  // event delegation: one listener for toggle / star / delete
  listEl.addEventListener('click', (e) => {
    const row = e.target.closest('.item-row');
    if(!row) return;
    const id = Number(row.dataset.id);
    const action = e.target.closest('button')?.dataset.action;
    const todo = todos.find(t => t.id === id);
    if(!todo) return;

    if(action === 'toggle') todo.completed = !todo.completed;
    if(action === 'star') todo.important = !todo.important;
    if(action === 'delete') todos = todos.filter(t => t.id !== id);

    saveTodos();
    render();
  });

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    render();
  });

  filterGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    filterGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    render();
  });

  render();
})();

/* ================= DAILY PLANNER ================= */
(function plannerModule(){
  const STORAGE_KEY = 'pd_planner';
  const listEl = document.getElementById('plannerList');
  let plan = loadPlan();
  let saveTimer = null;

  function loadPlan(){
    try{
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    }catch(e){ return {}; }
  }

  function savePlan(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }

  function formatHour(h){
    const period = h < 12 ? 'AM' : 'PM';
    const display = h % 12 === 0 ? 12 : h % 12;
    return `${display}:00 ${period}`;
  }

  function render(){
    const fragment = document.createDocumentFragment();
    const currentHour = new Date().getHours();

    for(let h = 0; h < 24; h++){
      const row = document.createElement('div');
      row.className = 'planner-row' + (h === currentHour ? ' current-hour' : '');

      const timeSpan = document.createElement('span');
      timeSpan.className = 'planner-time';
      timeSpan.textContent = formatHour(h);

      const textInput = document.createElement('input');
      textInput.type = 'text';
      textInput.className = 'planner-input';
      textInput.placeholder = 'Nothing planned';
      textInput.value = plan[h] || '';
      textInput.dataset.hour = h;

      row.appendChild(timeSpan);
      row.appendChild(textInput);
      fragment.appendChild(row);
    }

    listEl.innerHTML = '';
    listEl.appendChild(fragment);
  }

  // debounce so we save once the user pauses typing, not every keystroke
  listEl.addEventListener('input', (e) => {
    const target = e.target.closest('.planner-input');
    if(!target) return;
    const hour = target.dataset.hour;
    const value = target.value.trim();

    if(value){ plan[hour] = value; } else { delete plan[hour]; }

    clearTimeout(saveTimer);
    saveTimer = setTimeout(savePlan, 300);
  });

  // refresh (re-highlight current hour) each time the planner is opened
  document.addEventListener('feature:open', (e) => {
    if(e.detail.name === 'planner') render();
  });

  render();
})();

/* ================= DAILY GOALS ================= */
(function goalsModule(){
  const STORAGE_KEY = 'pd_goals';
  const form = document.getElementById('goalForm');
  const input = document.getElementById('goalInput');
  const listEl = document.getElementById('goalList');
  const emptyEl = document.getElementById('goalEmpty');
  const fillEl = document.getElementById('goalProgressFill');
  const labelEl = document.getElementById('goalProgressLabel');

  let goals = loadGoals();

  function loadGoals(){
    try{
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }catch(e){ return []; }
  }

  function saveGoals(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function updateProgress(){
    const total = goals.length;
    const done = goals.filter(g => g.completed).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    fillEl.style.width = pct + '%';
    labelEl.textContent = `${done} of ${total} completed`;
  }

  function render(){
    const fragment = document.createDocumentFragment();

    goals.forEach(goal => {
      const li = document.createElement('li');
      li.className = 'item-row' + (goal.completed ? ' completed' : '');
      li.dataset.id = goal.id;
      li.innerHTML = `
        <button class="item-check" data-action="toggle" aria-label="Toggle complete">&#10003;</button>
        <span class="item-text">${escapeHtml(goal.text)}</span>
        <span class="item-actions">
          <button class="icon-btn danger" data-action="delete" aria-label="Delete goal">&#10005;</button>
        </span>`;
      fragment.appendChild(li);
    });

    listEl.innerHTML = '';
    listEl.appendChild(fragment);
    emptyEl.classList.toggle('visible', goals.length === 0);
    updateProgress();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if(!text) return;
    goals.push({ id: Date.now(), text, completed: false });
    saveGoals();
    render();
    input.value = '';
  });

  listEl.addEventListener('click', (e) => {
    const row = e.target.closest('.item-row');
    if(!row) return;
    const id = Number(row.dataset.id);
    const action = e.target.closest('button')?.dataset.action;
    const goal = goals.find(g => g.id === id);
    if(!goal) return;

    if(action === 'toggle') goal.completed = !goal.completed;
    if(action === 'delete') goals = goals.filter(g => g.id !== id);

    saveGoals();
    render();
  });

  render();
})();

/* ================= POMODORO TIMER ================= */
(function pomodoroModule(){
  const display = document.getElementById('timerDisplay');
  const sessionLabel = document.getElementById('sessionLabel');
  const startBtn = document.getElementById('timerStart');
  const pauseBtn = document.getElementById('timerPause');
  const resetBtn = document.getElementById('timerReset');
  const chips = document.querySelectorAll('.chip');

  let totalSeconds = 25 * 60;
  let remaining = totalSeconds;
  let intervalId = null;
  let currentLabel = 'Work Session';

  function formatTime(sec){
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateDisplay(){
    display.textContent = formatTime(remaining);
  }

  function tick(){
    remaining--;
    updateDisplay();
    if(remaining <= 0){
      clearInterval(intervalId);
      intervalId = null;
      display.textContent = "Time's up!";
      try{
        // gentle audio nudge; ignored silently if browser blocks autoplay
        new AudioContext(); // no-op placeholder, avoids errors if unsupported
      }catch(e){ /* ignore */ }
      alert(`${currentLabel} finished!`);
    }
  }

  startBtn.addEventListener('click', () => {
    if(intervalId) return; // prevent multiple intervals stacking
    intervalId = setInterval(tick, 1000);
  });

  pauseBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    remaining = totalSeconds;
    updateDisplay();
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      clearInterval(intervalId);
      intervalId = null;
      totalSeconds = Number(chip.dataset.mins) * 60;
      remaining = totalSeconds;
      currentLabel = chip.dataset.label;
      sessionLabel.textContent = currentLabel;
      updateDisplay();
    });
  });

  updateDisplay();
})();

/* ================= MOTIVATION QUOTE ================= */
(function motivationModule(){
  const textEl = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  const newQuoteBtn = document.getElementById('newQuoteBtn');

  const fallbackQuotes = [
    { text: 'Small steps every day add up to big results.', author: 'Unknown' },
    { text: 'Discipline is choosing between what you want now and what you want most.', author: 'Unknown' },
    { text: 'Done is better than perfect.', author: 'Unknown' },
    { text: 'Focus on progress, not perfection.', author: 'Unknown' }
  ];

  let quotePool = [];
  let hasFetched = false;

  async function loadPool(){
    try{
      const res = await fetch('https://type.fit/api/quotes');
      if(!res.ok) throw new Error('Quote request failed');
      const data = await res.json();
      quotePool = data
        .filter(q => q.text && q.text.length < 140)
        .map(q => ({ text: q.text, author: (q.author || 'Unknown').split(',')[0] }));
      hasFetched = true;
    }catch(err){
      quotePool = fallbackQuotes;
      hasFetched = true;
    }
  }

  function showRandomQuote(){
    const pool = quotePool.length ? quotePool : fallbackQuotes;
    const q = pool[Math.floor(Math.random() * pool.length)];
    textEl.textContent = `\u201C${q.text}\u201D`;
    authorEl.textContent = `\u2014 ${q.author}`;
  }

  async function newQuote(){
    if(!hasFetched){
      textEl.textContent = 'Loading a quote for you\u2026';
      authorEl.textContent = '\u00A0';
      await loadPool();
    }
    showRandomQuote();
  }

  newQuoteBtn.addEventListener('click', newQuote);

  // fetch one quote the first time the feature is opened
  document.addEventListener('feature:open', (e) => {
    if(e.detail.name === 'motivation' && !hasFetched) newQuote();
  });
})();

/* ================= DYNAMIC BACKGROUND (subtle, time-of-day tint) ================= */
(function dynamicBackgroundModule(){
  const root = document.documentElement;

  function applyTimeTint(){
    const hour = new Date().getHours();
    let tint;
    if(hour >= 5 && hour < 11) tint = 'morning';
    else if(hour >= 11 && hour < 17) tint = 'afternoon';
    else if(hour >= 17 && hour < 21) tint = 'evening';
    else tint = 'night';
    root.setAttribute('data-time-of-day', tint);
  }

  applyTimeTint();
  setInterval(applyTimeTint, 15 * 60 * 1000); // re-check every 15 min
})();
