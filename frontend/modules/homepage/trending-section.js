import { trendingNewsURL } from "../config.js";

// Implementation of the function fetchTrendingNews
async function fetchTrendingNews(trendingNewsURL) {
  try {
    const trendingNewsURLResponse = await fetch(trendingNewsURL);

    if (trendingNewsURLResponse.ok) {
      const trendingNews = await trendingNewsURLResponse.json();
      return trendingNews.articles;
    } else {
      const errorMessage = `⚡⚡An unknown error occurred with a status code of ${trendingNewsURLResponse.status}⚡⚡`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(error.message);
  }
}

// Implementation of the function getTop10TrendingNews
function getTop10TrendingNews(trendingNews) {
  // Return the treding news from 0 to 9th index
  return trendingNews.slice(0, 10);
}

// Implementation of the function getNextTrendingNews
function getNext4TrendingNews(trendingNews) {
  // Return the trending news from 10th index to 14th index
  return trendingNews.slice(10, 14);
}

// Implementation of the function addTrendingNewsCarouselToDOM
function addTrendingNewsCarouselToDOM(trendingNewsObjects) {
  // Get the trending news grid from the DOM
  const trendingNewsGridElement = document.querySelector(
    ".trending-section__grid"
  );

  // Create a trendingNewsGridItemElement
  const trendingNewsGridItemElement = document.createElement("div");

  trendingNewsGridItemElement.setAttribute(
    "class",
    "trending-section__grid__item carousel grid-col-span-2 grid-row-span-2"
  );

  // Create a carousel inner element
  const carouselInnerElement = document.createElement("div");

  carouselInnerElement.setAttribute("class", "carousel-inner");

  // Loop over the trending news objects and add them to coraousel
  trendingNewsObjects.forEach((trendingNewsObject) => {
    // Create a carousel item
    const carouselItemElement = document.createElement("div");

    carouselItemElement.setAttribute("class", "carousel-item");

    carouselItemElement.innerHTML =
      getTrendingNewsItemInner(trendingNewsObject);

    // Append the carousel item to carousel inner element
    carouselInnerElement.append(carouselItemElement);
  });

  // Append the carousel inner element to trending news grid item element
  trendingNewsGridItemElement.append(carouselInnerElement);

  // Append the trending news grid item element to trending news grid item
  trendingNewsGridElement.append(trendingNewsGridItemElement);
}

// Implementation of the function addTrendingNewsToDOM
function addTrendingNewsToDOM(trendingNewsObjects) {
  // Get the trending news grid from the DOM
  const trendingNewsGridElement = document.querySelector(
    ".trending-section__grid"
  );

  console.log(trendingNewsGridElement);

  // Loop over the trending news objects and add them to DOM
  trendingNewsObjects.forEach((trendingNewsObject, index) => {
    // Create a trending news grid item element
    const trendingNewsGridItemElement = document.createElement("div");

    trendingNewsGridItemElement.setAttribute(
      "class",
      "trending-section__grid__item"
    );

    trendingNewsGridItemElement.innerHTML =
      getTrendingNewsItemInner(trendingNewsObject);

    // Append the trending news grid item element to trending news grid element
    trendingNewsGridElement.append(trendingNewsGridItemElement);
  });
}

function getTrendingNewsItemInner(newsObject, forCarousel = false) {
  return `
        <a class="trending-section__grid__item__link"
            href="${newsObject.url}">
            <figure class="trending-section__card ${
              forCarousel ? "trending-section__card--carousel" : ""
            }">
                <img
                    src="${newsObject.urlToImage}"
                    alt="Trending news image" />

                <div class="trending-section__card__text-container ${
                  forCarousel
                    ? "trending-section__card__text-container--carousel"
                    : ""
                }">
                    <span class="trending-section__card__author ${
                      forCarousel
                        ? "trending-section__card__author--carousel"
                        : ""
                    }">${getNewsAuthor(newsObject)}, ${getPublishedTime(
    newsObject.publishedAt
  )}</span>
                    <h2 class="trending-section__card__title ${
                      forCarousel
                        ? "trending-section__card__title--carousel mt-2"
                        : ""
                    }">
                        ${newsObject.title}
                    </h2>
                </div>
            </figure>
        </a>
    `;
}

function getNewsAuthor(newsObject) {
  // If author for the news exitsts return author.
  // Else if source for the news exitsts return source.
  // Else return unknown

  if (newsObject.author) return newsObject.author;
  else if (newsObject.source.name) return newsObject.source.name;
  else return "unknown";
}

function getPublishedTime(date) {
  const currentTime = new Date();
  const publishedAt = new Date(date);

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

async function initTrendingSection() {
  // Get the trending news
  const trendingNews = await fetchTrendingNews(trendingNewsURL);

  console.log(trendingNews);

  // Get the top 10 news from trending news
  const top10TrendingNews = getTop10TrendingNews(trendingNews);

  // Get the next trending news
  const next4TrendingNews = getNext4TrendingNews(trendingNews);

  // Add the trending news Carousel to DOM
  addTrendingNewsCarouselToDOM(top10TrendingNews);

  // Add the trending news to DOM
  addTrendingNewsToDOM(next4TrendingNews);
}

initTrendingSection();
