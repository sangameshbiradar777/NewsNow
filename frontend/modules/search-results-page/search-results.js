import { baseURL, NEWSAPIKEY } from "../config.js";
import { getSearchText, addSearchResultsCountToDom } from "./search-bar.js";

function initSearchResults() {
  // Get the search text
  const searchText = getSearchText();

  // Create a search url
  const searchURL = `${baseURL}q=${searchText}&apiKey=${NEWSAPIKEY}`;

  console.log(searchURL);
}

export default initSearchResults;
