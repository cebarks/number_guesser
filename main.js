var gameMax = 100
var gameMin = 1
var gameGuess = 0

$(document).ready(function() {
  gameInit();

  console.log( 'ready!' );
});

function gameInit() {
  $('#user-guess').on('click', makeGuess);
  $('#clear-guess').on('click', clearGuessInput);
  $('#reset-game').on('click', () => {location.reload();});


  gameGuess = randomIntBetween(gameMin, gameMax)
}

function makeGuess() {
  addGuess(getUserGuess());
  clearGuessInput();
}

function addGuess(user_guess) {
  $('#guesses').append('<li>Guess: ' + user_guess + ' | ' + checkGuess(user_guess) + '</li>');
}

function checkGuess(user_guess) {
  var guess = parseInt(user_guess);

  if (guess > gameGuess) {
    return 'That is too high';
  } else if (guess < gameGuess) {
    return 'That is too low';
  } else if (guess === gameGuess) {
    return 'BOOM!';
  } else {
    return 'Something went wrong.';
  }
}

function getUserGuess() {
  return $('#user-number').val();
}

function clearGuessInput() {
  $('#user-number').val('');
}

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
