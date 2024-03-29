import { sourcesURL } from "../config.js";
import { fetchURL } from "../homepage/helper.js";

function addSourcesToDOM(sources) {
  // Get the sources element from the DOM
  const filterSourcesElement = document.querySelector(
    ".filters__section--sources .filters__body"
  );

  // Loop over the sources and add it to dom
  sources.forEach((source) => {
    // Create a label element
    const labelElement = document.createElement("label");
    labelElement.setAttribute("id", `${source.id}`);
    labelElement.setAttribute("class", "filter");

    // Add the HTML to label element
    labelElement.innerHTML = `
      <input id="${source.id}" type="checkbox" name=${source.id} />
        ${source.name}
    `;

    // Append the label element to filter element
    filterSourcesElement.append(labelElement);
  });
}

function changeColorOfDateOnChange() {
  const filterDateElements = document.querySelectorAll(".filter-date-input");

  filterDateElements.forEach((filterDateElement) => {
    filterDateElement.addEventListener("change", function () {
      this.style.color = "#444";
    });
  });
}

async function initFilters() {
  // Get all the filters body
  const filterSortByElement = document.querySelector(
    ".filters__section--sort-by .filters__body"
  );

  // Get sources using API
  const sourcesResponse = await fetchURL(sourcesURL);

  const sources = sourcesResponse.sources;

  // Add sources to DOM
  addSourcesToDOM(sources);

  // Change color of the date picker on change
  changeColorOfDateOnChange();
}

export default initFilters;
