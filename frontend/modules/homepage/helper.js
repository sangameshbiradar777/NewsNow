import {newsAPIKeys, serverURL} from '../config.js';

// Implementation of the function fetchTrendingNews
let newsURLResponse;

// Get the working api key from the array of news api keys
const APIKey = await getWorkingAPIKey(newsAPIKeys);

console.log(`Working API key - 🔑${APIKey}🔑`);

async function fetchNews(newsURL) {
  try {
    // Create a url object to update api key
    newsURL = new URL(newsURL);

    // Create a search param object to add api key to the search parameter
    const newsURLsearchParams = new URLSearchParams(newsURL.search);

    // Append the 
    newsURLsearchParams.append('apiKey', APIKey);

    newsURL.search = newsURLsearchParams;

    newsURL = serverURL + encodeURIComponent(newsURL);

    newsURLResponse = await fetch(newsURL);

    if (newsURLResponse.ok) {
      const news = await newsURLResponse.json();
      return news;
    } else {
      const errorMessage = `⚡⚡An unknown error occurred with a status code of ${newsURLResponse.status}⚡⚡`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(error.message);
    return newsURLResponse;
  }

  // TEMPORARY
  // return topHeadlines;
}

async function getWorkingAPIKey(APIKeys) {

  console.log("Im called")

  for(let APIKey = 0; APIKey < APIKeys.length; APIKey++) {
    // Create a news url object
    let newsURL = new URL(`https://newsapi.org/v2/sources`);

    // Create a new search url param object
    const serachParams = new URLSearchParams();

    // Append the api key to search params
    serachParams.append('apiKey', APIKeys[APIKey]);

    // Add the apikey to URL
    newsURL.search = serachParams;

    // encode the url to receive correctly in the backend
    newsURL = encodeURIComponent(newsURL);

    const fetchURL = serverURL + newsURL;

    try {
      // Make a GET request to the url
      const APIResponse = await fetch(fetchURL);

      if(APIResponse.ok) {
        // Conver the response to json
        const sourceData = await APIResponse.json();

        // If we get the source date from the API that mean this api key is working,
        // So return this api key
        if(sourceData.status == 'ok') {
          return APIKeys[APIKey];
        }
        else {
          const errorMessage = `⚡⚡🔑${APIKeys[APIKey]}🔑 API key respondend with a status of ${sourceData.status}, 
          error description - ${sourceData.code}⚡⚡`;
          throw new Error(errorMessage);
        }
      }
    }
    catch(error) {
      console.log(error.message);
    }
  } 
}

async function fetchURL(URL) {
  return await fetchNews(URL);
}



export { fetchNews, fetchURL };
