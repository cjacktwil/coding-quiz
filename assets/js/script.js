//add var for question; data ids for each question, 
//counter for time, 
//functions for starting quiz, selecting answer, scoring, ending game, displaying results 
//Do I want to handle all styling in JS?
//If so, 1. make body(main?) a variable; 2. create elements (var = document.createElement("h1")) etc.; 3. assign text to all elements (var.textContent = ""); 4. Append all elements (body.appendChild(h1El);); 5. Style all elements (h1El.setAtttribute = ("style", "font-size: large"););

var quizQuestions = [
    {
        question: "Question 1",
        answers: [
            {text: "a. answer 1", correct: true},
            {text: "b, answer 2", correct: false},
            {text: "c, answer 3", correct: false},
            {text: "d, answer 4", correct: false}
        ]
    },
    {
        question: "Question 2",
        answers: [
            {text: "a. answer 1", correct: false},
            {text: "b, answer 2", correct: false},
            {text: "c, answer 3", correct: true},
            {text: "d, answer 4", correct: false}
        ]
    }
];
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
var finalScore = document.getElementById("score");
var finalScoreInitials = document.getElementById("initials");
var submitButtonEl = document.getElementById("submit");
var highScoreEl = document.getElementById("high-score");
var highScoreGridEl = document.getElementById("high-score-grid");
var goBackButton = document.getElementById("go-back");
var clearScoreButton = document.getElementById("clear-score");
//var button = document.createElement("button");
var score = 0;
var clock = 75;
var currentQuestion = 0;

var countdown = function() {
    //var clock = 75;
    var intervalTimer = setInterval(function() {
        countdownEl.innerText = ("Time: " + clock)
        //console.log(clock);
        if (clock > 0) {
            clock--;}
        else {
            endGame();
    }
},
1000);
};

var startGame = function() {
    //debugger;
    console.log("Game has begun!");
    startButton.setAttribute("class", "hide");
    instructions.setAttribute("class", "hide");
    setQuestion()
};

var setQuestion = function() {
    //reset();
    questionEl.removeAttribute("class", "hide")
    answersEl.removeAttribute("class", "hide");
    //var q = quizQuestions[currentQuestion];
        askQuestion();
}

var askQuestion = function() {
//for (i = 0; i < quizQuestions.length; i++) {
    //debugger;
    //questionEl.removeAttribute("class", "hide");
    //answersEl.removeAttribute("class", "hide");
    questionEl.innerText = quizQuestions[currentQuestion].question;
    showAnswers();
     };
        //button.addEventListener("click", selectAnswer);


var showAnswers = function() {
    //answerElA.innerText = quizQuestions[i].answer1;
    //answer();
        correctEl.setAttribute("class", "hide");
        wrongEl.setAttribute("class", "hide");
        resultEl.setAttribute("class", "hide");
        quizQuestions[currentQuestion].answers.forEach(answer => {
        //answerElA.removeAttribute("class", "hide");
        var button = document.createElement("button");    
        button.innerText = answer.text;
            button.setAttribute("class", "btn");
            // if (answer.correct) {
            //     button.dataset.correct = answer.correct
            // }
        //button.addEventListener("click", selectAnswer);    
        answersEl.appendChild(button);
        button.value = answer.correct;
         });
         //debugger;
        selectAnswer();
};

//answersEl.addEventListener("click", selectAnswer);



var selectAnswer = function() {
    answersEl.addEventListener("click", checkAnswer);
    // console.log(event.target);
    // checkAnswer();
};

var checkAnswer = function(event) {
    var selectedButton = event.target;
    //var correct = selectedButton.dataset.correct;
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

var nextQuestion = function() {
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    };
    if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    setQuestion();
     }
    else
    {endGame();
    }
    };

var endGame = function() {
    //debugger;
    answersEl.setAttribute("class", "hide");
    questionEl.setAttribute("class", "hide");
    wrongEl.setAttribute("class", "hide");
    correctEl.setAttribute("class", "hide");
    resultEl.setAttribute("class", "hide");
    gameOverEl.removeAttribute("class", "hide");
    initialsFormEl.removeAttribute("class", "hide");
    finalScore.innerText = score;
    clock = 0;
    clearInterval();
    submitButtonEl.addEventListener("click", saveScore);
};

    var saveScore = function() {
        //event.preventDefaul();
//debugger;
        var initials = document.querySelector("#initials").value;
        var finalScore = score;
        var finalScoreStored = localStorage.getItem("finalScore");
        if (finalScore > finalScoreStored) {
    localStorage.setItem("finalScore", finalScore);
    localStorage.setItem("initials", initials);
    }
    highScore();
};

var highScore = function() {
    var finalScoreStored = localStorage.getItem("finalScore");
    var finalScoreInitialsStored = localStorage.getItem("initials");
        gameOverEl.setAttribute("class", "hide");
        initialsFormEl.setAttribute("class", "hide");
        highScoreEl.removeAttribute("class", "hide");
        highScoreGridEl.removeAttribute("class", "hide");
        highScoreGridEl.innerText = "1. " + finalScoreInitialsStored + " - " + finalScoreStored;
        goBackButton.removeAttribute("class", "hide");
        goBackButton.addEventListener("click", restart)
        clearScoreButton.removeAttribute("class", "hide");
        clearScoreButton.addEventListener("click", clearScore);

    };
    //display high score
//two buttons: go Bac (start over) and clear high scores

var restart = function() {

};

var clearScore = function() {

};

startButton.addEventListener("click", countdown);
startButton.addEventListener("click", startGame);
//answersEl.addEventListener("click", selectAnswer);



