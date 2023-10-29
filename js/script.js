const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';


function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
  .then(response => response.json())
  .then(data => data.content);
}

async function handleNewQuote() {
  const quoteInputElement = document.getElementById('quoteInput');
  quoteInputElement.value = null;
  const elm = document.getElementById('quoteDisplay');
  
  const quote = await getRandomQuote();

  elm.innerHTML = quote;
}

handleNewQuote();