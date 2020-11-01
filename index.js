var buttonColors = ['green', 'red', 'yellow', 'blue'];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function playSound(name) {
    var audio=  new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setInterval(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);
    var randomNumber =  Number(Math.floor(Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

function checkAnswer(currentLevel) { 
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("True");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3")
        audio.play();
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text("Game Over, Press Any Key to Restart.")
        startOver();
    }
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

// Starting the Game:
$(document).keypress(function() {
    if(!started) {
        $('#level-title').text("Level " + level);
        nextSequence();
        started = true;
    }
})

