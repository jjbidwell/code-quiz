var minutesEl = document.querySelector("#minutes");
var secondsEl = document.querySelector("#seconds");
var timeUpMessage = document.querySelector("#time-up");
var secondsLeft = 0;
var minutesLeft = 5;

function stopTimer(){
    clearInterval(timer)
}

var timer = setInterval(function(){
    if(secondsLeft === 0){
        secondsLeft = 59;
        minutesLeft--
        minutesEl.textContent = minutesLeft;
    } else (
        secondsLeft--
    )

    if(secondsLeft < 10){
        secondsEl.textContent = "0" + secondsLeft.toString();
    } else {
        secondsEl.textContent = secondsLeft;
    }

    if(secondsLeft === 0 && minutesLeft ===0){
        stopTimer();
        timeUpMessage.style.display = "initial";
    }
}, 1000);