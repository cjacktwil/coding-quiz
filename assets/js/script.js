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
]
var startButton = document.getElementById("start");
var instructions = document.getElementById("instructions");
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answers");
var countdownEl = document.getElementById("timer");

var startGame = function() {
    console.log("Game has begun!");
    startButton.setAttribute("class", "hide");
    instructions.setAttribute("class", "hide");
    askQuestion()
};

// var setQuestion = function() {
//     questionEl.removeAttribute("class", "hide")
// }

var askQuestion = function(){
for (i = 0; i < quizQuestions.length; i++) {
    //debugger;
    questionEl.removeAttribute("class", "hide");
    questionEl.innerText = quizQuestions[i].question;
    //answerElA.innerText = quizQuestions[i].answers;
    quizQuestions[i].answers.forEach(answer);
    var answer = function() {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.setAttribute("class", "btn");
        if (answer.correct) {
            //add to score and say "correct"
        }
        else {
            //remove 10 seconds from time and say "wrong"
        }
        button.addEventListener("click", selectAnswer);
        answerEl.appendChild(button);
    }
    };
    //if (quizQuestions.answer) {
    //alert("Correct!");
    //score++;
    //}
    //else {
    //    alert("Wrong!");
    //}
};
//askQuestion();
var selectAnswer = function() {

}

var endGame = function() {

};

var countdown = function() {
    var clock = 75;
    var intervalTimer = setInterval(function() {
        clock--;
        countdownEl.innerText = ("Time: " + clock)
        //console.log(clock);
        if (clock < 0) {
            //clearInterval();
          //  endGame();
    }
},
1000);
};

startButton.addEventListener('click', startGame);
startButton.addEventListener('click', countdown);