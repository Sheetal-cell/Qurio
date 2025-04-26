const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote-btn");

const apiURL = "https://quoteslate.vercel.app/api/quotes/random";

async function getRandomQuote() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    quoteElement.textContent = `"${data.quote}"`;
    authorElement.textContent = `- ${data.author}`;
  } catch (error) {
    console.error("Error fetching the quote:", error);
    quoteElement.textContent = "Sorry, something went wrong. Please try again later.";
    authorElement.textContent = "";
  }
}

newQuoteButton.addEventListener("click", getRandomQuote);
window.onload = getRandomQuote;
