import {
  topNewsURL,
  technologyNewsURL,
  sportsNewsURL,
  entertainmentNewsURL,
} from "../config.js";
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

  // Get the left and right scroller buttons
  const [scrollerBtnLeft, scrollerBtnRight] = getScrollerButtons();

  // Append the left and right buttons to the elementToAppend
  elementToAppend.append(scrollerBtnLeft, scrollerBtnRight);
}

// Implementation of the function getNewsButtons
function getScrollerButtons() {
  // Create a scroller button parent element
  const scrollerBtnLeft = document.createElement("button");
  scrollerBtnLeft.setAttribute("class", "btn news__btn news__btn--left");

  scrollerBtnLeft.innerHTML = `<ion-icon class="btn__icon" name="chevron-back-circle"></ion-icon>`;

  // Create a scroller button parent element
  const scrollerBtnRight = document.createElement("button");
  scrollerBtnRight.setAttribute("class", "btn news__btn news__btn--right");

  scrollerBtnRight.innerHTML = `<ion-icon class="btn__icon" name="chevron-forward-circle"></ion-icon>`;

  return [scrollerBtnLeft, scrollerBtnRight];
}

// Implementation of the function getTopNewsCardInnerHTML
function getNewsCardInnerHTML(newsObject) {
  return `
    <a href="${newsObject.url}">
      <div class="news-card__img-container">
        ${
          newsObject.urlToImage
            ? `<img
          class="news-card__img"
          src="${newsObject.urlToImage}"
          alt="News image"
          />`
            : `<div class="news-card__img-fallback"></div>`
        }
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
  // Get all the news element from DOM
  const topNewsElement = document.querySelector(".news--top-news");
  const technologyNewsElement = document.querySelector(
    ".news--technology-news"
  );
  const sportsNewsElement = document.querySelector(".news--sports-news");
  const entertainmentNewsElement = document.querySelector(
    ".news--entertainment-news"
  );

  // Get top news
  const topNewsResponse = await fetchNews(topNewsURL);
  const topNews = topNewsResponse.articles;

  // Add top news cards to DOM
  addNewsCardsToDOM(topNewsElement, topNews);

  // Get technology news
  const technologyNewsResponse = await fetchNews(technologyNewsURL);
  const technologyNews = technologyNewsResponse.articles;

  // Add technology news cards to DOM
  addNewsCardsToDOM(technologyNewsElement, technologyNews);

  // Get sports news
  const sportsNewsResponse = await fetchNews(sportsNewsURL);
  const sportsNews = sportsNewsResponse.articles;

  // Add Sports news cards to DOM
  addNewsCardsToDOM(sportsNewsElement, sportsNews);

  // Get Entertainment news
  const entertainmentNewsResponse = await fetchNews(entertainmentNewsURL);
  const entertainmentNews = entertainmentNewsResponse.articles;

  // Add Sports news cards to DOM
  addNewsCardsToDOM(entertainmentNewsElement, entertainmentNews);
}

initTopNews();
