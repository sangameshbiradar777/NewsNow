import { addErrorMessageToDOM } from "../dom-helper.js";
import {
  getFeaturedSection,
  getCategoryNewsSection,
} from "./category-template.js";
import { RSSToJSONConverterURL } from "./category-config.js";
import { hideLoaderAndDisplayContent } from "../dom-helper.js";
import { getMoreNewsElement } from "./category-template.js";

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

  // Get the main grid element
  const mainGridElement = document.querySelector(".main-grid");

  const categoryNews = [...categoryNews1.items, ...categoryNews2.items];

  // Add main to DOM
  const mainElement = getMainElement(categoryNews, `${category} News`);

  // Get more technology news
  const moreCategoryNews = await fetchCategoryNews(moreCategoryNewsURL);

  // Add morenews to DOM
  const moreNewsElement = getMoreNewsElement(
    moreCategoryNews.items,
    "More News"
  );

  const asideElement = document.querySelector("aside");
  asideElement.append(moreNewsElement);

  mainGridElement.append(mainElement, asideElement);

  hideLoaderAndDisplayContent();
}

export default initCategory;

export { fetchCategoryNews, getMainElement };
