import { topNewsURL } from "../config.js";
import {
  fetchNews,
  limitTopNewsCardText,
  getNewsAuthor,
  getPublishedTime,
} from "./helper.js";

// Implementation of the function addTopNewsCardsToDOM
function addTopNewsCardsToDOM(topNewsObjects) {
  // Get the top news element from DOM
  const topNewsElement = document.querySelector(".top-news");

  // Loop over the top news objects and add top news cards to DOM
  topNewsObjects.forEach((topNewsObject) => {
    // Create top news card element
    const topNewsCardElement = document.createElement("div");

    topNewsCardElement.setAttribute("class", "top-news__card");

    // Add the inner html of the top news card element
    topNewsCardElement.innerHTML = getTopNewsCardInnerHTML(topNewsObject);

    // Append the top news card element to top news element
    topNewsElement.append(topNewsCardElement);
  });
}

// Implementation of the function getTopNewsCardInnerHTML
function getTopNewsCardInnerHTML(topNewsObject) {
  return `
    <a href="${topNewsObject.url}">
      <div class="top-news__card__img-container">
        <img
          class="top-news__card__img"
          src="${topNewsObject.urlToImage}"
          alt="News image"
        />
      </div>
      <div class="top-news__card__text-container">
        <span class="top-news__card__author">${getNewsAuthor(
          topNewsObject
        )}, ${getPublishedTime(topNewsObject.publishedAt)}</span>
        <h3 class="top-news__card__title">
          ${limitTopNewsCardText(topNewsObject.title, true)}
        </h3>
        <p class="top-news__card__description">
          ${limitTopNewsCardText(topNewsObject.description)}
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

  // Add top news cards to DOM
  addTopNewsCardsToDOM(topNews);
}

initTopNews();
