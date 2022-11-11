import { processTime, processDate, compressText } from "../data-processor.js";
import { newsImageFallbackURL, preLoadImage } from "../config.js";

function getFeaturedSection(newsObjects, heading) {
  // Create a section element
  const featuredSectionElement = document.createElement("section");
  featuredSectionElement.setAttribute("class", "section-featured");

  // Loop over the newsObjects and featrued section elements
  featuredSectionElement.innerHTML = `
    <h1 class="section-heading">${heading}</h1>
    <div class="featured-grid">
      ${getFeaturedGridItemHTML(newsObjects.slice(0, 1), true).innerHTML}

      <div class="featured-grid__sub-items">
        ${getFeaturedGridItemHTML(newsObjects.slice(1)).innerHTML}
      </div>
    </div>
  `;

  return featuredSectionElement;
}

function getFeaturedGridItemHTML(newsObjects, isMainItem = false) {
  // Create a element to store the featured grid items
  const divElement = document.createElement("div");

  newsObjects.forEach((newsObject) => {
    // Check for empty objects
    if (!newsObject.title.length) return;

    // Create a featured grid item
    const featuredGridItem = document.createElement("div");
    const className = isMainItem
      ? "featured-grid__item featured-grid__item--main"
      : "featured-grid__item";
    featuredGridItem.setAttribute("class", className);

    featuredGridItem.innerHTML = `
    <a href="${
      newsObject.url
    }" target="_blank" class="featured-grid__item__link">
      <div class="featured-grid__item__img-container">
        <img
          src="${
            newsObject["media:content"]?.$.url ?? newsImageFallbackURL
          }" alt="
          News image">
      </div>
      <div class="featured-grid__item__text-container">
        ${
          isMainItem
            ? `<span class="featured-grid__item__author">${compressText(
                newsObject.creator,
                15
              )}</span> - `
            : ""
        }
        <span class="featured-grid__item__author">${processTime(
          newsObject.created
        )}</span>
        
        <h2 class="featured-grid__item__title">${
          isMainItem
            ? compressText(newsObject.title, 100)
            : compressText(newsObject.title, 50)
        }</h2> 
      </div>
      
    </a>
    `;

    // Append the featured grid item to div element
    divElement.append(featuredGridItem);
  });

  return divElement;
}

function getCategoryNewsSection(newsObjects, heading) {
  // Create a category section element
  const categoryNewsSectionElement = document.createElement("section");
  categoryNewsSectionElement.setAttribute(
    "class",
    "category-section section-category-news"
  );

  categoryNewsSectionElement.innerHTML = `
    <h1 class="section-heading">${heading}</h1>
    <div class="category-news__container">
      ${getCategoryNewsCard(newsObjects).innerHTML}
    </div>
  `;

  return categoryNewsSectionElement;
}

function getCategoryNewsCard(newsObjects) {
  const divElement = document.createElement("div");

  newsObjects.forEach((newsObject) => {
    // Check for empty objects
    if (!newsObject.title.length) return;

    const categoryNewsCardElement = document.createElement("div");
    categoryNewsCardElement.setAttribute("class", "category-news__card");

    categoryNewsCardElement.innerHTML = `
    <a href="${
      newsObject.url
    }" target="_blank" class="category-news__card__link">
      <div class="category-news__card__img-container">
        <img 
        src='${preLoadImage}'
        data-src="${
          newsObject["media:content"]?.$.url ?? newsImageFallbackURL
        }" alt="News image">
      </div>

      <div class="category-news__card__text-container">
        <span class="featured-grid__item__author">${compressText(
          newsObject.creator,
          15
        )} - ${processTime(newsObject.created)}</span>
        <h4 class="category-news__card__title">${compressText(
          newsObject.title,
          100
        )}</h4>
      </div>
    </a>
    `;

    divElement.append(categoryNewsCardElement);
  });

  return divElement;
}

function getMoreNewsElement(newsObjects, heading) {
  const moreNewsElement = document.createElement("section");
  moreNewsElement.setAttribute("class", "section--more-news");

  moreNewsElement.innerHTML = `
    <h2 class="aside__section-heading">${heading}</h2>
    <div class="more-news-body">
      ${getMoreNewsItems(newsObjects).innerHTML}
    </div>
  `;

  return moreNewsElement;
}

function getMoreNewsItems(newsObjects) {
  const divElement = document.createElement("div");

  newsObjects.forEach((newsObject) => {
    // Check for empty objects
    if (!newsObject.title.length) return;

    const moreNewsItemElement = document.createElement("div");
    moreNewsItemElement.setAttribute("class", "more-news__item");

    moreNewsItemElement.innerHTML = `
    <a href="${newsObject.url}" target="_blank" class="more-news__item__link">
      <div class="more-news__item__text-container">
        <span class="featured-grid__item__author">${processDate(
          newsObject.created
        )}</span>
        <h2 class="more-news__item__title">${compressText(
          newsObject.title,
          70
        )}</h2>
      </div>
      <div class="more-news__item__img-container">
        <img
          src='${preLoadImage}'
          data-src="${
            newsObject["media:content"]?.$.url ?? newsImageFallbackURL
          }" alt="
          News image">
      </div>
    </a>
    `;

    divElement.append(moreNewsItemElement);
  });

  return divElement;
}

export { getFeaturedSection, getCategoryNewsSection, getMoreNewsElement };
