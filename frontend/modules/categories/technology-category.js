import {
  RSSToJSONConverterURL,
  technologyNewsRSSURL1,
  technologyNewsRSSURL2,
  moreTechnologyNewsRSSURL,
  indiaTechnologyNewsRSSURL,
} from "./category-config.js";
import { hideLoaderAndDisplayContent } from "../dom-helper.js";
import { getMoreNewsElement } from "./category-template.js";
import {
  fetchCategoryNews,
  getMainElement,
  getFeaturedSectionElement,
  getCategoryNewsSectionElement,
} from "./category-helper.js";
import { stickCategoryToTop } from "../../modules/dom-helper.js";

async function initTechnologyCategory() {
  console.time("Execution time");
  // Create a Category News URL
  const technologyNewsURL1 =
    RSSToJSONConverterURL + encodeURIComponent(technologyNewsRSSURL1);
  const technologyNewsURL2 =
    RSSToJSONConverterURL + encodeURIComponent(technologyNewsRSSURL2);
  const moreTechnologyNewsURL =
    RSSToJSONConverterURL + encodeURIComponent(moreTechnologyNewsRSSURL);
  const indiaTechnologyNewsURL =
    RSSToJSONConverterURL + encodeURIComponent(indiaTechnologyNewsRSSURL);

  // Get the main grid element
  const mainElement = document.querySelector("main");
  const asideElement = document.querySelector("aside");

  // Get Technology news
  const technologyNews1 = await fetchCategoryNews(technologyNewsURL1);
  const technologyNews2 = await fetchCategoryNews(technologyNewsURL2);

  const featuredSectionElement = getFeaturedSectionElement(
    technologyNews1.items
  );

  mainElement.append(featuredSectionElement);

  hideLoaderAndDisplayContent();

  stickCategoryToTop(true);

  // Add India tech news to DOM
  const indiaTechnologyNews = await fetchCategoryNews(indiaTechnologyNewsURL);

  // Get India news element
  const indiaNewsElement = getMoreNewsElement(
    indiaTechnologyNews.items,
    "India Tech"
  );

  asideElement.append(indiaNewsElement);

  const technologyNews = [
    ...technologyNews1.items.slice(5),
    ...technologyNews2.items,
  ];

  const categoryNewsSectionElement = getCategoryNewsSectionElement(
    technologyNews,
    "Technology News"
  );

  mainElement.append(categoryNewsSectionElement);

  // Get more technology news
  const moreTechnologyNews = await fetchCategoryNews(moreTechnologyNewsURL);

  // Add morenews to DOM
  const moreNewsElement = getMoreNewsElement(
    moreTechnologyNews.items.slice(0, 20),
    "More News"
  );

  asideElement.append(moreNewsElement);

  console.timeEnd("Execution time");
}

export default initTechnologyCategory;
