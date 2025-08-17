// Array of quotes
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Knowledge is power.", category: "Wisdom" }
];

// Function to display a random quote
function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  document.getElementById("quoteDisplay").innerText = randomQuote.text;
  document.getElementById("quoteCategory").innerText = `Category: ${randomQuote.category}`;
}

// Function to create a form for adding quotes dynamically
function createAddQuoteForm() {
  let formContainer = document.getElementById("formContainer");

  let form = document.createElement("form");

  let quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";
  quoteInput.required = true;

  let categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter category";
  categoryInput.required = true;

  let submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.innerText = "Add Quote";

  form.appendChild(quoteInput);
  form.appendChild(categoryInput);
  form.appendChild(submitBtn);
  formContainer.appendChild(form);

  // Add submit event listener
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let newQuote = {
      text: quoteInput.value,
      category: categoryInput.value
    };

    quotes.push(newQuote);

    alert("New quote added!");

    // Reset inputs
    quoteInput.value = "";
    categoryInput.value = "";
  });
}

// Run when page loads
window.onload = function () {
  createAddQuoteForm();
};

// Event listener for "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
