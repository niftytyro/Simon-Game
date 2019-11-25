function react(event) {
  tile = event.currentTarget;

  flash(tile);
  play_sound(tile);
  if(tile.classList.contains("red")) {
    user_sequence[user_sequence.length] = 1;
  }
  else if(tile.classList.contains("blue")) {
    user_sequence[user_sequence.length] = 2;
  }
  else if(tile.classList.contains("yellow")) {
    user_sequence[user_sequence.length] = 3;
  }
  else if(tile.classList.contains("green")) {
    user_sequence[user_sequence.length] = 4;
  }
  if(!matchSequence()) {
    game_end();
  }
  else{
    if(user_sequence.length == sequence.length) {
      score += 1;
      document.querySelector(".score").innerHTML = "Score: " + score;
      setTimeout( function() {
        nextSequence();
      }, 1000);
      user_sequence = [];
    }
  }
}

function flash(tile) {
  tile.classList.add("flash");
  setTimeout( function() {
    tile.classList.remove("flash");
  }, 500);
}

function play_sound(tile) {
  if(tile.classList.contains("red")) {
    red_sound.play();
  }
  else if(tile.classList.contains("blue")) {
    blue_sound.play();
  }
  else if(tile.classList.contains("yellow")) {
    yellow_sound.play();
  }
  else if(tile.classList.contains("green")) {
    green_sound.play();
  }
}

function matchSequence() {
  if(user_sequence[user_sequence.length-1] == sequence[user_sequence.length-1]) {
    return true;
  }
  else {
    return false;
  }
}

function nextSequence () {
	sequence.push(Math.floor(Math.random()*4) + 1);
  if(sequence[sequence.length-1] == 1) {
    flash(red);
    play_sound(red);
  }
  else if(sequence[sequence.length-1] == 2) {
    flash(blue);
    play_sound(blue);
  }
  else if(sequence[sequence.length-1] == 3) {
    flash(yellow);
    play_sound(yellow);
  }
  else if(sequence[sequence.length-1] == 4) {
    flash(green);
    play_sound(green);
  }
}

function game_end() {
  sequence = [];
  user_sequence = [];
  start = false;
  score = 0;
  wrong_sound.play();
  document.querySelector(".sub-head").innerHTML = "You Lost! Touch Anywhere to Restart.";
  setTimeout(function() {
    document.addEventListener("click", prepare_game)
  }, 1000);
  red.removeEventListener("click", react);
  blue.removeEventListener("click", react);
  yellow.removeEventListener("click", react);
  green.removeEventListener("click", react);
}

function start_game() {
  document.removeEventListener("click", prepare_game);
  document.querySelector(".sub-head").innerHTML = "Let's Test Your Memory!";
  document.querySelector(".score").innerHTML = "Score:  " + score;
  setTimeout(function() {nextSequence();}, 500);
  red.addEventListener("click", react);
  blue.addEventListener("click", react);
  yellow.addEventListener("click", react);
  green.addEventListener("click", react);
}

function prepare_game() {
  if(!start) {
    start = true;
    start_game();
  }
}

var sequence = [];
var user_sequence = [];
var start = false;
var score = 0;
var red = document.querySelector(".red");
var red_sound = new Audio("sounds/red.mp3");
var blue = document.querySelector(".blue");
var blue_sound = new Audio("sounds/blue.mp3");
var yellow = document.querySelector(".yellow");
var yellow_sound = new Audio("sounds/yellow.mp3");
var green = document.querySelector(".green");
var green_sound = new Audio("sounds/green.mp3");
var wrong_sound = new Audio("sounds/wrong.mp3");
document.addEventListener("click", prepare_game);
