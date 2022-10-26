import sourcesStatic from "../../../backend/sources.js";
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
      <input id="${source.id}" type="checkbox" />
        ${source.name}
    `;

    // Append the label element to filter element
    filterSourcesElement.append(labelElement);
  });
}

async function initFilters() {
  // Get all the filters body
  const filterSortByElement = document.querySelector(
    ".filters__section--sort-by .filters__body"
  );

  // Get sources using API
  // const sourcesResponse = await fetchURL(sourcesURL);

  // ! Temporary
  const sourcesResponse = sourcesStatic;
  // ! Temporary

  const sources = sourcesResponse.sources;

  console.log(sources);

  // Add sources to DOM
  addSourcesToDOM(sources);
}

export default initFilters;
