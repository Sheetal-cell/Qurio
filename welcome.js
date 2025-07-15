const taglineText = "Your daily dose of inspiration";
let i = 0;

function typeTagline() {
  if (i < taglineText.length) {
    document.getElementById("tagline").innerHTML += taglineText.charAt(i);
    i++;
    setTimeout(typeTagline, 70);
  }
}

window.onload = typeTagline;
