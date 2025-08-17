// ================================
// Dynamic Quote Generator
// ================================

// Initial quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Resilience" }
];

// Restore last filter
let lastFilter = localStorage.getItem("lastFilter") || "all";

// ================================
// DOM Elements
// ================================
const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");

// ================================
// Display a random quote
// ================================
function displayRandomQuote() {
  let filtered = quotes;
  if (lastFilter !== "all") {
    filtered = quotes.filter(q => q.category === lastFilter);
  }

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  quoteDisplay.textContent = `"${filtered[randomIndex].text}" — ${filtered[randomIndex].category}`;
}

// ================================
// Populate categories dynamically
// ================================
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    if (cat === lastFilter) option.selected = true;
    categoryFilter.appendChild(option);
  });
}

// ================================
// Filter quotes by category
// ================================
function filterQuotes() {
  lastFilter = categoryFilter.value;
  localStorage.setItem("lastFilter", lastFilter);
  displayRandomQuote();
}

// ================================
// Add new quote + post to server
// ================================
async function createAddQuoteForm() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    const newQuote = { text, category };

    // Add locally
    quotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();
    displayRandomQuote();

    // Post to mock server (simulation)
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuote)
      });
      const result = await response.json();
      console.log("Posted to server:", result);
      notifyUser("New quote added & synced with server!");
    } catch (error) {
      console.error("Error posting to server:", error);
      notifyUser("Quote saved locally (server sync failed).");
    }
  }
}

// ================================
// Export quotes as JSON file
// ================================
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
  notifyUser("Quotes exported successfully!");
}

// ================================
// Server Sync + Conflict Resolution
// ================================
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverQuotes = await response.json();

    // simulate quotes from server (first 10)
    return serverQuotes.slice(0, 10).map(post => ({
      text: post.title,
      category: "Server"
    }));
  } catch (error) {
    console.error("Error fetching from server:", error);
    return [];
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Merge with conflict resolution: server wins
  const mergedQuotes = [
    ...serverQuotes,
    ...localQuotes.filter(local =>
      !serverQuotes.some(server => server.text === local.text)
    )
  ];

  localStorage.setItem("quotes", JSON.stringify(mergedQuotes));
  quotes = mergedQuotes;
  populateCategories();
  displayRandomQuote();
  notifyUser("Quotes synced with server (server takes precedence).");
}

// Run sync every 30s
setInterval(syncQuotes, 30000);

// ================================
// Notification system
// ================================
function notifyUser(message) {
  const note = document.getElementById("notification");
  if (!note) return;
  note.textContent = message;
  note.style.color = "green";
  setTimeout(() => (note.textContent = ""), 4000);
}

// ================================
// Initialize on page load
// ================================
window.onload = () => {
  populateCategories();
  displayRandomQuote();
};
