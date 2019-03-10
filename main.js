// Comments are above their respective lines

// Sets game defaults
var gameMin = 1;
var gameMax = 100;
var gameGuess = 50;

// Waits for document ready
$(document).ready(() => {
  // Calls gameinit function
  gameInit();

  // Prints 'ready!' to the console when all callbacks are set
  console.log('ready!');
});

function gameInit() {
  // adds onClick callbacks to buttons
  $('#user-guess').on('click', makeGuess);
  $('#clear-guess').on('click', clearGuessInput);
  $('#reset-game').on('click', () => {location.reload()});

  // disables 'clear' and 'reset game' buttons at load
  $('#clear-guess').prop('disabled', true);
  $('#reset-game').prop('disabled', true);

  // disables 'clear' button when user-guess field is not empty
  $('#user-number').on('keyup', () => {
    if ($('#user-number').val().length != 0) {
      $('#clear-guess').prop('disabled', false);
    } else {
      $('#clear-guess').prop('disabled', true);
    }
  });

  // disables 'guess' button when user-guess field is empty
  $('#user-number').on('keyup', () => {
    if ($('#user-number').val().length == 0) {
      $('#user-guess').prop('disabled', true);
    } else {
      $('#user-guess').prop('disabled', false);
    }
  });

  // enables 'reset game' button when ul#guesses gets children
  $('#guesses').on('DOMNodeInserted', () => {
    $('#reset-game').prop('disabled', false);
  });

  // updates gameMin to new value when input box is changed
  $('#min-guess').on('focusout', () => { gameMin = parseInt($('#min-guess').val()); gameGuess = parseInt(randomIntBetween(gameMin, gameMax)); });
  // updates gameMax to new value when input box is changed
  $('#max-guess').on('focusout', () => { gameMax = parseInt($('#max-guess').val()); gameGuess = parseInt(randomIntBetween(gameMin, gameMax)); });

  // generates number to guess between gameMin and gameMax
  gameGuess = randomIntBetween(gameMin, gameMax);
}

function makeGuess() {
  addGuess(getUserGuess());

  clearGuessInput();

  $('#clear-guess').prop('disabled', true);
}

function addGuess(user_guess) {
  // check guess against goal number
  reply = checkGuess(user_guess);

  // add guess to ul#guesses list
  $('#guesses').append('<li>Guess: ' + user_guess + ' | ' + reply + '</li>');

  // if player got it right, start new round.
  if (reply === 'BOOM!') {
    newRound();
  }
}

function checkGuess(user_guess) {
  // turn the guess into an integer
  var guess = parseInt(user_guess);

  // scold player if guess was out of bounds.
  if (guess < gameMin || guess > gameMax) {
    return 'Your guess was out of bounds. Please try harder next time.'
  }

  if (guess > gameGuess) {
    // if guess was too high, tell them
    return 'That is too high';
  } else if (guess < gameGuess) {
    // if guess was too low, tell them
    return 'That is too low';
  } else if (guess === gameGuess) {
    // if guess was correct, tell them
    return 'BOOM!';
  } else if (guess === NaN) {
    //if they submitted not a number, tell them
    return 'Your guess was not a number (NaN).';
  }
}

function newRound() {
  // pop up alert that player won a round
  alert('You won! The range has now been increased!')

  //remove all guesses from guess list
  $('#guesses').empty();

  //increase range by 10 in each direciton
  gameMin = gameMin - 10
  gameMax = gameMax + 10

  //generate new target guess number inbetween the new, now increased range.
  gameGuess = randomIntBetween(gameMin, gameMax);

  //update range input boxes to updated values
  $('#min-guess').val(gameMin)
  $('#max-guess').val(gameMax)
}

// returns the values of the user-guess input field
function getUserGuess() {
  return $('#user-number').val();
}


function clearGuessInput() {
  // resets guess input box
  $('#user-number').val('');

  // disables 'clear' button
  $('#clear-guess').prop('disabled', true);

  // disables 'guess' button
  $('#user-guess').prop('disabled', true);
}

// generates a random integer between *min* and *max*
function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
