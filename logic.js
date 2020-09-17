var timer = document.querySelector('#timer');
var minutesEl = document.querySelector("#minutes");
var secondsEl = document.querySelector("#seconds");
var introText = document.querySelector('#intro-text');
var timeUpMessage = document.querySelector("#time-up");
var startButton = document.querySelector("#start-button");
var answerButton = document.querySelectorAll(".answer");
var correctAnswer = document.querySelectorAll('.correct');
var incorrectAnswer = document.querySelectorAll('.incorrect');
var finalContainer = document.querySelector('#final-container');
var scoreList = document.querySelector('#score-list');
var saveButton = document.querySelector('#save-button');
var correctIncorrectText = document.querySelector('#correct-or-incorrect');
var showingPage;
var nextPage;
var question1 = document.querySelector('#question-1');
var secondsLeft = 30;
var minutesLeft = 2;
var currentQuestion = 1;
var score = 0;
var savedScoreArray;


minutesEl.textContent = minutesLeft;
secondsEl.textContent = secondsLeft;

startButton.addEventListener('click', function(){
    introText.style.display = "none";
    startButton.style.display = "none";
    question1.style.display = "inherit";
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
        var savedName = document.querySelector('#initials').value;
        var savedScore = score;
        savedScoreArray.push([savedName, savedScore]);
        localStorage.setItem("Person", savedScoreArray);
        timeUpMessage.style.display = "none";
        finalContainer.style.display = "none";
        renderScores();
    });

    function renderScores(){
        if(localStorage.getItem('Person') === null){
        } else {
            savedScoreArray = localStorage.getItem('Person');
            savedScoreArray = savedScoreArray.split(',');
            console.log(savedScoreArray);
            scoreList.innerHTML = "";
            for (var i = 0; i < savedScoreArray.length; i = i + 2){
                var name = savedScoreArray[i];
                var score = savedScoreArray[i + 1];
                var li = document.createElement('li');
                li.textContent = name + " : " + score;
                scoreList.append(li);
            }
        }

    }

    function stopTimer(){
        showingPage = document.querySelector('#question-' + currentQuestion);
        showingPage.style.display = "none";
        score = score + .5 * (secondsLeft + (minutesLeft * 60));
        finalContainer.style.display = "block";
        timeUpMessage.textContent = "Your Score: " + score;
        timer.style.display = "none";
        clearInterval(quizTimer);
        renderScores();

        
    }

    function nextQuestion(rightOrWrong){

        if(currentQuestion === 15 && rightOrWrong === true){
            score += 10;
            stopTimer();
            correctIncorrectText.textContent = "Correct!";
            setTimeout(function(){
                correctIncorrectText.textContent = "";
            }, 1000);
        } else if(currentQuestion === 15 && rightOrWrong === false){
            setTimeout(function(){
            correctIncorrectText.textContent = "Inorrect!";
            correctIncorrectText.textContent = "";
            }, 1000);

            stopTimer();
        } else {
    
            showingPage = document.querySelector('#question-' + currentQuestion);
            nextPage = document.querySelector('#question-' + (currentQuestion + 1));
            showingPage.style.display = "none";
            nextPage.style.display = "inherit";
            
            if(rightOrWrong === true){
                score += 10;
                currentQuestion++
                correctIncorrectText.textContent = "Correct!";
                setTimeout(function(){
                    correctIncorrectText.textContent = "";
                }, 1000);
            } else if(rightOrWrong === false){
                secondsLeft -= 15;
                if(secondsLeft < 0 && minutesLeft > 0){
                    secondsLeft = secondsLeft + 60; 
                    minutesLeft--;
                    secondsEl.textContent = secondsLeft;
                    minutesEl.textContent = minutesLeft;
                } else if(secondsLeft <= 0 && minutesLeft <= 0){
                    secondsLeft = 0;
                    minutesLeft = 0;
                    secondsEl.textContent = "00";
                    minutesEl.textContent = "0";
                    nextPage.style.display = "none";
                    stopTimer()
                    } 
                currentQuestion++
                correctIncorrectText.textContent = "Incorrect";
                setTimeout(function(){
                    correctIncorrectText.textContent = "";
                }, 1000);    
                    
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

