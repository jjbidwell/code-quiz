var timer = document.querySelector('#timer');
var minutesEl = document.querySelector("#minutes");
var secondsEl = document.querySelector("#seconds");
var timeUpMessage = document.querySelector("#time-up");
var startButton = document.querySelector("#start-button");
var answerButton = document.querySelectorAll(".answer");
var correctAnswer = document.querySelectorAll('.correct');
var incorrectAnswer = document.querySelectorAll('.incorrect');

var question1 = document.querySelector('#question-1');
var secondsLeft = 30;
var minutesLeft = 2;
var currentQuestion = 1;
var score = 0;

answerButton.forEach(function(item, index){
    item.addEventListener('click', function(){
        if (this.getAttribute('class').includes( " correct")){
            nextQuestion(true);
        } else {
            nextQuestion(false);
        }

    })
});

function nextQuestion(rightOrWrong){
    var showingPage = document.querySelector('#question-' + currentQuestion);
    var nextPage = document.querySelector('#question-' + (currentQuestion + 1));
    showingPage.style.display = "none";
    nextPage.style.display = "inherit";
    if (rightOrWrong === true){
        score++
        console.log(score);
    } else if(rightOrWrong === false){
        console.log('Incorrect');
        secondsLeft -= 5;
        secondsEl.textContent = secondsLeft;
    }
    currentQuestion++
}




startButton.addEventListener('click', function(){
    question1.style.display = "inherit";
    startButton.style.display = "none";
    timer.style.display = "initial";
    var quizTimer = setInterval(function(){
        if(secondsLeft === 0 && minutesLeft !== 0){
            secondsLeft = 59;
            minutesLeft--

            minutesEl.textContent = minutesLeft;
        } else if(secondsLeft === 1 && minutesLeft === 0){
            stopTimer();
            timeUpMessage.style.display = "initial";
            timer.style.display = "none";
        } else {
            secondsLeft--
        }

        if(secondsLeft < 10){
            secondsEl.textContent = "0" + secondsLeft.toString();
        } else {
            secondsEl.textContent = secondsLeft;
        }

    }, 1000);



    function stopTimer(){
    clearInterval(quizTimer);
}

});

