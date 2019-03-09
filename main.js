var gameMin = 1
var gameMax = 100
var gameGuess = randomIntBetween(gameMin, gameMax)

$(document).ready(() => {
  gameInit();
  console.log('ready!');
});

function gameInit() {
  $('#user-guess').on('click', makeGuess);
  $('#clear-guess').on('click', clearGuessInput);
  $('#reset-game').on('click', () => {location.reload()});

  $('#clear-guess').prop('disabled', true);
  $('#reset-game').prop('disabled', true);

  $('#user-number').on('keyup', () => {
    if ($('#user-number').val().length != 0) {
      $('#clear-guess').prop('disabled', false);
    } else {
      $('#clear-guess').prop('disabled', true);
    }
  });

  $('#user-number').on('keyup', () => {
    if ($('#user-number').val().length == 0) {
      $('#user-guess').prop('disabled', true);
    } else {
      $('#user-guess').prop('disabled', false);
    }
  });

  $('#guesses').on('DOMNodeInserted', () => {
    $('#reset-game').prop('disabled', false);
  });

  $('#min-guess').on('focusout', () => { gameMin = parseInt($('#min-guess').val()); gameGuess = parseInt(randomIntBetween(gameMin, gameMax)); });
  $('#max-guess').on('focusout', () => { gameMax = parseInt($('#max-guess').val()); gameGuess = parseInt(randomIntBetween(gameMin, gameMax)); });

  gameGuess = randomIntBetween(gameMin, gameMax)
}

function makeGuess() {
  addGuess(getUserGuess());
  clearGuessInput();
  $('#clear-guess').prop('disabled', true);
}

function addGuess(user_guess) {
  reply = checkGuess(user_guess)
  $('#guesses').append('<li>Guess: ' + user_guess + ' | ' + reply + '</li>');
  if (reply === 'BOOM!') {
    newRound();
  }
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

function newRound() {
  alert('You won! The range has now been increased!')

  min = gameMin
  max = gameMax
  resetGame()
  gameMin = min - 10
  gameMax = max + 10

  gameGuess = randomIntBetween(gameMin, gameMax);

  $('#min-guess').val(gameMin)
  $('#max-guess').val(gameMax)
}

function resetGame() {
  $('#guesses').empty();
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
