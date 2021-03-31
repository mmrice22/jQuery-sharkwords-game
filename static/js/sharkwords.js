const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  //looping over word to get letters in word
  for (const letter of word) {
    //use Jquery and grab the selector, section, with the id = 'word-container'
    //generate divs and append them to the section with the new class of 'letter-box and the letter we looped over
    $('#word-container').append(`<div class="letter-box ${letter}"></div>`);
  };
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  //loop over each letter in ALPHABET
  for (const letter of ALPHABET) {
    //select section with id='letter-buttons
    //create buttons and append the a class named after the letter we just looped over to get
    $('#letter-buttons').append(`<button class="${letter}">${letter}</button>`);
  };
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  //give HTMLElement object 'buttonEL' the attribute 'disabled' and make it true
  //can use .prop('disabled', true) ---> is disabled and true a key/value pair used on the attr method/property?
  //if we wanted to enable it we'd say false instead of true
  $(buttonEl).attr('disabled', true);
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  // if the div has the class of letter, then at index 0 we should get that letter back
  // if the letter is not in the word, then at index 0 we will get undefined
  // return tru if the letter IS NOT undefined; meaning,the letter was there
  return $(`div.${letter}`)[0] !== undefined;
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  //.html(arg) a string of html to set as the content of each matched element
  // this is what is putting the correct letter on the line in the browser
  $(`div.${letter}`).html(letter);
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  // add up and count amount of wrong guesses
  numWrong += 1;
  // select the element with the id 'shark-img img'
  // .attr is changing the attribute src to equal /static/images/guess${numWrong}.png
  $('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);

  // if number of guesses is 5 is true;
  if (numWrong === 5) {
    // then select the button elements and give them the attribute of disabled and true
    $('button').attr('disabled', true);
    // also then select the element with the id 'play-again' and 
    // changes its attribute style (display) from 'none' to 'block'
    //therefore showing the <a>The shark got you, click to play again</a>
    // when the display: 'none', it won't show up for the viewer until the above if statement goes to true
    $('#play-again').css({display: 'block'});
  }
};

//  Reset game state. Called before restarting the game.
//
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {
    const clickedBtn = $(evt.target);
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
  });
})();
