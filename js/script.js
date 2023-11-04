const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';

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
 */
const handleNewQuote = async () => {

  const quoteInputElement = document.getElementById('quoteInput');
  const quoteDisplayElement = document.getElementById('quoteDisplay');

  quoteInputElement.value = '';

  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = quote;
}

/**
 * We are triggering the handleNewQuote function in order to populate the quote default value
 */
handleNewQuote();