function getSearchText() {
  // Create a new urlSearchParams object
  const urlParams = new URLSearchParams(window.location.search);

  // Extract the search text
  const searchText = urlParams.get("search") || "Nothing";

  // Change the document title
  document.title = `${capitalizeText(searchText)} - NewsNow`;

  return searchText;
}

function capitalizeText(text) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function addSearchTextToDom() {
  // Get the search text element from DOM
  const searchTextElement = document.querySelector(".search__text");

  // Get the search text from url
  const searchText = getSearchText();

  // Set the text content of searchTextElement to search text
  searchTextElement.textContent = searchText;
}

function addSearchResultsCountToDom(resultsCount = 0) {
  // Get the number of results element from DOM
  const searchResultsCountElement = document.querySelector(
    ".search__results-number"
  );

  // Empty the search results count element
  searchResultsCountElement.innerHTML = "";

  searchResultsCountElement.textContent = resultsCount;
}

export { getSearchText, addSearchTextToDom, addSearchResultsCountToDom };
