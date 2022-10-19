import { topNewsURL, technologyNewsURL } from "../config.js";
import {
  fetchNews,
  limitTopNewsCardText,
  getNewsAuthor,
  getPublishedTime,
} from "./helper.js";

// Implementation of the function addTopNewsCardsToDOM
function addNewsCardsToDOM(elementToAppend, newsObjects) {
  // Loop over the top news objects and add top news cards to DOM
  newsObjects.forEach((newsObject) => {
    // Create top news card element
    const newsCardElement = document.createElement("div");

    newsCardElement.setAttribute("class", "news-card");

    // Add the inner html of the top news card element
    newsCardElement.innerHTML = getNewsCardInnerHTML(newsObject);

    // Append the top news card element to parent element
    elementToAppend.append(newsCardElement);
  });
}

// Implementation of the function getTopNewsCardInnerHTML
function getNewsCardInnerHTML(newsObject) {
  return `
    <a href="${newsObject.url}">
      <div class="news-card__img-container">
        <img
          class="news-card__img"
          src="${newsObject.urlToImage}"
          alt="News image"
        />
      </div>
      <div class="news-card__text-container">
        <span class="news-card__author">${getNewsAuthor(
          newsObject
        )}, ${getPublishedTime(newsObject.publishedAt)}</span>
        <h3 class="news-card__title">
          ${limitTopNewsCardText(newsObject.title, true)}
        </h3>
        <p class="news-card__description">
          ${limitTopNewsCardText(newsObject.description)}
        </p>
      </div>
    </a> 
  `;
}

// Initiator function
async function initTopNews() {
  // Get top news
  const topNewsResponse = await fetchNews(topNewsURL);
  const topNews = topNewsResponse.articles;

  // Get top news element from DOM
  const topNewsElement = document.querySelector(".news--top-news");
  // Add top news cards to DOM
  addNewsCardsToDOM(topNewsElement, topNews);

  // Get technology news
  const technologyNewsResponse = await fetchNews(technologyNewsURL);
  const technologyNews = technologyNewsResponse.articles;

  // Get technology news element from DOM
  const technologyNewsElement = document.querySelector(
    ".news--technology-news"
  );

  // Add technology news cards to DOM
  addNewsCardsToDOM(technologyNewsElement, technologyNews);
}

initTopNews();
