/* ── Data ──────────────────────────────────────────────────────── */
var questions = [
  {
    q: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperTool Multi Language",
      "HyperText Machine Learning"
    ],
    answer: 0,
    explanation: "HTML stands for HyperText Markup Language, the standard language for structuring web pages."
  },
  {
    q: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "fixed"],
    answer: 2,
    explanation: "'const' declares a block-scoped, read-only variable that cannot be reassigned."
  },
  {
    q: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Syntax",
      "Colorful Style Sheets"
    ],
    answer: 1,
    explanation: "CSS stands for Cascading Style Sheets, which controls the visual presentation of HTML elements."
  },
  {
    q: "Which of these is NOT a primitive data type in JavaScript?",
    options: ["String", "Boolean", "Float", "Undefined"],
    answer: 2,
    explanation: "JavaScript does not have a 'Float' type. Numbers are represented by the single 'Number' type."
  },
  {
    q: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Display Output Method",
      "Dynamic Object Module"
    ],
    answer: 0,
    explanation: "DOM stands for Document Object Model, the programming interface that represents the HTML document as a tree of objects."
  }
];

/* ── State ─────────────────────────────────────────────────────── */
var currentIndex  = 0;
var score         = 0;
var timeLeft      = 15;
var answered      = false;
var timerInterval = null;

/* ── Helpers ───────────────────────────────────────────────────── */
function $(id) { return document.getElementById(id); }

function showScreen(id) {
  var screens = ['startScreen', 'quizScreen', 'resultScreen'];
  for (var i = 0; i < screens.length; i++) {
    $(screens[i]).style.display = (screens[i] === id) ? 'block' : 'none';
  }
}

/* ── Quiz Flow ─────────────────────────────────────────────────── */
function startQuiz() {
  currentIndex = 0;
  score        = 0;
  showScreen('quizScreen');
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  timeLeft = 15;

  var q = questions[currentIndex];

  $('questionCounter').textContent = 'Question ' + (currentIndex + 1) + ' of ' + questions.length;
  $('progressBar').style.width = ((currentIndex / questions.length) * 100) + '%';
  $('questionText').textContent = q.q;
  $('feedback').textContent = '';
  $('feedback').className = 'feedback';
  $('nextBtn').style.display = 'none';

  var container = $('optionsContainer');
  container.innerHTML = '';
  for (var i = 0; i < q.options.length; i++) {
    (function(index) {
      var btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = q.options[index];
      btn.onclick = function() { selectAnswer(index); };
      container.appendChild(btn);
    })(i);
  }

  updateTimerDisplay();
  clearInterval(timerInterval);
  timerInterval = setInterval(tickTimer, 1000);
}

/* ── Timer ─────────────────────────────────────────────────────── */
function tickTimer() {
  timeLeft--;
  updateTimerDisplay();
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    if (!answered) { handleTimeout(); }
  }
}

function updateTimerDisplay() {
  $('timerDisplay').textContent = timeLeft + 's';
  if (timeLeft <= 5) {
    $('timerDisplay').classList.add('warning');
  } else {
    $('timerDisplay').classList.remove('warning');
  }
}

function handleTimeout() {
  answered = true;
  disableOptions();
  var correctIdx = questions[currentIndex].answer;
  var buttons = $('optionsContainer').querySelectorAll('.option');
  buttons[correctIdx].classList.add('correct');
  var fb = $('feedback');
  fb.textContent = 'Time is up. Correct answer: ' + questions[currentIndex].options[correctIdx] + '. ' + questions[currentIndex].explanation;
  fb.className = 'feedback timeout-fb';
  $('nextBtn').style.display = 'inline-block';
}

/* ── Answer Selection ──────────────────────────────────────────── */
function selectAnswer(index) {
  if (answered) { return; }
  answered = true;
  clearInterval(timerInterval);

  var q = questions[currentIndex];
  var buttons = $('optionsContainer').querySelectorAll('.option');
  disableOptions();

  var fb = $('feedback');

  if (index === q.answer) {
    score++;
    buttons[index].classList.add('correct');
    fb.textContent = 'Correct. ' + q.explanation;
    fb.className = 'feedback correct-fb';
  } else {
    buttons[index].classList.add('wrong');
    buttons[q.answer].classList.add('correct');
    fb.textContent = 'Incorrect. ' + q.explanation;
    fb.className = 'feedback wrong-fb';
  }

  $('nextBtn').style.display = 'inline-block';
}

function disableOptions() {
  var buttons = $('optionsContainer').querySelectorAll('.option');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

/* ── Navigation ────────────────────────────────────────────────── */
function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

/* ── Results ───────────────────────────────────────────────────── */
function showResults() {
  clearInterval(timerInterval);
  showScreen('resultScreen');

  var pct = Math.round((score / questions.length) * 100);
  $('finalScore').textContent = score + ' / ' + questions.length;
  $('scorePct').textContent   = pct + '% correct';

  var msg;
  if (pct === 100)    { msg = 'Perfect score. Excellent work!'; }
  else if (pct >= 60) { msg = 'Good effort. Review the questions you missed and try again.'; }
  else                { msg = 'Keep studying. You can improve with more practice.'; }
  $('resultMsg').textContent = msg;
}

function restartQuiz() {
  showScreen('startScreen');
}
