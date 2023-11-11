//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("nextbutton");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array


const quizArray = [
  {
    id: "0",
    question: "Which of the following is true about variable naming conventions in JavaScript?",
    options: [
      "You should not use any of the JavaScript reserved keyword as variable name.",
      "JavaScript variable names should not start with a numeral (0-9).",
      "Both of the above.",
      "None of the above."],
    correct: "Both of the above.",
  },
  {
    id: "1",
    question: "How can you get the type of arguments passed to a function?",
    options: [
      "using typeof operator",
      "using getType function",
      "Both of the above.",
      "None of the above."],
    correct: "using typeof operator",
  },
  {
    id: "2",
    question: "Which built-in method combines the text of two strings and returns a new string?",
    options: [
      "append()",
      "concat()",
      "attach()",
      "None of the above"],
    correct: "concat()",
  },
  {
    id: "3",
    question: "Which of the following code creates an object?",
    options: [
      "var book = Object();",
      "var book = new Object();",
      "var book = new OBJECT();",
      "var book = new Book();"],
    correct: "var book = new Object();",
  },
  {
    id: "4",
    question: "Which of the following function of String object is used to match a regular expression against a string?",
    options: [
      "concat()",
      "match()",
      "search()",
      "replace()"],
    correct: "match()",
  },
  {
    id: "5",
    question: " Which of the following function of String object returns the calling string value converted to upper case while respecting the current locale?",
    options: [
      "toLocaleUpperCase()",
      "toUpperCase()",
      "toString()",
      "substring()"],
    correct: "toUpperCase()",
  },
  {
    id: "6",
    question: "Which of the following function of String object causes a string to be displayed in a small font, as if it were in a small tag?",
    options: [
      "link()",
      "small()",
      "sup()",
      "sub()"],
    correct: "small()",
  },
  {
    id: "7",
    question: " Which of the following function of Array object removes the last element from an array and returns that element?",
    options: [
      "pop()",
      "push()",
      "join()",
      "map()"],
    correct: "pop()",
  },
  {
    id: "8",
    question: "Which of the following function of Array object sorts the elements of an array?",
    options: [
      "toSource()",
      "sort()",
      "toString()",
      "unshift()"],
    correct: "sort()",
  },
  {
    id: "9",
    question: "JavaScript is a ___ -side programming language.",
    options: [
      "Client",
      "Server",
      "Both",
      "None"],
    correct: "Both",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + (scoreCount/questionCount)*100 + " %";
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    // i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
      `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};