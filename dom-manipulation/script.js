// === Dynamic Quote Generator === //

// Load quotes from localStorage OR use defaults
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

// Get DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// Create a complaint/feedback area dynamically
let feedback = document.createElement("p");
feedback.id = "feedback";
feedback.style.color = "red";
document.body.appendChild(feedback);

// Helper: Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function: Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }

  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <blockquote>"${randomQuote.text}"</blockquote>
    <p><em>- Category: ${randomQuote.category}</em></p>
  `;
}

// Function: Show feedback (complain/success)
function showFeedback(message, isError = true) {
  feedback.textContent = message;
  feedback.style.color = isError ? "red" : "green";
  
  // Auto-hide after 3s
  setTimeout(() => {
    feedback.textContent = "";
  }, 3000);
}

// Function: Add a new quote dynamically
function addQuote() {
  let text = newQuoteText.value.trim();
  let category = newQuoteCategory.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // persist

    // Feedback
    showFeedback("✅ New quote added successfully!", false);

    // Clear form
    newQuoteText.value = "";
    newQuoteCategory.value = "";
  } else {
    showFeedback("⚠️ Please fill in both fields!");
  }
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Show one quote on initial load
showRandomQuote();