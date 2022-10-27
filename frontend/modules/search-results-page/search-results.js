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

function getFilterDates() {
  const fromDate = document.querySelector("#filter-from").value;
  const toDate = document.querySelector("#filter-to").value;

  return [fromDate, toDate];
}

function getSortByFilters() {
  const sortByFilterElement = document.querySelector(
    ".filters__section--sort-by .filters__body"
  );

  const sortByCheckBoxes = sortByFilterElement.children;

  console.log(sortByCheckBoxes);
}

function getSearchURL(searchText) {
  const searchURL = `${baseURL}q=${searchText}`;
  // Get the dates to filter the search
  const [fromDate, toDate] = getFilterDates();

  // Apeend from date and to date to search URL
  if (fromDate && toDate) {
    searchURL.concat(`&from=${fromDate}&to=${toDate}`);
  } else if (fromDate) {
    searchURL.concat(`&from=${fromDate}`);
  }

  // Get the sortby filters
  const sortByFilters = getSortByFilters();
}

async function initSearchResults() {
  // Get the search text
  const searchText = getSearchText();

  // Create a search url
  // const searchURL = `${baseURL}q=${searchText}&apiKey=${NEWSAPIKEY}`;

  const searchURL = getSearchURL(searchText);

  // Fetch search results
  // const { totalResults: searchResultsCount, articles: searchResultsRaw } =
  //   await fetchURL(searchURL);

  // // Add search results count to DOM
  // addSearchResultsCountToDom(searchResultsCount);

  // // Process search results
  // const searchResults = getProcessedData(searchResultsRaw);

  // // Add search results to DOM
  // addSearchResultsToDOM(searchResults);
}

export default initSearchResults;
