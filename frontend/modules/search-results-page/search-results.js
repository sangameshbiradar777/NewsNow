import { baseURL, NEWSAPIKEY } from "../config.js";
import { fetchURL } from "../homepage/helper.js";
import { getSearchText, addSearchResultsCountToDom } from "./search-bar.js";
import { getProcessedData, compressText } from "../data-processor.js";
import { newsImageFallbackURL } from "../config.js";

function addSearchResultsToDOM(searchResults) {
  // Get the search results element from the DOM
  const searchResultsElement = document.querySelector(".search-results");

  // Loop over the search results and add them to DOM
  searchResults.forEach((searchResult) => {
    // Create a search result card
    const searchResultCardElement = document.createElement("div");
    searchResultCardElement.setAttribute("class", "search-results__card");

    // Get the innerHTML of the search results card element
    searchResultCardElement.innerHTML = getSearchResultCardHTML(searchResult);

    // Append the search result card element to search results element
    searchResultsElement.append(searchResultCardElement);
  });
}

function getSearchResultCardHTML(searchResult) {
  return `
    <a href="${searchResult.URL}" target="_blank"
      class="search-results__card__link">
      <div class="search-results__card__img-container">
        <img
          src="${searchResult.imageURL}"
          alt="Search result image" 
          onerror="this.src='${newsImageFallbackURL}'"
          />
      </div>
      <div class="search-results__card__text-container">
        <span class="search-results__card__author">${searchResult.source}, ${searchResult.date}</span>
        <h3 class="search-results__card__title">
          ${searchResult.title}
        </h3>
      </div>
    </a>
  `;
}

async function initSearchResults() {
  // Get the search text
  const searchText = getSearchText();

  // Create a search url
  const searchURL = `${baseURL}q=${searchText}&apiKey=${NEWSAPIKEY}`;
  console.log(searchURL);

  // Fetch search results
  const { totalResults: searchResultsCount, articles: searchResultsRaw } =
    await fetchURL(searchURL);

  // Add search results count to DOM
  addSearchResultsCountToDom(searchResultsCount);

  // Process search results
  const searchResults = getProcessedData(searchResultsRaw);

  // Add search results to DOM
  addSearchResultsToDOM(searchResults);
}

export default initSearchResults;
