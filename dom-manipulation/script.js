// Quotes Array: each quote is an object with text and category
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" }
];

// Select DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categorySelect = document.getElementById("categorySelect");

/**
 * showRandomQuote
 * Displays a random quote (optionally filtered by category)
 */
function showRandomQuote() {
  let selectedCategory = categorySelect.value;

  let filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(quote => quote.category.toLowerCase() === selectedCategory.toLowerCase());

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<em>No quotes found in this category.</em>";
    return;
  }

  let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.innerHTML = `"${filteredQuotes[randomIndex].text}" — <strong>${filteredQuotes[randomIndex].category}</strong>`;
}

/**
 * addQuote
 * Adds a new quote and updates category options
 */
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please enter both quote text and category.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });

  if (![...categorySelect.options].some(option => option.value.toLowerCase() === newCategory.toLowerCase())) {
    const newOption = document.createElement("option");
    newOption.value = newCategory;
    newOption.textContent = newCategory;
    categorySelect.appendChild(newOption);
  }

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}

/**
 * createAddQuoteForm
 * Dynamically creates a form for adding new quotes
 */
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize categories dropdown
(function populateCategories() {
  let categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
})();

// Call the function to create the form dynamically
createAddQuoteForm();