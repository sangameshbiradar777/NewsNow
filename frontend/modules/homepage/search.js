// Get the search form from DON
const searchFormElement = document.querySelector(".navbar__search-container");

// Get the search input from DOM
const searchElement = document.querySelector('[name="search-text"]');

// Get the search button from DOM
const searchBtn = document.querySelector('[type="submit"]');

// Get the clear icon
const clearButton = document.querySelector(".navbar__search__clear-icon");

function addSearchFunctionality() {
  // Prevent default form behavior
  searchFormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchText = searchElement.value;

    window.location.href = `/frontend/pages/search/search-result.html?search=${searchText}`;
  });
}

function clearSearchText() {
  // Hide or show clear button
  searchElement.addEventListener("input", function () {
    if (this.value) {
      clearButton.classList.remove("hide-clear-icon");
      searchBtn.classList.remove("btn--disabled");
    } else {
      clearButton.classList.add("hide-clear-icon");
      searchBtn.classList.add("btn--disabled");
    }
  });

  // clear text on click
  clearButton.addEventListener("click", function () {
    // Clear the search text
    searchElement.value = "";

    // Hide the close icon
    clearButton.classList.add("hide-clear-icon");

    // Focus the search element
    searchElement.focus();

    // Disable search button
    searchBtn.classList.add("btn--disabled");
  });
}

function initSearch() {
  // Add search functionality
  addSearchFunctionality();

  // clear search text
  clearSearchText();
}

export default initSearch;
