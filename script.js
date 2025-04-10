async function getQuote() {
    const category = document.getElementById("category").value;
    const url = `https://api.quotable.io/random?tags=${category}`;

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