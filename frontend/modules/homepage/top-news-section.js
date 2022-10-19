import { topNewsURL } from "../config.js";
import { fetchNews } from "./helper.js";

// Initiator function
async function initTopNews() {
  // Get top news
  const topNewsResponse = await fetchNews(topNewsURL);
  const topNews = topNewsResponse.articles;

  //
}

initTopNews();
