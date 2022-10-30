import { filterSearchResultsAndUpdateDOM } from "./search-results.js";
import { getSearchText } from "./search-bar.js";
import initPagination from "./pagination.js";

// Get the language filter dropdown
const languageFilterDropDownElement = document.querySelector(
  ".language-filter__dropdown"
);

// Get the language filter select button
const languageFilterSelectBtn = document.querySelector(
  ".language-filter__selected"
);

// Get the langualte filter selected text
const languageFilterSelectedText = document.querySelector(
  ".language-filter__selected__text"
);

function toggleLanguageFilterDropDown() {
  // Listen for click event on language filter select btn
  languageFilterSelectBtn.addEventListener("click", function () {
    languageFilterDropDownElement.classList.toggle(
      "language-filter__dropdown--hidden"
    );
  });

  document.body.addEventListener('click', function(e) {
    if(e.target.closest('.language-filter__selected') === languageFilterSelectBtn) return "";

    console.log(e.target)

    if(!languageFilterDropDownElement.classList.contains('.language-filter__dropdown--hidden')) {
      languageFilterDropDownElement.classList.add('language-filter__dropdown--hidden');
    }
  })
}

function changeLanguage() {
  // Listen for click event on language filter drop down
  languageFilterDropDownElement.addEventListener("click", async function (e) {
    // If the clicked item is not dropdown item just return
    if (!e.target.classList.contains("language-filter__dropdown__item")) return;

    const selectedLanguageElement = e.target;

    // Get the previously selected language element
    const [prevSelectedLanguageElement] = Array.from(this.children).filter(
      (languageElement) => {
        return languageElement.classList.contains(
          "language-filter__dropdown__item--selected"
        );
      }
    );

    // Remove the selected class on prev selected language element
    prevSelectedLanguageElement.classList.remove(
      "language-filter__dropdown__item--selected"
    );

    // Add selected class to current selected language element
    selectedLanguageElement.classList.add(
      "language-filter__dropdown__item--selected"
    );

    // Update the selected button element
    languageFilterSelectedText.textContent = selectedLanguageElement.name;
    languageFilterSelectBtn.id = selectedLanguageElement.id;

    // Hide the language filter dropdown
    languageFilterDropDownElement.classList.add(
      "language-filter__dropdown--hidden"
    );

    // Get search text
    const searchText = getSearchText();

    // update search results based on selected language
    const filteredSearchResultsCount = await filterSearchResultsAndUpdateDOM(
      searchText
    );

    // Initialize pagination
    initPagination(filteredSearchResultsCount);
  });
}

function initLanguageFilter() {
  // toggle lanaguage filter dropdown
  toggleLanguageFilterDropDown();

  // Change language
  changeLanguage();
}

export default initLanguageFilter;
