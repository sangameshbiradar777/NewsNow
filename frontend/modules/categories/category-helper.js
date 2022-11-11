import { addErrorMessageToDOM } from "../dom-helper.js";
import {
  getFeaturedSection,
  getCategoryNewsSection,
} from "./category-template.js";
import { RSSToJSONConverterURL } from "./category-config.js";
import { hideLoaderAndDisplayContent } from "../dom-helper.js";
import { getMoreNewsElement } from "./category-template.js";
import { stickCategoryToTop } from "../dom-helper.js";
import lazyload from "../lazyload.js";

async function fetchCategoryNews(URL) {
  try {
    // Make a fetch request to get the
    const technologyNewsResponse = await fetch(URL);

    if (technologyNewsResponse.ok) {
      // Extract the data from the response
      const technologyNews = await technologyNewsResponse.json();
      return technologyNews;
    } else {
      const errorMessage =
        "Server is experiencing high traffic. Please try again later.";
      throw new Error(errorMessage);
      return null;
    }
  } catch (error) {
    console.log(error.message);
    addErrorMessageToDOM(error.message, true);
  }
}

function getMainElement(newsObjects, heading) {
  // Get the main element
  const mainElement = document.querySelector("main");

  // Get featured section
  const featuredSectionElement = getFeaturedSection(
    newsObjects.slice(0, 5),
    "Featured"
  );

  // Get Category news section
  const categoryNewsSectionElement = getCategoryNewsSection(
    newsObjects.slice(5),
    heading
  );

  mainElement.append(featuredSectionElement, categoryNewsSectionElement);

  return mainElement;
}

function getFeaturedSectionElement(newsObjects) {
  // Get featured section
  const featuredSectionElement = getFeaturedSection(
    newsObjects.slice(0, 5),
    "Featured"
  );

  return featuredSectionElement;
}

function getCategoryNewsSectionElement(newsObjects, heading) {
  // Get Category news section
  const categoryNewsSectionElement = getCategoryNewsSection(
    newsObjects,
    heading
  );

  return categoryNewsSectionElement;
}

async function initCategory(
  categoryNewsRSSURL1,
  categoryNewsRSSURL2,
  moreCategoryNewsRSSURL,
  category
) {
  // Create a Category News URL
  const categoryNewsURL1 =
    RSSToJSONConverterURL + encodeURIComponent(categoryNewsRSSURL1);
  const categoryNewsURL2 =
    RSSToJSONConverterURL + encodeURIComponent(categoryNewsRSSURL2);
  const moreCategoryNewsURL =
    RSSToJSONConverterURL + encodeURIComponent(moreCategoryNewsRSSURL);

  // Get Category news
  const categoryNews1 = await fetchCategoryNews(categoryNewsURL1);
  const categoryNews2 = await fetchCategoryNews(categoryNewsURL2);

  // Get the main element
  const mainElement = document.querySelector("main");

  // Get the main grid element
  const asideElement = document.querySelector("aside");

  const feauturedSectionElement = getFeaturedSectionElement(
    categoryNews1.items
  );

  mainElement.append(feauturedSectionElement);

  hideLoaderAndDisplayContent();

  stickCategoryToTop(true);

  // Get more technology news
  const moreCategoryNews = await fetchCategoryNews(moreCategoryNewsURL);

  // Add morenews to DOM
  const moreNewsElement = getMoreNewsElement(
    moreCategoryNews.items,
    "More News"
  );

  asideElement.append(moreNewsElement);

  const categoryNews = [
    ...categoryNews1.items.slice(5),
    ...categoryNews2.items,
  ];

  const categoryNewsSectionElement = getCategoryNewsSectionElement(
    categoryNews,
    `${category} News`
  );

  mainElement.append(categoryNewsSectionElement);

  lazyload();
}

export default initCategory;

export {
  fetchCategoryNews,
  getMainElement,
  getFeaturedSectionElement,
  getCategoryNewsSectionElement,
};
