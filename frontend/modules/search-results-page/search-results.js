import {
  baseURL,
  NEWSAPIKEY,
  newsImageFallbackURL,
  searchResultsToDisplayPerPage,
} from "../config.js";
import { fetchURL } from "../homepage/helper.js";
import { getSearchText, addSearchResultsCountToDom } from "./search-bar.js";
import { getProcessedData, compressText } from "../data-processor.js";
import initPagination from "../search-results-page/pagination.js";

let searchResultsCount;

function addSearchResultsToDOM(searchResults) {
  // Get the search results element from the DOM
  const searchResultsElement = document.querySelector(".search-results");

  // Set the search results to empty
  searchResultsElement.innerHTML = "";

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

function getSelectedCheckBoxes(filterElement) {
  // Get all the check boxes in the parent element and convert them to array
  const allCheckBoxes = Array.from(filterElement.querySelectorAll("input"));

  // Loop over all the check boxes and get the selected check boxes
  const selectedCheckBoxes = allCheckBoxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.name);

  return selectedCheckBoxes;
}

function getSortByFilters() {
  // Get all the radio buttons with name sort-by
  const sortByRadioBtns = document.getElementsByName("sort-by");

  let selectedSortByRadioBtn;

  sortByRadioBtns.forEach((sortByRadioBtn, index) => {
    if (sortByRadioBtn.checked) {
      selectedSortByRadioBtn = sortByRadioBtn.dataset.sortBy;
    }
  });

  // If none of the radio buttons are selected just return empty string
  if (!selectedSortByRadioBtn) return "";

  return `&sortBy=${selectedSortByRadioBtn}`;
}

function getSourceFilters() {
  // Get the source filter element from the DOM
  const sourceFilterElement = document.querySelector(
    ".filters__section--sources .filters__body"
  );

  // Get all the selected source filters inside the source filter element
  const selectedSources = getSelectedCheckBoxes(sourceFilterElement);

  addNumberOfSourceSelectedToDOM(selectedSources.length);

  // If there are no filters selected return empty string
  if (!selectedSources.length) return "";

  // Construct the final source filter string
  const finalSourceFiltersString = selectedSources.reduce(
    (sourceFilterString, source, index, selectedSourcesArray) => {
      let filterString = `${source}`;

      if (index !== selectedSourcesArray.length - 1)
        filterString = filterString.concat(",");

      return sourceFilterString.concat(filterString);
    },
    "&sources="
  );

  return finalSourceFiltersString;
}

function getSearchURL(searchText, pageNumber = 1) {
  let searchURL = `${baseURL}q=${searchText}&searchIn=title`;

  // Get the language to filter the search results based on language
  const selectedLanguage = document.querySelector(
    ".language-filter__selected"
  ).id;

  searchURL = searchURL.concat(`&language=${selectedLanguage}`);

  // Get the dates to filter the search
  const [fromDate, toDate] = getFilterDates();

  // Apeend from date and to date to search URL
  if (fromDate && toDate) {
    searchURL = searchURL.concat(`&from=${fromDate}&to=${toDate}`);
  } else if (fromDate) {
    searchURL = searchURL.concat(`&from=${fromDate}`);
  }

  // Get the sortby filters
  const sortByFilters = getSortByFilters();

  // Concat the sort by filters to search url
  searchURL = searchURL.concat(sortByFilters);

  // Get the source filters
  const sourceFilters = getSourceFilters();

  // Concat the source filters to search url
  searchURL = searchURL.concat(sourceFilters);

  // Concatt the page number and pageSize to search url
  searchURL = searchURL.concat(
    `&page=${pageNumber}&pageSize=${searchResultsToDisplayPerPage}`
  );

  console.log(searchURL);

  // Finally concat the api key to the search url
  return searchURL.concat(`&apiKey=${NEWSAPIKEY}`);
}

function updateSearchResultsOnFilterChange(searchText) {
  // Get all the input filters
  let filters = [];

  const sortByFilters = Array.from(
    document.querySelectorAll(".filters__section--sort-by .filters__body input")
  );
  filters.push(sortByFilters);

  const sourceFilters = Array.from(
    document.querySelectorAll(".filters__section--sources .filters__body input")
  );
  filters.push(sourceFilters);

  // Flatten the array
  filters = filters.flat();

  filters.forEach((filter) => {
    filter.addEventListener("click", async (e) => {
      const filteredSearchResultsCount = await filterSearchResultsAndUpdateDOM(
        searchText
      );

      console.log(e.target);

      // Initialize pagination
      initPagination(filteredSearchResultsCount);
    });
  });

  // searchByDate
  searchByDateRange(searchText);
}

