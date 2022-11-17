// Get the search form from DON
const searchFormElements = document.querySelectorAll(".search-form");

// Get the search input from DOM
const searchElements = document.querySelectorAll('[name="search-text"]');

// Get navbar search element
const navbarSearchElement = searchElements[0];

// Get the clear icon
const clearButtons = document.querySelectorAll(".search__clear-icon");

// Get the navbar Search clear button
const navbarSearchClearBtn = document.querySelector(
  ".navbar__search__clear-icon"
);

function addSearchFunctionality() {
  console.log("event fired");
  // Loop over all the search form elements and add event listeners
  searchFormElements.forEach((searchFormElement, index) => {
    // Prevent default form behavior
    searchFormElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const searchText = searchElements[index].value;

      // window.location.href = `/frontend/pages/search/search-result.html?search=${searchText}`;
      window.location.href = `../../pages/search/search-result.html?search=${searchText}`;
    });
  });
}

function clearSearchText() {
  // Hide or show clear button
  navbarSearchElement.addEventListener("input", function () {
    if (this.value) {
      navbarSearchClearBtn.classList.remove("hide-clear-icon");
    } else {
      navbarSearchClearBtn.classList.add("hide-clear-icon");
    }
  });

  clearButtons.forEach((clearButton, index) => {
    // clear text on click
    clearButton.addEventListener("click", function () {
      // Clear the search text
      searchElements[index].value = "";

      // If the clear button is of navbar search element hide the close icon
      if (index === 0) clearButton.classList.add("hide-clear-icon");

      // Focus the search element
      searchElements[index].focus();
    });
  });
}

function changeOnFocus() {
  navbarSearchElement.addEventListener("focus", function () {
    searchFormElements[0].classList.add("navbar-search-focus");
  });

  navbarSearchElement.addEventListener("blur", function () {
    searchFormElements[0].classList.remove("navbar-search-focus");
  });
}

function focusOnFormClick() {
  navbarSearchElement.addEventListener("click", function () {
    navbarSearchElement.focus();
  });
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
