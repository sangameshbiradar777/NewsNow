import {
  topNewsURL,
  technologyNewsURL,
  sportsNewsURL,
  entertainmentNewsURL,
} from "../config.js";
import {fetchNews} from "./helper.js";
import {getProcessedData, compressText} from "../data-processor.js";

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

// Implementation of the function scrollRight
function scrollOnBtnClick() {
  // Get the right scroll btn
  const scrollBtns = document.querySelectorAll(".news__btn");

  // Loop over all the scroll btns and add event listeners to them
  scrollBtns.forEach((scrollBtn) => {
    scrollBtn.addEventListener("click", function () {
      // Get the closest news element
      const newsElement = this.closest(".news");

      // Get the width of any card inside the news element
      let newsCardWidth = newsElement.children[0].getBoundingClientRect().width;

      // If the clicked element is left scrll btn, add negative sign to the newsCardWidth
      if (this.classList.contains("news__btn--left"))
        newsCardWidth = -newsCardWidth;

      // Scroll Options
      const scrollOptions = {
        top: 0,
        left: newsCardWidth,
        behavior: "smooth",
      };

      // Scroll the news element by newsCardwidth pixels
      newsElement.scrollBy(scrollOptions);
    });
  });
}

// Implementation of the function getTopNewsCardInnerHTML
function getNewsCardInnerHTML(newsObject) {
  return `
    <a href="${newsObject.URL}">
      <div class="news-card__img-container">
        ${
          newsObject.imageURL
            ? `<img
          class="news-card__img"
          src="${newsObject.imageURL}"
          alt="News image"
          />`
            : `<div class="news-card__img-fallback"></div>`
        }
      </div>
      <div class="news-card__text-container">
        <span class="news-card__author">${newsObject.author}, ${newsObject.publishedAt}</span>
        <h3 class="news-card__title">
          ${compressText(newsObject.title, 50)}
        </h3>
        <p class="news-card__description">
          ${newsObject.content}
        </p>
      </div>
    </a> 
  `;
}

// Initiator function
async function initNewsSections() {
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

  // Get processed top news
  const processedTopNews = await getProcessedData(topNews);

  // Add top news cards to DOM
  addNewsCardsToDOM(topNewsElement, processedTopNews);

  // Get technology news
  const technologyNewsResponse = await fetchNews(technologyNewsURL);
  const technologyNews = technologyNewsResponse.articles;

  // Get processed technology news
  const processedTechnologyNews = await getProcessedData(technologyNews);

  // Add technology news cards to DOM
  addNewsCardsToDOM(technologyNewsElement, processedTechnologyNews);

  // Get sports news
  const sportsNewsResponse = await fetchNews(sportsNewsURL);
  const sportsNews = sportsNewsResponse.articles;

  // Get processed sports news
  const processedSportsNews = await getProcessedData(sportsNews);

  // Add Sports news cards to DOM
  addNewsCardsToDOM(sportsNewsElement, processedSportsNews);

  // Get Entertainment news
  const entertainmentNewsResponse = await fetchNews(entertainmentNewsURL);
  const entertainmentNews = entertainmentNewsResponse.articles;

  // Get processed entertainment news
  const processedEntertainmentNews = await getProcessedData(entertainmentNews);

  // Add Sports news cards to DOM
  addNewsCardsToDOM(entertainmentNewsElement, processedEntertainmentNews);

  // Scroll on button click
  scrollOnBtnClick();
}

export default initNewsSections;
