var timer = document.querySelector('#timer');
var minutesEl = document.querySelector("#minutes");
var secondsEl = document.querySelector("#seconds");
var timeUpMessage = document.querySelector("#time-up");
var startButton = document.querySelector("#start-button");
var answerButton = document.querySelectorAll(".answer");
var correctAnswer = document.querySelectorAll('.correct');
var incorrectAnswer = document.querySelectorAll('.incorrect');
var finalContainer = document.querySelector('#final-container');
var saveButton = document.querySelector('#save-button');
var showingPage;
var nextPage;
var question1 = document.querySelector('#question-1');
var secondsLeft = 30;
var minutesLeft = 2;
var currentQuestion = 1;
var score = 0;

minutesEl.textContent = minutesLeft;
secondsEl.textContent = secondsLeft;




startButton.addEventListener('click', function(){
    question1.style.display = "inherit";
    startButton.style.display = "none";
    timer.style.display = "initial";
    var quizTimer = setInterval(function(){
        if(secondsLeft <= 0 && minutesLeft > 0){
            secondsLeft = 59;
            minutesLeft--

            minutesEl.textContent = minutesLeft;
        } else if(secondsLeft < 1 && minutesLeft <= 0){
            stopTimer();
        } else {
            secondsLeft--
        }

        if(secondsLeft < 10){
            secondsEl.textContent = "0" + secondsLeft.toString();
        } else {
            secondsEl.textContent = secondsLeft;
        }

    }, 1000);

    saveButton.addEventListener('click', function(){

    })

    function stopTimer(){
        showingPage = document.querySelector('#question-' + currentQuestion);
        showingPage.style.display = "none";
        score = score + secondsLeft + (minutesLeft * 60);
        finalContainer.style.display = "block";
        timeUpMessage.textContent = "Your Score: " + score;
        timer.style.display = "none";
        clearInterval(quizTimer);
        
    }

    function nextQuestion(rightOrWrong){

        if(currentQuestion === 15 && rightOrWrong === true){
            score += 10;
            stopTimer();
        } else if(currentQuestion === 15 && rightOrWrong === false){
            stopTimer();
        } else {
    
            showingPage = document.querySelector('#question-' + currentQuestion);
            nextPage = document.querySelector('#question-' + (currentQuestion + 1));
            showingPage.style.display = "none";
            nextPage.style.display = "inherit";
            
            if(rightOrWrong === true){
                score += 10;
                currentQuestion++
            } else if(rightOrWrong === false){
                secondsLeft -= 15;
                currentQuestion++
                if(secondsLeft < 0 && minutesLeft > 0){
                    minutesLeft--
                    secondsLeft = secondsLeft + 60; 
                    secondsEl.textContent = secondsLeft;
                    minutesEl.textContent = minutesLeft;
                } else if(secondsLeft <= 0 && minutesLeft <= 0){
                    secondsEl.textContent = "00";
                    minutesEl.textContent = "0";
                    stopTimer()
                    } 
                    
                }
        }
    }

        answerButton.forEach(function(item, index){
            item.addEventListener('click', function(){
                if (this.getAttribute('class').includes( " correct")){
                    nextQuestion(true);
                } else if(this.getAttribute('class').includes( " incorrect")){
                    nextQuestion(false);
                }
        
            })
        });

});

