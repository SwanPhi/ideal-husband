var buttonColours = ["red","blue","green","yellow"]; //array of button
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$("#level-title").text("Press A Key To Start");
$(document).keydown(function(event){
  if (!started) {
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true; //game has started, so more keydown effect
  }
});

//when user clicked on a button
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id"); //this, it means .btn
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  //console.log(userClickedPattern);
  animatePress(userChosenColour);
  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1); //check answer at current level
});
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function(){  //go to next level if everything is correct
        nextSequence();
      },1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $(".btn").slideUp().slideDown();
    $("#level-title").text("Game Over, press an key to restart.");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];//reset user clicked pattern to empty and record the pattern all over again each sequence
  level++;
  $("#level-title").text("Level "+(level));

  var randomNum = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
    //console.log(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //$("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });   alternative
    playSound(randomChosenColour);


}
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
},100); //delay the removeClass
}
