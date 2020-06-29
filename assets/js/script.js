var startButton = document.getElementById("start");
var instructions = document.getElementById("instructions");
var questionEl = document.getElementById("question");
var answerElA = document.getElementById("a");
var answersEl = document.getElementById("answers");
var countdownEl = document.getElementById("timer");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var resultEl = document.getElementById("result");
var gameOverEl = document.getElementById("end-game")
var initialsFormEl = document.getElementById("initials-form")
var finalScoreInitials = document.getElementById("initials");
var submitButtonEl = document.getElementById("submit");
var highScoreEl = document.getElementById("high-score");
var highScoreGridEl = document.getElementById("high-score-grid");
var finalScore = document.getElementById("score");
var goBackButton = document.getElementById("go-back");
var clearScoreButton = document.getElementById("clear-score");
var score = 0;
var clock = 75;
var currentQuestion = 0;
var viewHighScoreEl = document.getElementById("high-score");

//set countdown timer
var countdown = function() {
    setInterval(function() {
        countdownEl.innerText = ("Time: " + clock)
        if (clock > 0) {
            clock--;}
},
1000);
};

//initiate game start function
var startGame = function() {
    console.log("Game has begun!");
    startButton.setAttribute("class", "hide");
    instructions.setAttribute("class", "hide");
    setQuestion()
};

//set first question to be called
var setQuestion = function() {
    questionEl.removeAttribute("class", "hide")
    answersEl.removeAttribute("class", "hide");
    askQuestion();
};

//post question
var askQuestion = function() {
    questionEl.innerText = quizQuestions[currentQuestion].question;
    showAnswers();
     };
   
//show answer choices
var showAnswers = function() {
        //hide results from prior question
        correctEl.setAttribute("class", "hide");
        wrongEl.setAttribute("class", "hide");
        resultEl.setAttribute("class", "hide");
        //generate answer buttons
        quizQuestions[currentQuestion].answers.forEach(answer => {
        var button = document.createElement("button");    
            button.innerText = answer.text;
            button.setAttribute("class", "btn");
            answersEl.appendChild(button);
        //append "correct" value to new variable
            button.value = answer.correct;
         });
        selectAnswer();
};

//wait for click on answer
var selectAnswer = function() {
    answersEl.addEventListener("click", checkAnswer);
};

//check answer for correctness
var checkAnswer = function(event) {
    var selectedButton = event.target;
    if (selectedButton.value === "true") {
        score++;
        correctEl.removeAttribute("class", "hide");
        resultEl.removeAttribute("class", "hide");
        console.log(score);
    }
    else {
        clock -= 10;
        console.log(clock);
        resultEl.removeAttribute("class", "hide");
        wrongEl.removeAttribute("class", "hide");
    }
    nextQuestion();
};

//generate next question, where available
var nextQuestion = function() {
    //remove prior answers
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    };
    //if more questions are available, advance to next question
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            setQuestion();
        }
    //if no more questions are available, proceed to endGame function
        else {
            endGame();
        }
    };

//show score and collect initials
var endGame = function() {
    //debugger;
    //hide questions, answers and results
    answersEl.setAttribute("class", "hide");
    questionEl.setAttribute("class", "hide");
    wrongEl.setAttribute("class", "hide");
    correctEl.setAttribute("class", "hide");
    resultEl.setAttribute("class", "hide");
    //show score and input for initials
    gameOverEl.removeAttribute("class", "hide");
    initialsFormEl.removeAttribute("class", "hide");
    //populate score
    finalScore.innerText = score;
    //reset and stop clock
    clock = 0;
    clearInterval();
    //assign event listener to submit button
    submitButtonEl.addEventListener("click", saveScore);
};

//save score and initials, where applicable
var saveScore = function() {
    //remove end game elements
    gameOverEl.setAttribute("class", "hide");
    initialsFormEl.setAttribute("class", "hide");
    //assign initials and score to variables
    var initials = document.querySelector("#initials").value;
    var finalScore = score;
    //pull existing score from local storage
    var finalScoreStored = localStorage.getItem("finalScore");
    //check to see if current player achieved high score, if so, save score and initials
        if (finalScore > finalScoreStored) {
            localStorage.setItem("finalScore", finalScore);
            localStorage.setItem("initials", initials);
        }
    //proceed to high score funciton
    highScore()
}

//display high score and initials
var highScore = function() {
    //get high score and initials saved in local storage
    var finalScoreStored = localStorage.getItem("finalScore");
    var finalScoreInitialsStored = localStorage.getItem("initials");
    //show high score elements
    highScoreEl.removeAttribute("class", "hide");
    highScoreGridEl.removeAttribute("class", "hide");
    highScoreGridEl.innerText = "1. " + finalScoreInitialsStored + " - " + finalScoreStored;
    goBackButton.removeAttribute("class", "hide");
    clearScoreButton.removeAttribute("class", "hide");
    endGameButtonHandlers(); 
     };
    
    var endGameButtonHandlers = function () {
        goBackButton.addEventListener("click", restart);
        clearScoreButton.addEventListener("click", clearScore);
    };



//function to restart quiz
var restart = function() {
    gameOverEl.setAttribute("class", "hide");
    initialsFormEl.setAttribute("class", "hide");
    goBackButton.setAttribute("class", "hide");
    clearScoreButton.setAttribute("class", "hide");
    highScoreEl.setAttribute("class", "hide");
    highScoreGridEl.setAttribute("class", "hide");
    score = 0;
    clock = 75;
    currentQuestion = 0;
    startButton.removeAttribute("class", "hide");
    instructions.removeAttribute("class", "hide");
    restartGameButtonHandler();
};

var restartGameButtonHandler = function() {
    startButton.addEventListener("click", countdown);
    startButton.addEventListener("click", startGame);
}

var clearScore = function() {
    localStorage.setItem("finalScore", 0);
    localStorage.setItem("initials", null);
    restart();
};

startButton.addEventListener("click", countdown);
startButton.addEventListener("click", startGame);
viewHighScoreEl.addEventListener("click", highScore);

var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {text: "1. Strings", correct: false},
            {text: "2. Booleans", correct: false},
            {text: "3. Alerts", correct: true},
            {text: "4. Numbers", correct: false}
        ]
    },
    {
        question: "The condition in an if/then statement is enclosed with ____________________.",
        answers: [
            {text: "1. Quotes", correct: false},
            {text: "2. Curly brackets", correct: true},
            {text: "3. Parenthesis", correct: false},
            {text: "4. Square brackets", correct: false}
        ]
    },
    {
        question: "Arrays in Javascript can be used to store ____________.",
        answers: [
            {text: "1. Numbers and strings", correct: false},
            {text: "2. Other arrays", correct: false},
            {text: "3. Booleans", correct: false},
            {text: "4. All of the above", correct: true}
        ]
    },
    {
        question: "String values must be enclosed within ______________ when being assigned to variables.",
        answers: [
            {text: "1. Commas", correct: false},
            {text: "2. Curly brackets", correct: false},
            {text: "3. Quotes", correct: true},
            {text: "4. Parenthesis", correct: false}
        ]
    },
    {
        question: "A very useful tool used during development and debugginf for printing content to the debugger is:",
        answers: [
            {text: "1. JavaScript", correct: false},
            {text: "2. Terminal/bash", correct: false},
            {text: "3. For loops", correct: false},
            {text: "4. Console.log", correct: true}
        ]
    }
];