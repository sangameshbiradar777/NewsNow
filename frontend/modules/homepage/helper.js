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

// Implementation of the function limit text
function limitText(text, forCarousel = false) {
  if (forCarousel) {
    const words = text.split(" ");
    return words.length > 20
      ? `${words.slice(0, 20).join(" ")}...`
      : words.join(" ");
  }

  return text.split(" ").slice(0, 10).join(" ").concat("...");
}

function limitTopNewsCardText(text, isTitle = false) {
  if (isTitle) {
    return text.split(" ").slice(0, 10).join(" ").concat("...");
  }

  return text.split(" ").slice(0, 20).join(" ").concat("...");
}

function getNewsAuthor(newsObject) {
  // If author for the news exitsts return author.
  // Else if source for the news exitsts return source.
  // Else return unknown

  if (newsObject.author) return newsObject.author;
  else if (newsObject.source.name) return newsObject.source.name;
  else return "unknown";
}

function getPublishedTime(publishedDate) {
  const currentTime = new Date();
  const publishedAt = new Date(publishedDate);

  // Get the time passed by subtracting the current time and published time
  const timePassed =
    ((currentTime - publishedAt) / (1000 * 60 * 60)).toFixed(2) + "";

  // Get the hours and minutes separetley by splitting the time passed string
  const [hours, minutes] = timePassed.split(".");

  if (hours) {
    return `${hours}h ago`;
  }

  return "Just now";
}

export {
  fetchNews,
  limitText,
  limitTopNewsCardText,
  getNewsAuthor,
  getPublishedTime,
};
