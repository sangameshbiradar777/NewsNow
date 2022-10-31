

// Implementation of the function fetchTrendingNews
let newsURLResponse;
async function fetchNews(newsURL) {
  try {
    newsURL = 'https://guarded-beach-97677.herokuapp.com/' + newsURL;
    console.log(newsURL)
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

async function fetchURL(URL) {
  return await fetchNews(URL);
}

export { fetchNews, fetchURL };
