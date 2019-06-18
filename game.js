var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isGameStarted = false;

$(document).on("keypress", function() {
  if(isGameStarted == false){
    isGameStarted = true;
    nextSequence();
  }
});

$(".btn").on("click", function() {
 var userChosenColour = $(this).attr("id");
 // console.log(userChosenColour);
 userClickedPattern.push(userChosenColour);
 playSound(userChosenColour);
 animatePress(userChosenColour);
 checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  //console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(125).fadeIn(125);
  playSound(randomChosenColor);

}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("correct");

    if(userClickedPattern.length == gamePattern.length){

      setTimeout(function() {
        nextSequence();
      },1000);
    }
  }else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("GAMEOVER! Press any key to restart");
    startOver();
  }
}

function playSound(name){
  var colorSound = new Audio('sounds/' + name + '.mp3');
  colorSound.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  isGameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}
