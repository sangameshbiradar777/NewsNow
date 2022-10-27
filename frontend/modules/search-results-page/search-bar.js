function getSearchText() {
  // Create a new urlSearchParams object
  const urlParams = new URLSearchParams(window.location.search);

  // Extract the search text
  const searchText = urlParams.get("search") || "Nothing";

  return searchText;
}

function addSearchTextToDom() {
  // Get the search text element from DOM
  const searchTextElement = document.querySelector(".search__text");

  // Get the search text from url
  const searchText = getSearchText();

  // Set the text content of searchTextElement to search text
  searchTextElement.textContent = searchText;
}

function addSearchResultsCountToDom(resultsCount) {
  // Get the number of results element from DOM
  const searchResultsCountElement = document.querySelector(
    ".search__results-number"
  );

  searchResultsCountElement.textContent = resultsCount;
}

export { getSearchText, addSearchTextToDom, addSearchResultsCountToDom };