function searchByDateRange(searchText) {
  // Get the search be date form
  const searchByDateFormElement = document.querySelector(
    ".search-by-date-form"
  );

  searchByDateFormElement.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the search url
    const searchURL = getSearchURL(searchText);

    const filteredSearchResultsCount = await filterSearchResultsAndUpdateDOM(
      searchText
    );

    // Initialize pagination
    initPagination(filteredSearchResultsCount);
  });
}

function addNumberOfSourceSelectedToDOM(sourcesSelectedCount) {
  // Get the number of source filters selected element
  const numberOfSourceSelectedElement = document.querySelector(
    ".number-of-source-selected"
  );

  if (sourcesSelectedCount) {
    numberOfSourceSelectedElement.textContent = sourcesSelectedCount;
    numberOfSourceSelectedElement.classList.remove("hidden");
    return;
  }

  numberOfSourceSelectedElement.classList.add("hidden");
}

async function filterSearchResultsAndUpdateDOM(searchText, pageNumber) {
  // Get the filtered search URL
  const filteredSearchURL = getSearchURL(searchText, pageNumber);

  console.log(filteredSearchURL);

  // Get the filteres search results
  const filteredSearchResultsResponse = await fetchURL(filteredSearchURL);

  const filteredSearchResultsCount = filteredSearchResultsResponse.totalResults;
  const filteredSearchResultsRaw = filteredSearchResultsResponse.articles;

  // Process the filtered search results
  const filteredSearchResults = getProcessedData(filteredSearchResultsRaw);

  // Update search results count
  addSearchResultsCountToDom(filteredSearchResultsCount);

  // Add filtered search results to DOM
  addSearchResultsToDOM(filteredSearchResults);

  return filteredSearchResultsCount;
}

function resetFilters(searchText) {
  // Get all the reset btns
  const dateResetBtn = document.querySelector(".filters__btn--reset-date");
  const sortByResetBtn = document.querySelector(".filters__btn--reset-sort-by");
  const sourcesResetBtn = document.querySelector(
    ".filters__btn--reset-sources"
  );

  dateResetBtn.addEventListener("click", async function () {
    document.querySelector("#filter-from").value = "";
    document.querySelector("#filter-to").value = "";

    // Update search results
    // Update search results
    const filteredSearchResultsCount = await filterSearchResultsAndUpdateDOM(
      searchText
    );

    // Initialize pagination
    initPagination(filteredSearchResultsCount);
  });

  async function resetInputs(searchText) {
    console.log(this);
    const filtersSection = this.closest(".filters__section");

    const inputElements = filtersSection.querySelectorAll(
      ".filters__body input"
    );

    // Loop over all the input elements and un select then
    inputElements.forEach((inputElement) => {
      inputElement.checked = false;
    });

    // If the clicked button is source reset btn hide number of source selected element
    addNumberOfSourceSelectedToDOM(0);

    // Update search results
    const filteredSearchResultsCount = await filterSearchResultsAndUpdateDOM(
      searchText
    );

    // Initialize pagination
    initPagination(filteredSearchResultsCount);
  }

  sortByResetBtn.addEventListener("click", function () {
    resetInputs.call(this, searchText);
  });

  sourcesResetBtn.addEventListener("click", function () {
    resetInputs.call(this, searchText);
  });
}

async function initSearchResults() {
  // Get the search text
  const searchText = getSearchText();

  const searchURL = getSearchURL(searchText);

  // Fetch search results
  const searchResultsResponse = await fetchURL(searchURL);
  searchResultsCount = searchResultsResponse.totalResults;
  const searchResultsRaw = searchResultsResponse.articles;

  // Add search results count to DOM
  addSearchResultsCountToDom(searchResultsCount);

  // Process search results
  const searchResults = getProcessedData(searchResultsRaw);

  // Add search results to DOM
  addSearchResultsToDOM(searchResults);

  // Update search results when ever any filters are selected or disselected
  updateSearchResultsOnFilterChange(searchText);

  // Reset filters
  resetFilters(searchText);
}

export {
  initSearchResults,
  filterSearchResultsAndUpdateDOM,
  searchResultsCount,
};
