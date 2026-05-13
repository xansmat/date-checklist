// ---- PIN / LOCK SCREEN ----
const CORRECT_PIN = '04042025';
let pin = '';

function pressNum(n) {
  if (pin.length >= 8) return;
  pin += n;
  updateDots();
  if (pin.length === 8) checkPin();
}

function pressDelete() {
  pin = pin.slice(0, -1);
  updateDots();
  document.getElementById('lock-error').textContent = '\u00a0';
}

function updateDots() {
  for (let i = 0; i < 8; i++) {
    document.getElementById('d' + i).classList.toggle('filled', i < pin.length);
  }
}

function checkPin() {
  if (pin === CORRECT_PIN) {
    setTimeout(() => {
      document.getElementById('lock-screen').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      initApp();
    }, 300);
  } else {
    const errEl = document.getElementById('lock-error');
    errEl.textContent = 'Wrong PIN! Try again 🙈';
    errEl.style.animation = 'none';
    errEl.offsetHeight;
    errEl.style.animation = 'shake 0.4s ease';
    pin = '';
    setTimeout(() => updateDots(), 100);
    setTimeout(() => { document.getElementById('lock-error').textContent = '\u00a0'; }, 1800);
  }
}

// ---- TASKS ----
const TASKS = [
  { name: 'Shop at Ko Mart', icon: '🛍️' },
  { name: 'Arcade at SM', icon: '🎮' },
  { name: 'Have Tapioca at Downtown', icon: '🧋' },
  { name: 'Cooking Date', icon: '👩‍🍳' },
  { name: 'Binge Watch Love Is War', icon: '📺' },
];

let completed = 0;

function initApp() {
  const container = document.getElementById('tasks-container');
  container.innerHTML = '';
  completed = 0;

  TASKS.forEach((task, i) => {
    const card = document.createElement('div');
    card.className = 'task-card ' + (i === 0 ? 'active' : 'locked');
    card.id = 'card-' + i;

    const numDiv = document.createElement('div');
    numDiv.className = 'task-num';
    numDiv.textContent = i + 1;

    const iconDiv = document.createElement('div');
    iconDiv.className = 'task-icon';
    iconDiv.textContent = task.icon;

    const info = document.createElement('div');
    info.className = 'task-info';

    const name = document.createElement('div');
    name.className = 'task-name';
    name.textContent = task.name;

    const status = document.createElement('div');
    status.className = 'task-status';
    status.id = 'status-' + i;
    status.textContent = i === 0 ? '🌟 Up next!' : '🔒 Locked';

    info.appendChild(name);
    info.appendChild(status);

    const cbWrap = document.createElement('div');
    cbWrap.className = 'checkbox-wrap';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'task-checkbox';
    cb.id = 'cb-' + i;
    cb.disabled = i !== 0;
    cb.addEventListener('change', () => completeTask(i));

    cbWrap.appendChild(cb);

    card.appendChild(numDiv);
    card.appendChild(iconDiv);
    card.appendChild(info);
    card.appendChild(cbWrap);
    container.appendChild(card);
  });

  updateProgress();
}

function completeTask(i) {
  const cb = document.getElementById('cb-' + i);
  if (!cb.checked) return;

  cb.disabled = true;
  completed++;

  const card = document.getElementById('card-' + i);
  card.className = 'task-card done';
  document.getElementById('status-' + i).textContent = '✅ Done!';
  document.getElementById('card-' + i).querySelector('.task-num').style.background = 'linear-gradient(135deg,#86efac,#34d399)';

  if (i + 1 < TASKS.length) {
    const next = document.getElementById('card-' + (i + 1));
    next.className = 'task-card active';
    document.getElementById('cb-' + (i + 1)).disabled = false;
    document.getElementById('status-' + (i + 1)).textContent = '🌟 Up next!';
  }

  updateProgress();

  if (completed === TASKS.length) {
    setTimeout(celebrate, 400);
  }
}

function updateProgress() {
  document.getElementById('prog-count').textContent = completed + ' / 5';
  document.getElementById('prog-bar').style.width = (completed / 5 * 100) + '%';
}

// ---- CELEBRATION ----
function celebrate() {
  const colors = ['#f472b6','#a855f7','#6366f1','#34d399','#fbbf24','#f87171','#60a5fa'];
  const area = document.getElementById('confetti-area');
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = (6 + Math.random() * 8) + 'px';
    p.style.height = (6 + Math.random() * 8) + 'px';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
    p.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    p.style.animationDelay = (Math.random() * 0.8) + 's';
    area.appendChild(p);
    setTimeout(() => p.remove(), 4000);
  }
  document.getElementById('celebration-banner').classList.add('show');
  setTimeout(() => document.getElementById('celebration-banner').classList.remove('show'), 4000);
  setTimeout(() => document.getElementById('ily-overlay').classList.add('show'), 1200);
}

function closeIly() {
  document.getElementById('ily-overlay').classList.remove('show');
}
