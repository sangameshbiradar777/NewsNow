import {
  searchResultsCount,
  filterSearchResultsAndUpdateDOM,
} from "./search-results.js";
import {
  searchResultsToDisplayPerPage,
  maximumSearchResultsAllowed,
} from "../config.js";
import { getSearchText } from "./search-bar.js";

let resultsCount;

let currentPageNumber = 1;
let totalPages;
let maximumSearchResults;

// Get search text
const searchText = getSearchText();

// Get the page numbers list
const pageNumbersListElement = document.querySelector(
  ".pagination__pages__list"
);

// Get prev and next page elements
const prevPageElement = document.querySelector(".pagination__pages__prev");
const nextPageElement = document.querySelector(".pagination__pages__next");

function addPageNumbersToDom(currentPageNumber) {
  // Empty the page number list element
  pageNumbersListElement.innerHTML = "";

  // Limit search results to max search results allowed
  if (resultsCount > maximumSearchResultsAllowed) {
    maximumSearchResults = maximumSearchResultsAllowed;
  } else {
    maximumSearchResults = resultsCount;
  }

  // Calculate the total number of pages
  totalPages = Math.ceil(maximumSearchResults / searchResultsToDisplayPerPage);

  // Start a loop and add total number of pages
  for (let page = 1; page <= totalPages; page++) {
    // Create a page list item
    const pageListItem = document.createElement("li");
    const className =
      page === currentPageNumber
        ? "pagination__pages__list__item pagination__current-page"
        : "pagination__pages__list__item";
    pageListItem.setAttribute("class", className);
    pageListItem.setAttribute("data-page-number", page);

    pageListItem.innerHTML = page;

    pageNumbersListElement.append(pageListItem);
  }

  updatePrevAndNextPageElements(currentPageNumber);
}

function updateCurrentPage(targetPageNumber, targetPageElement) {
  // Set the current page
  currentPageNumber = parseInt(targetPageNumber);

  // Get the current page pagination element
  const [currentPageElement] = Array.from(
    pageNumbersListElement.children
  ).filter((pageNumberElement) => {
    return pageNumberElement.classList.contains("pagination__current-page");
  });

  console.log(targetPageElement);

  currentPageElement.classList.remove("pagination__current-page");
  targetPageElement.classList.add("pagination__current-page");

  // Update prev and next page elements
  updatePrevAndNextPageElements(currentPageNumber);
}

function updatePrevAndNextPageElements(pageNumber) {
  if (pageNumber <= 1) {
    prevPageElement.classList.add("pagination__pages--disabled");
    prevPageElement.disabled = true;
  } else {
    prevPageElement.classList.remove("pagination__pages--disabled");
    prevPageElement.disabled = false;
  }

  if (pageNumber >= totalPages) {
    nextPageElement.classList.add("pagination__pages--disabled");
    nextPageElement.disabled = true;
  } else {
    nextPageElement.classList.remove("pagination__pages--disabled");
    nextPageElement.disabled = false;
  }
}

async function updateSearchResults(targetPageNumber, targetPageElement) {
  // Handle edge cases
  if (targetPageNumber < 1 || targetPageNumber > 10) return;

  await filterSearchResultsAndUpdateDOM(searchText, targetPageNumber);
  updateCurrentPage(targetPageNumber, targetPageElement);
}

function updateSearchResultsOnPageClick() {
  // Listen for changes in page
  pageNumbersListElement.addEventListener("click", function (e) {
    // If clicked element is not page number just return
    if (!e.target.classList.contains("pagination__pages__list__item")) return;

    // Get the target page number
    const targetPageNumber = e.target.dataset.pageNumber;

    // update search results
    updateSearchResults(targetPageNumber, e.target);

    // Scroll to search section
    scrollToSearchSection();
  });
}

function addPrevAndNextPageFunctionality() {
  prevPageElement.addEventListener("click", function () {
    // Get target page
    const targetPageNumber = currentPageNumber - 1;

    // Get target page element
    const targetPageElement = pageNumbersListElement.querySelector(
      ".pagination__current-page"
    ).previousElementSibling;

    updateSearchResults(targetPageNumber, targetPageElement);

    // Scroll to search section
    scrollToSearchSection();
  });

  nextPageElement.addEventListener("click", function () {
    // Get target page
    const targetPageNumber = currentPageNumber + 1;

    // Get target page element
    const targetPageElement = pageNumbersListElement.querySelector(
      ".pagination__current-page"
    ).nextElementSibling;

    updateSearchResults(targetPageNumber, targetPageElement);

    // Scroll to search section
    scrollToSearchSection();
  });
}

function scrollToSearchSection() {
  // Get the search container
  const searchContainerElement = document.querySelector("#search-container");

  searchContainerElement.scrollIntoView({ behavior: "smooth" });
}

function initPagination(filteredSearchResults = searchResultsCount) {
  resultsCount = filteredSearchResults;
  currentPageNumber = 1;

  console.log(resultsCount);
  console.log("currentpage", currentPageNumber);

  // Add page numbers to dom
  addPageNumbersToDom(currentPageNumber);

  // show search results for different pages
  updateSearchResultsOnPageClick();

  // add previous and next page functionality
  addPrevAndNextPageFunctionality();
}

export default initPagination;
