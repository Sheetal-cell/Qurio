// Fetch a quote by category (tag) from ZenQuotes API
function fetchQuoteByCategory(category) {
    const url = `https://zenquotes.io/api/quotes?tag=${category}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data); // Debugging step: log the API response
        if (data && data.length > 0) {
          const quote = data[0].q;  // The quote text
          const author = data[0].a; // The author of the quote
  
          // Display the quote and author
          document.getElementById('quoteText').textContent = `"${quote}"`;
          document.getElementById('quoteAuthor').textContent = `— ${author}`;
        } else {
          // Handle empty response
          document.getElementById('quoteText').textContent = "No quotes available for this category.";
          document.getElementById('quoteAuthor').textContent = "";
        }
      })
      .catch(error => {
        console.error('Error fetching quote by category:', error);
        document.getElementById('quoteText').textContent = "Error fetching quote.";
        document.getElementById('quoteAuthor').textContent = "";
      });
  }
  
  // Event listener to fetch a quote when the "Get Another Quote" button is clicked
  document.getElementById('getQuoteButton').addEventListener('click', () => {
    const category = document.getElementById('categorySelect').value; // Get the selected category
    fetchQuoteByCategory(category); // Fetch the quote based on the selected category
  });
  
  // Event listener for the "Copy Quote" button
  document.getElementById('copyQuoteButton').addEventListener('click', () => {
    const quoteText = document.getElementById('quoteText').textContent;
    navigator.clipboard.writeText(quoteText)
      .then(() => alert('Quote copied to clipboard!'))
      .catch(err => console.error('Error copying quote:', err));
  });
  
  // Event listener for the "Share Quote" button (opens the share dialog)
  document.getElementById('shareQuoteButton').addEventListener('click', () => {
    const quoteText = document.getElementById('quoteText').textContent;
    const quoteAuthor = document.getElementById('quoteAuthor').textContent;
    const shareText = `"${quoteText}" ${quoteAuthor}`;
  
    // Check if the Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: 'Inspirational Quote',
        text: shareText,
        url: window.location.href
      })
      .then(() => console.log('Quote shared successfully'))
      .catch(err => console.error('Error sharing quote:', err));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Web Share API is not supported in your browser. You can manually copy or share the quote.");
    }
  });
  
  // Event listener for the "Download Quote" button (downloads as text file)
  document.getElementById('downloadQuoteButton').addEventListener('click', () => {
    const quoteText = document.getElementById('quoteText').textContent;
    const authorText = document.getElementById('quoteAuthor').textContent;
    const quoteContent = `${quoteText}\n\n${authorText}`;
  
    const blob = new Blob([quoteContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'quote.txt';
    link.click();
  });
  
  // Initial fetch of a random quote on page load
  document.addEventListener('DOMContentLoaded', () => fetchQuoteByCategory('inspire'));
  