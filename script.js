const questions = [
  {
    question: "Which language is used to structure a web page?",
    answers: ["Python", "HTML", "C++", "SQL"],
    correct: 1
  },
  {
    question: "What does CSS mainly control?",
    answers: ["Page styling", "Database storage", "Server hardware", "File downloads"],
    correct: 0
  },
  {
    question: "Which language adds interactivity to a web page?",
    answers: ["Java", "HTML", "JavaScript", "CSS"],
    correct: 2
  },
  {
    question: "Which HTML tag creates a hyperlink?",
    answers: ["<link>", "<a>", "<p>", "<img>"],
    correct: 1
  },
  {
    question: "Which symbol starts a single-line comment in JavaScript?",
    answers: ["<!--", "**", "//", "##"],
    correct: 2
  },
  {
    question: "Which keyword declares a variable that can be reassigned?",
    answers: ["const", "let", "fixed", "define"],
    correct: 1
  },
  {
    question: "Which method displays a message in the browser console?",
    answers: ["console.log()", "print.page()", "show.console()", "message()"],
    correct: 0
  },
  {
    question: "Which CSS property changes text colour?",
    answers: ["font-style", "text-size", "background", "color"],
    correct: 3
  },
  {
    question: "Which HTML tag displays an image?",
    answers: ["<picture-text>", "<img>", "<image-text>", "<src>"],
    correct: 1
  },
  {
    question: "Which array property tells us how many items it contains?",
    answers: ["size", "count()", "length", "total"],
    correct: 2
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const questionCount = document.getElementById("question-count");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  answered = false;
  feedback.textContent = "";
  nextButton.hidden = true;
  answerButtons.replaceChildren();

  const current = questions[currentQuestion];

  questionElement.textContent = current.question;
  questionCount.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreElement.textContent = `Score: ${score}`;
  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.type = "button";

    button.addEventListener("click", () => selectAnswer(index, button));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;
  const correctIndex = questions[currentQuestion].correct;
  const buttons = answerButtons.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === correctIndex) {
      button.classList.add("correct");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
    feedback.textContent = "✓ Correct! Great job!";
    feedback.style.color = "#238448";
  } else {
    selectedButton.classList.add("wrong");
    feedback.textContent = "✗ Not quite! The correct answer is highlighted.";
    feedback.style.color = "#bd4038";
  }

  scoreElement.textContent = `Score: ${score}`;
  nextButton.hidden = false;

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "View Results →"
      : "Next Question →";
}

function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  finalScore.textContent = `${score} / ${questions.length}`;

  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect score! You're a QuizSpark champion!";
  } else if (percentage >= 70) {
    resultMessage.textContent = "Excellent work! You know your web basics.";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Good effort! Keep learning and try again.";
  } else {
    resultMessage.textContent = "Keep practising! Every attempt helps you improve.";
  }
}

nextButton.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizScreen.hidden = false;
  resultScreen.hidden = true;
  showQuestion();
});

showQuestion();
