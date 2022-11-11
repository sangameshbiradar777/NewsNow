import {
  topNewsURL,
  technologyNewsURL,
  sportsNewsURL,
  entertainmentNewsURL,
  businessNewsURL,
  healthNewsURL,
  scienceNewsURL,
  newsImageFallbackURL,
  preLoadImage,
} from "../config.js";
import { fetchNews } from "./helper.js";
import { getProcessedData, compressText } from "../data-processor.js";

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
  scrollerBtnLeft.setAttribute("class", "btn news__btn news__btn--left hidden");

  scrollerBtnLeft.innerHTML = `<ion-icon class="btn__icon" name="chevron-back"></ion-icon>`;

  // Create a scroller button parent element
  const scrollerBtnRight = document.createElement("button");
  scrollerBtnRight.setAttribute("class", "btn news__btn news__btn--right");

  scrollerBtnRight.innerHTML = `<ion-icon class="btn__icon" name="chevron-forward"></ion-icon>`;

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
      // let newsCardWidth = newsElement.children[0].getBoundingClientRect().width;

      // Get the width of newsElement
      const newsElementWidth = newsElement.getBoundingClientRect().width;

      // Scroll half the sixe of newsElementWidth
      let amountToScroll = Math.floor(newsElementWidth / 1.5);

      // If the clicked element is left scrll btn, add negative sign to the newsCardWidth
      if (this.classList.contains("news__btn--left"))
        amountToScroll = -amountToScroll;

      // Scroll Options
      const scrollOptions = {
        top: 0,
        left: amountToScroll,
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
    <div class="action-container">
      <button id="${newsObject.id}" class="btn action__btn action__btn--share">
        <ion-icon class="action__icon" name="share-social-outline"></ion-icon>
      </button>
      <button id="${
        newsObject.id
      }" class="btn action__btn action__btn--bookmark">
        <ion-icon class="action__icon" name="bookmark-outline"></ion-icon>
      </button>
    </div>
    <a href="${newsObject.URL}" target="_blank">
      <div class="news-card__img-container">
        ${
          newsObject.imageURL
            ? `<img
          class="news-card__img"
          src='${preLoadImage}'
          data-src="${newsObject.imageURL}"
          alt="News image"
          onerror="this.src='${newsImageFallbackURL}'"
          />`
            : `<div class="news-card__img-fallback"></div>`
        }
      </div>
      <div class="news-card__text-container">
        <span class="news-card__author">${newsObject.author}, ${
    newsObject.publishedAt
  }</span>
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

function observeNewsSectons() {
  // Get all the news elements
  const newsElements = document.querySelectorAll(".news");

  // Loop over all the newsElments and observer for intersections
  newsElements.forEach((newsElement) => {
    // Create a new observer
    const observer = new IntersectionObserver(
      (intersectionEntries) => {
        showOrHideScrollerBtns(intersectionEntries, newsElement);
      },
      {
        root: newsElement,
        threshold: 1,
      }
    );

    // Get the first news card element
    const firstNewsCardElement = newsElement.querySelector(".news-card");
    firstNewsCardElement.setAttribute("id", "first-news-card");

    // Olbsever first news card for intersections
    observer.observe(firstNewsCardElement);

    // Get the last news card element of the news element
    const newsCardElements = newsElement.querySelectorAll(".news-card");
    const lastNewsCardElement = newsCardElements[newsCardElements.length - 1];
    lastNewsCardElement.setAttribute("id", "last-news-card");

    // Observer the last news card for intersections
    observer.observe(lastNewsCardElement);
  });
}

function showOrHideScrollerBtns(intersectionEntries, newsElement) {
  const interSectionEntry = intersectionEntries[0];

  // Get the forward and backward buttons
  const btnBackward = newsElement.querySelector(".news__btn--left");
  const btnForward = newsElement.querySelector(".news__btn--right");

  // Check for which card the intersection has fired
  if (interSectionEntry.target.id === "first-news-card") {
    if (interSectionEntry.isIntersecting) {
      btnBackward.classList.add("hidden");
    } else {
      btnBackward.classList.remove("hidden");
    }
  }

  if (interSectionEntry.target.id === "last-news-card") {
    if (interSectionEntry.isIntersecting) {
      btnForward.classList.add("hidden");
    } else {
      btnForward.classList.remove("hidden");
    }
  }
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
  const businessNewsElement = document.querySelector(".news--business-news");
  const healthNewsElement = document.querySelector(".news--health-news");
  const scienceNewsElement = document.querySelector(".news--science-news");

  // Get top news
  const topNewsResponse = await fetchNews(topNewsURL);
  const topNews = topNewsResponse.articles;

  // Get processed top news
  const processedTopNews = getProcessedData(topNews);

  // Add top news cards to DOM
  addNewsCardsToDOM(topNewsElement, processedTopNews);

  // Get technology news
  const technologyNewsResponse = await fetchNews(technologyNewsURL);
  const technologyNews = technologyNewsResponse.articles;

  // Get processed technology news
  const processedTechnologyNews = getProcessedData(technologyNews);

  // Add technology news cards to DOM
  addNewsCardsToDOM(technologyNewsElement, processedTechnologyNews);

  // Get sports news
  const sportsNewsResponse = await fetchNews(sportsNewsURL);
  const sportsNews = sportsNewsResponse.articles;

  // Get processed sports news
  const processedSportsNews = getProcessedData(sportsNews);

  // Add Sports news cards to DOM
  addNewsCardsToDOM(sportsNewsElement, processedSportsNews);

  // Get Entertainment news
  const entertainmentNewsResponse = await fetchNews(entertainmentNewsURL);
  const entertainmentNews = entertainmentNewsResponse.articles;

  // Get processed entertainment news
  const processedEntertainmentNews = getProcessedData(entertainmentNews);

  // Add Sports news cards to DOM
  addNewsCardsToDOM(entertainmentNewsElement, processedEntertainmentNews);

  // Get Business news
  const businessNewsResponse = await fetchNews(businessNewsURL);
  const businessNews = businessNewsResponse.articles;

  // Get processed Business news
  const processedBusinessNews = getProcessedData(businessNews);

  // Add Business news cards to DOM
  addNewsCardsToDOM(businessNewsElement, processedBusinessNews);

  // Get Health news
  const healthNewsResponse = await fetchNews(healthNewsURL);
  const healthNews = healthNewsResponse.articles;

  // Get processed Health news
  const processedHealthNews = getProcessedData(healthNews);

  // Add Health news cards to DOM
  addNewsCardsToDOM(healthNewsElement, processedHealthNews);

  // Get Science news
  const scienceNewsResponse = await fetchNews(scienceNewsURL);
  const scienceNews = scienceNewsResponse.articles;

  // Get processed Science news
  const processedScienceNews = getProcessedData(scienceNews);

  // Add Sports news cards to DOM
  addNewsCardsToDOM(scienceNewsElement, processedScienceNews);

  // Scroll on button click
  scrollOnBtnClick();

  // Intersection observer
  observeNewsSectons();
}

export default initNewsSections;
