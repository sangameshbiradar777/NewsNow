import topHeadlines from "../../../backend/top-headlines.js";

// Implementation of the function fetchTrendingNews
async function fetchNews(newsURL) {
  // try {
  //   const newsURLResponse = await fetch(newsURL);

  //   if (newsURLResponse.ok) {
  //     const news = await newsURLResponse.json();
  //     return news;
  //   } else {
  //     const errorMessage = `⚡⚡An unknown error occurred with a status code of ${trendingNewsURLResponse.status}⚡⚡`;
  //     throw new Error(errorMessage);
  //   }
  // } catch (error) {
  //   console.log(error.message);
  // }

  // TEMPORARY
  return topHeadlines;
}

async function fetchURL(URL) {
  return await fetchNews(URL);
}

export { fetchNews, fetchURL };
