// OOP Class
class Question {
  constructor(problem, answer) {
    this.problem = problem;
    this.answer = answer;
  }

  check(userAnswer) {
    return Number(userAnswer) === this.answer;
  }
}

// Questions
let questions = [
  new Question("Print sum of 2 + 3", 5),
  new Question("Print 10 * 2", 20),
  new Question("Print 15 - 5", 10),
  new Question("Print 9 % 4 (remainder)", 1),
  new Question("Print square of 6", 36)
];

let current = 0;
let score = 0;

// Load Question
function loadQuestion() {
  document.getElementById("question").innerText =
    questions[current].problem;
}

// Run Code
function runCode() {
  let userCode = document.getElementById("codeInput").value.trim();
  let result;

  try {
    let output = "";

    // Capture console.log
    const originalLog = console.log;
    console.log = function(msg) {
      output += msg;
    };

    result = eval(userCode);

    // Restore console.log
    console.log = originalLog;

    // If console.log used → take output
    if (output !== "") {
      result = output;
    }

  } catch (e) {
    document.getElementById("result").innerText = "❌ Error in code!";
    return;
  }

  if (questions[current].check(result)) {
    document.getElementById("result").innerText = "✅ Correct!";
    score += 10;
  } else {
    document.getElementById("result").innerText =
      "❌ Wrong! Output: " + result;
  }

  document.getElementById("score").innerText = "Score: " + score;
}

// Next Question
function nextQuestion() {
  current++;

  if (current >= questions.length) {
    document.getElementById("question").innerText = "🎉 Finished!";
    document.getElementById("result").innerText = "";
    return;
  }

  document.getElementById("codeInput").value = "";
  document.getElementById("result").innerText = "";
  loadQuestion();
}

// Initial Load
loadQuestion();
