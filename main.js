var gameMax = 100
var gameMin = 1
var gameGuess = 0

$(document).ready(() => {
  gameInit();
  console.log('ready!');
});

function gameInit() {
  $('#user-guess').on('click', makeGuess);
  $('#clear-guess').on('click', clearGuessInput);
  $('#reset-game').on('click', () => {location.reload();});

  $('#clear-guess').prop('disabled', true);
  $('#reset-game').prop('disabled', true);

  $('#user-number').on('keyup', () => {
    if ($('#user-number').val().length != 0) {
      $('#clear-guess').prop('disabled', false);
    } else {
      $('#clear-guess').prop('disabled', true);
    }
  });

  $('#guesses').bind('DOMNodeInserted', () => {
    $('#reset-game').prop('disabled', false);
  });

  $('#user-number').on('keyup', () => {
    if ($('#user-number').val().length == 0) {
      $('#user-guess').prop('disabled', true);
    } else {
      $('#user-guess').prop('disabled', false);
    }
  });

  gameGuess = randomIntBetween(gameMin, gameMax)
}

function makeGuess() {
  addGuess(getUserGuess());
  clearGuessInput();
  $('#clear-guess').prop('disabled', true);
}

function addGuess(user_guess) {
  $('#guesses').append('<li>Guess: ' + user_guess + ' | ' + checkGuess(user_guess) + '</li>');
}

function checkGuess(user_guess) {
  var guess = parseInt(user_guess);

  if (guess < gameMin || guess > gameMax) {
    return 'Your guess was out of bounds.'
  }

  if (guess > gameGuess) {
    return 'That is too high';
  } else if (guess < gameGuess) {
    return 'That is too low';
  } else if (guess === gameGuess) {
    return 'BOOM!';
  } else if (guess === NaN) {
    return 'Your guess was not a number (NaN).';
  }
}

function getUserGuess() {
  return $('#user-number').val();
}

function clearGuessInput() {
  $('#user-number').val('');
  $('#clear-guess').prop('disabled', true);
  $('#user-guess').prop('disabled', true);
}

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
