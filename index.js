var gamePatern = [];
var userClickedPattern = [];

var buttonColors = ["red", "green", "yellow", "blue"];

var level = 0;
$("#level-title").text = "level 0";

var started = false;
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    console.log(randomColor);

    gamePatern.push(randomColor);

    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);


}


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePatern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");
        console.log(gamePatern);
        console.log(userClickedPattern);
        if(gamePatern.length === userClickedPattern.length){
            console.log("sequence matched");
            setTimeout(function(){
                nextSequence();
            }, 500);
            userClickedPattern = []
        }
    }
    else{
        console.log("failure");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
    }
}