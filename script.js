// Load categories on DOM load
document.addEventListener("DOMContentLoaded", fetchCategories);

// Fetch all available quote categories (tags)
async function fetchCategories() {
  try {
    const response = await fetch("https://api.quotable.io/tags");
    const tags = await response.json();
    const select = document.getElementById("category");

    tags.forEach(tag => {
      const option = document.createElement("option");
      option.value = tag.name;
      option.textContent = tag.name.charAt(0).toUpperCase() + tag.name.slice(1);
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    const select = document.getElementById("category");
    const fallbackOption = document.createElement("option");
    fallbackOption.textContent = "Failed to load categories";
    fallbackOption.disabled = true;
    select.appendChild(fallbackOption);
  }
}

// Filter dropdown based on search input
function filterCategories() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const options = document.getElementById("category").options;

  for (let i = 0; i < options.length; i++) {
    const txt = options[i].text.toLowerCase();
    options[i].style.display = txt.includes(input) ? "" : "none";
  }
}

// Get first quote
async function getQuote() {
  const category = document.getElementById("category").value;
  await fetchAndDisplayQuote(category);
  document.getElementById("another-btn-container").style.display = "block";
}

// Get another quote with same category
async function getAnotherQuote() {
  const category = document.getElementById("category").value;
  await fetchAndDisplayQuote(category);
}

// Fetch quote and display it
async function fetchAndDisplayQuote(category) {
  const url = category ? `https://api.quotable.io/random?tags=${category}` : `https://api.quotable.io/random`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("quote").innerText = `"${data.content}"`;
    document.getElementById("author").innerText = `— ${data.author}`;
  } catch (error) {
    document.getElementById("quote").innerText = "Could not fetch quote.";
    document.getElementById("author").innerText = "";
  }
}

// Copy quote to clipboard
function copyQuote() {
  const quote = document.getElementById("quote").innerText;
  const author = document.getElementById("author").innerText;
  navigator.clipboard.writeText(`${quote}\n${author}`)
    .then(() => alert("Quote copied to clipboard!"))
    .catch(() => alert("Failed to copy quote."));
}

// Share quote on Twitter
function shareQuote() {
  const quote = document.getElementById("quote").innerText;
  const author = document.getElementById("author").innerText;
  const tweet = `${quote} ${author}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
  window.open(twitterUrl, '_blank');
}

// Download quote as styled image
function downloadQuote() {
  const quoteBox = document.getElementById("quote-box");

  html2canvas(quoteBox).then(canvas => {
    const link = document.createElement("a");
    link.download = "quote.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
