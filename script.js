
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

let apiQuotes = [];

function newQuote() {
    loading();
    
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    if(!quote.author){
        quoteAuthor.textContent = '- Unknown';    
    } else {
        quoteAuthor.textContent =  `- ${quote.author}`;    
    }
    
    if(quote.text.length > 50) {
        quoteText.classList.add('long-text');
    } else {
        quoteText.classList.remove('long-text');
    }
    quoteText.textContent = quote.text;
    
    complete();
}

// Get quote from API
async function getQuote(){
    loading();
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(e) {
        // getQuote();        
        console.log('Oops no quote!!! ',e);
    }
}

getQuote();

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;

    open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// function newQuote() {
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

// newQuote();

