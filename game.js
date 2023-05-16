var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern =[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber =Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio(name+ ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

var level=0;

$("button").click(function(){
    if(gamePattern.length ==0){
        $("h1").text("Level "+level);
        nextSequence();
    }

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
       if(userClickedPattern.length == gamePattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);
       }
    }
    else{
        var audioNew = new Audio("wrong.mp3");
        audioNew.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("h1").text("Game Over, Press button for New Game");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level =0;
}