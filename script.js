let selectedCategory = ""; // Variable to store the current selected category
const categoryDropdown = document.getElementById("category-dropdown");
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote-btn");
const randomButton = document.getElementById("random-btn");
const categoryButton = document.getElementById("category-btn");
const categorySection = document.getElementById("category-section");

const apiURL = "https://quoteslate.vercel.app/api/quotes/random";

// Fetch a random quote
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

// Fetch a quote from the local JSON by category
async function getCategoryQuote(category) {
  try {
    const response = await fetch("quotes.json");
    const data = await response.json();
    const quotesArray = data[category];

    if (quotesArray && quotesArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotesArray.length);
      const randomQuote = quotesArray[randomIndex];
      quoteElement.textContent = `"${randomQuote}"`;
      authorElement.textContent = `- Local Quote (${category})`;
    } else {
      quoteElement.textContent = "No quotes found for this category.";
      authorElement.textContent = "";
    }
  } catch (error) {
    console.error("Local fetch error:", error);
    quoteElement.textContent = "Error loading local quotes.";
    authorElement.textContent = "";
  }
}

// Event listener for random quote button
randomButton.addEventListener("click", () => {
  selectedCategory = ""; // Reset category
  categorySection.style.display = "none"; // Hide category dropdown
  getRandomQuote(); // Show random quote
});

// Event listener for category button to show category dropdown
categoryButton.addEventListener("click", () => {
  categorySection.style.display = "block"; // Show category dropdown
});

// Event listener for category selection change
categoryDropdown.addEventListener("change", (event) => {
  selectedCategory = event.target.value;
  if (selectedCategory) {
    getCategoryQuote(selectedCategory); // Fetch quote from the selected category
  } else {
    quoteElement.textContent = "Please select a category.";
    authorElement.textContent = "";
  }
});

// Handle New Quote button click
newQuoteButton.addEventListener("click", () => {
  if (selectedCategory) {
    // If category is selected, fetch a new quote from that category
    getCategoryQuote(selectedCategory);
  } else {
    // Display a message to select a category if none is selected
    quoteElement.textContent = "Please select a category to get a quote.";
    authorElement.textContent = "";
  }
});

// Initial random quote on page load
window.onload = getRandomQuote;
