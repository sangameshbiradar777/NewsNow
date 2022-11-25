import {
  baseURL,
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
        <span class="search-results__card__author">${searchResult.source}, ${
    searchResult.date
  }</span>
        <h3 class="search-results__card__title">
          ${compressText(searchResult.title, 100)}
        </h3>

        <div class="action-container">
          <button id="${
            searchResult.id
          }" class="btn action__btn action__btn--share">
            <ion-icon class="action__icon" name="share-social-outline"></ion-icon>
          </button>
          <button id="${
            searchResult.id
          }" class="btn action__btn action__btn--bookmark">
            <ion-icon class="action__icon" name="bookmark-outline"></ion-icon>
          </button>
        </div>
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

  // // Finally concat the api key to the search url
  // return searchURL.concat(`&apiKey=${NEWSAPIKEY}`);

  return searchURL;
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

  console.log(sourceFilters);

  // Flatten the array
  filters = filters.flat();

  filters.forEach((filter) => {
    filter.addEventListener("click", async (e) => {
      console.log("source clikced");
      const filteredSearchResultsCount = await filterSearchResultsAndUpdateDOM(
        searchText
      );

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
  console.log("filtering");

  // Add loader to DOM
  addLoaderToDom();

  // Get the filtered search URL
  const filteredSearchURL = getSearchURL(searchText, pageNumber);

  let filteredSearchResultsResponse;

  // Get the filteres search results
  try {
    // Fetch search results
    filteredSearchResultsResponse = await fetchURL(filteredSearchURL);

    console.log(filteredSearchResultsResponse);

    // Check if the response is successful or not
    if (filteredSearchResultsResponse.status !== "ok") {
      const errorMessage =
        "Server is experiencing high traffic. Please try again later.";
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(error.message);

    // Add error message to dom
    addErrorMessageToDOM(error.message);

    return;
  }

  const filteredSearchResultsCount = filteredSearchResultsResponse.totalResults;

  if (filteredSearchResultsCount) {
    const filteredSearchResultsRaw = filteredSearchResultsResponse.articles;

    // Process the filtered search results
    const filteredSearchResults = getProcessedData(filteredSearchResultsRaw);

    // Add filtered search results to DOM
    addSearchResultsToDOM(filteredSearchResults);
  } else {
    addNoResultsFoundMessageToDOM(true);
  }

  // Update search results count
  addSearchResultsCountToDom(filteredSearchResultsCount);

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

function hideSearchAndPaginationElements() {
  // Hide the search text elements
  document.querySelector(".search__text-heading").style.display = "none";
  document.querySelector(".search__results-text").style.display = "none";
  document.querySelector(".section--pagination").style.display = "none";
}

function hideLoaderAndDisplaySearchResults() {
  // Get the loader element
  const loaderElement = document.querySelector(".loader-container");
  const searchResultsElement = document.querySelector(".search-results");

  // On page load hide the loader and show body
  loaderElement.style.display = "none";
  searchResultsElement.style.display = "flex";
}

function addLoaderToDom() {
  const searchResultsElement = document.querySelector(".search-results");
  searchResultsElement.innerHTML = `
    <div class="loader-container loader-container--search">
      <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
      <span class="loader__text">Filtering Resutls...</span>
    </div>
  `;
}

function addErrorMessageToDOM(errorMessage) {
  // Get the main element
  const mainElement = document.querySelector("main");

  // Set the inner html of main element to empty
  mainElement.innerHTML = "";

  hideSearchAndPaginationElements();

  // Create an error message element
  const errorMessageElement = document.createElement("div");
  errorMessageElement.setAttribute("class", "error-container");

  errorMessageElement.innerHTML = `
    <p class="error__heading">Error: Too many requests</p>
    <div class="error__img-container">
      <img class="error__img" src="../../src/images/error-image.png" alt="Error image">
    </div>
    <h3 class="error__message">${errorMessage}</h3>
  `;

  mainElement.append(errorMessageElement);
}

function addNoResultsFoundMessageToDOM(forFilterResults = false) {
  const searchText = getSearchText();

  const noResultsFoudElement = document.createElement("div");
  const className = forFilterResults
    ? "no-results-container no-results-container--filters"
    : "no-results-container";
  noResultsFoudElement.setAttribute("class", className);

  noResultsFoudElement.innerHTML = `
    <div class="no-results__img-container">
      <img class="no-results__img" src="../../src/images/no-results.webp" alt="Error image">
    </div>
    <h3 class="no-results__message">
      Sorry we coudn't find any results for ${
        forFilterResults ? "this filter." : `<span>${searchText}</span>`
      }
    </h3>
    <p class="no-results__description">
      ${
        forFilterResults
          ? "Try changing the filter"
          : "Try searching with another term"
      }
    </p>
  `;

  if (!forFilterResults) {
    // Get the main element
    const mainElement = document.querySelector("main");

    // Set the inner html of main element to empty
    mainElement.innerHTML = "";

    hideSearchAndPaginationElements();

    mainElement.append(noResultsFoudElement);

    return;
  }

  // If the function is called for filter results empty the search results container
  const searchResultsElement = document.querySelector(".search-results");
  searchResultsElement.innerHTML = "";

  // Empty pagination
  document.querySelector(".pagination").innerHTML = "";

  searchResultsElement.append(noResultsFoudElement);
}

async function initSearchResults() {
  // Get the search text
  const searchText = getSearchText();

  const searchURL = getSearchURL(searchText);

  let searchResultsResponse;

  try {
    // Fetch search results
    searchResultsResponse = await fetchURL(searchURL);

    // Check if the response is successful or not
    if (searchResultsResponse.status !== "ok") {
      const errorMessage =
        "Server is experiencing high traffic. Please try again later.";
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(error.message);

    // Add error message to dom
    addErrorMessageToDOM(error.message);

    return;
  }

  searchResultsCount = searchResultsResponse.totalResults;

  if (searchResultsCount === 0) addNoResultsFoundMessageToDOM();
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
