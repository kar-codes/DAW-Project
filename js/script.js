const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';

const timerElement = document.getElementById('timer');
const quoteInputElement = document.getElementById('quoteInput');
const quoteDisplayElement = document.getElementById('quoteDisplay');

/**
 * I use fetch to let it know that i will receive a promise, in the first .then i receive the response of the promise
 * but it can't be interpreted so I use .json() which is a method from fetch that allows me to convert the response 
 * of the promise into a json file, and json() generates a promise.
 * The last .then is where i get the response to the last promise i had where i can access a certain part of the object in this case 
 * i want to access content, so i look for content using .content inside of the response to the promise.
 * @returns Promise<any>
 */
const getRandomQuote = () => fetch(RANDOM_QUOTE_API_URL)
  .then(requestResponse => requestResponse.json())
  .then(body => body.content);

/**
 * Here i used arrow functions, this is the same as saying async function handleNewQuote () { return }, but 
 * i don't have to use return because s....
 * what await does it let it know that we will store in quote whatever response we get from getRandomQuote,
 * but we might have to wait to get that response. We can always use await with async functions but we don't NEED to use await all the time.
 * quote.split() method allows me to say what i want to splint on, if i pass it an empty string then its going to convert the string
 * to an array where each individual character is one element in that array. And i loop over the array with .forEach(character => {})
 * If we inspect it we will see that each character will be displayed in an individual span so that we can apply individual colors to each letter.
 *
 */

const newQuoteButton = document.getElementById('newQuoteButton');
newQuoteButton.addEventListener('click', handleNewQuote = async () => {
  
    quoteInputElement.value = '';
    quoteDisplayElement.innerHTML = '';

    const quote = await getRandomQuote();
  
    quote.split('').forEach(character => {
      const characterSpan = document.createElement('span');
      characterSpan.innerText = character;
      quoteDisplayElement.appendChild(characterSpan);
    });

});


/**
 * Here I add an event listener so that it saved whenever a change occurs in the input.
 */
quoteInputElement.addEventListener('input', () => {
  const quoteArray = quoteDisplayElement.querySelectorAll('span');
  const valueArray = quoteInputElement.value.split('');
  if(!startTime) {
    startTimer();
  }

    quoteArray.forEach((characterSpan, index) => {
    const character = valueArray[index];

    characterSpan.classList.remove('correct');
    characterSpan.classList.remove('incorrect');

    if(!character) {
      return;
    }

    characterSpan.classList.add(character === characterSpan.innerText ? 'correct' : 'incorrect');

    const elementsArray = Array.from(quoteArray);
    const allCorrect = elementsArray.every(characterSpan => characterSpan.classList.contains('correct'));
    // If all the Span elements contain the Class "correct", we should end the game
    if(allCorrect) {
      endGame(); 
    }
  });
});

//I create a function to handle the timer

let timerInterval, startTime;
const startTimer = () =>  {
  timerElement.innerText = 0;
  startTime = new Date();

  timerInterval = setInterval(() => {
    timer.innerText = Math.floor((new Date() - startTime) / 1000);
  }, 1000);
}

const endGameMessage = document.getElementById('endGameMessage');
endGameMessage.style.display= 'none'; 

//I created a button that replaces the old one so that when the game finishes
//you can just press that button and generate a new quote and unhide the hidden divs
//simultaneously hiding the divs that are shown in the endGame

const refreshButton = document.getElementById('refreshButton');
refreshButton.style.display= 'none';

refreshButton.addEventListener('click', reload = () => {
  location.reload();
});
//When it detects that all the spans are correct the game will end
//it will then hide the input and quote display and give us a message.
const endGame = () => {

  clearInterval(timerInterval);
  endGameMessage.style.display='block';
  refreshButton.style.display='block';
  quoteDisplayElement.style.display='none';
  quoteInputElement.style.display='none';
  newQuoteButton.style.display='none';
  endGameMessage.innerText = "Good job on completing the test, you can see how long it took you to complete it at the top.";

};



/**
 * We are triggering the handleNewQuote function in order to populate the quote default value
 */
handleNewQuote();