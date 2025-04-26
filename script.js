// script.js
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote-btn");

const apiURL = "https://zenquotes.io/api/random";

// Function to fetch a random quote from ZenQuotes API
async function getRandomQuote() {
    try {
        const response = await fetch(apiURL);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        
        // ZenQuotes API returns an array with the quote and author
        const randomQuote = data[0];
        
        // Update the quote and author in the DOM
        quoteElement.textContent = `"${randomQuote.q}"`;
        authorElement.textContent = `- ${randomQuote.a}`;
    } catch (error) {
        console.error("Error fetching the quote:", error);
        quoteElement.textContent = "Sorry, something went wrong. Please try again later.";
        authorElement.textContent = "";
    }
}

// Event listener for the "New Quote" button
newQuoteButton.addEventListener("click", getRandomQuote);

// Load an initial random quote on page load
window.onload = getRandomQuote;
