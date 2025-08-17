// === Dynamic Quote Generator === //

// Load quotes from localStorage if available, otherwise use defaults
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];


// Get DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Create a container for the form
const formContainer = document.createElement("div");
document.body.appendChild(formContainer);

// Feedback area
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

  setTimeout(() => {
    feedback.textContent = "";
  }, 3000);
}

// Function: Add a new quote dynamically
function addQuote() {
  let text = document.getElementById("newQuoteText").value.trim();
  let category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();

    showFeedback("✅ New quote added successfully!", false);

    // Clear form
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    showFeedback("⚠️ Please fill in both fields!");
  }
}

// Function: Dynamically create the Add Quote form
function createAddQuoteForm() {
  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
  `;

  // Attach event listener to the newly created button
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize app
createAddQuoteForm();
showRandomQuote();