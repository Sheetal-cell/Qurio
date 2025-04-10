// const quotes = [
//     "The best way to get started is to quit talking and begin doing. – Walt Disney",
//     "Don't let yesterday take up too much of today. – Will Rogers",
//     "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. – Winston Churchill",
//     "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
//     "Believe you can and you're halfway there. – Theodore Roosevelt",
//     "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt"
// ];


const quoteText = document.getElementById("quote");
const newQuoteButton = document.getElementById("newQuote");
const authorText = document.getElementById("author");
const tweetButton = document.getElementById("tweetQuote");
const copyButton = document.getElementById("copyQuote");
const copyMessage = document.getElementById("copyMessage");

// function generateQuote() {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     quoteText.innerText = quotes[randomIndex];

// }


async function fetchQuote() {

    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        quoteText.innerText = `"${data.content}"`;
        authorText.innerText = `_ ${data.author}`;

        // Update Twitter share link
        tweetButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.content + " — " + data.author)}`

        // Hide copy message when a new quote is generated
        copyMessage.style.display = "none"
    } catch (error) {
        quoteText.innerText = "Failed to fetch quote. Try again!";
        authorText.innerText = "";
        console.error("Error fetching quote:", error);
    }

}

// copy quote to clipboard
function copyToClipboard() {
    const textToCopy = `${quoteText.innerText} ${authorText.innerText}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        copyMessage.innerText = "Quote copied!";
        copyMessage.style.display  ="block";
        setTimeout(() => {
            copyMessage.style.display = "none";
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
}

// Load a quote when the page loads
window.addEventListener("load", fetchQuote);


// load a new quote when the button is clicked
newQuoteButton.addEventListener("click", fetchQuote);

// Copy the quote when the button is clicked
copyButton.addEventListener("click", copyToClipboard);