var timer = document.querySelector('#timer');
var minutesEl = document.querySelector("#minutes");
var secondsEl = document.querySelector("#seconds");
var timeUpMessage = document.querySelector("#time-up");
var startButton = document.querySelector("#start-button");
var secondsLeft = 0;
var minutesLeft = 5;



startButton.addEventListener('click', function(){
    startButton.style.display = "none";
    timer.style.display = "initial";
    var quizTimer = setInterval(function(){
        if(secondsLeft === 0 && minutesLeft !== 0){
            secondsLeft = 59;
            minutesLeft--
            minutesEl.textContent = minutesLeft;
        } else if(secondsLeft === 0 && minutesLeft === 0){
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
    clearInterval(quizTimer)
}

});