import { trendingNewsURL } from "../config.js";
import {
  fetchNews,
  limitText,
  getNewsAuthor,
  getPublishedTime,
} from "./helper.js";
import initCarousel from "../homepage/carousel.js";

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
    "trending-section__grid__item grid-col-span-2 grid-row-span-2"
  );

  trendingNewsGridItemElement.innerHTML = `
    <div class="carousel">
        <div class="carousel__inner">
            ${getCarouselItemElements(trendingNewsObjects).innerHTML}
        </div>
        <button class="btn carousel__btn carousel__btn--left hidden">
            <ion-icon class="carousel__btn__icon" name="chevron-back-circle"></ion-icon>
        </button>
        <button class="btn carousel__btn carousel__btn--right">
            <ion-icon class="carousel__btn__icon" name="chevron-forward-circle"></ion-icon>
        </button>

        <div class="carousel__nav">
          ${getCarouselNavItems(trendingNewsObjects).innerHTML}
        </div>
    </div>
  `;

  // Append the trending news grid item element to trending news grid item
  trendingNewsGridElement.append(trendingNewsGridItemElement);
}

// Implementation of the function getCarouselNavItems
function getCarouselNavItems(trendingNewsObjects) {
  // Create a carousel nav element
  const carouselNavElement = document.createElement("div");

  // For each trending news object create a dot(carousel nav)
  trendingNewsObjects.forEach((_, index) => {
    // Create a dot
    const dotElement = document.createElement("div");

    const className = index === 0 ? "dot active" : "dot";
    dotElement.setAttribute("class", className);

    // Append the dot element to carousel nav element
    carouselNavElement.append(dotElement);
  });

  return carouselNavElement;
}

// Implementation of the function getCarouselItemElements
function getCarouselItemElements(trendingNewsObjects) {
  const carouselInnerElement = document.createElement("div");

  trendingNewsObjects.forEach((trendingNewsObject, index) => {
    const carouselItemElement = document.createElement("div");

    const className = index === 0 ? "carousel__item active" : "carousel__item";
    carouselItemElement.setAttribute("class", className);

    carouselItemElement.innerHTML = getTrendingNewsItemInner(
      trendingNewsObject,
      true
    );

    carouselInnerElement.append(carouselItemElement);
  });

  return carouselInnerElement;
}

// Implementation of the function addTrendingNewsToDOM
function addTrendingNewsToDOM(trendingNewsObjects) {
  // Get the trending news grid from the DOM
  const trendingNewsGridElement = document.querySelector(
    ".trending-section__grid"
  );

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
                        ${limitText(newsObject.title, forCarousel)}
                    </h2>
                </div>
            </figure>
        </a>
    `;
}

// Initiator function
async function initTrendingSection() {
  // Get the trending news
  const trendingNewsResponse = await fetchNews(trendingNewsURL);
  const trendingNews = trendingNewsResponse.articles;

  // Get the top 10 news from trending news
  const top10TrendingNews = getTop10TrendingNews(trendingNews);

  // Get the next trending news
  const next4TrendingNews = getNext4TrendingNews(trendingNews);

  // Add the trending news Carousel to DOM
  addTrendingNewsCarouselToDOM(top10TrendingNews);

  // Initialize carousel
  initCarousel();

  // Add the trending news to DOM
  addTrendingNewsToDOM(next4TrendingNews);
}

initTrendingSection();
