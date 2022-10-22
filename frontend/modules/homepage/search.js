// Get the search form from DON
const searchFormElement = document.querySelector(".navbar__search-container");

// Get the search input from DOM
const searchElement = document.querySelector('[name="search-text"]');

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
    } else {
      clearButton.classList.add("hide-clear-icon");
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
  });
}

function changeOnFocus() {
  searchElement.addEventListener("focus", function () {
    searchFormElement.classList.add("navbar-search-focus");
  });

  searchElement.addEventListener("blur", function () {
    searchFormElement.classList.remove("navbar-search-focus");
  });
}

function focusOnFormClick() {
  searchFormElement.addEventListener('click', function() {
    searchElement.focus();
  })
}

function initSearch() {
  // Add search functionality
  addSearchFunctionality();

  // clear search text
  clearSearchText();

  // Change visuals on focus
  changeOnFocus();

  // Focus on form click
  focusOnFormClick();
}

export default initSearch;
