import {RSSToJSONConverterURL, technologyNewsRSSURL1, technologyNewsRSSURL2, moreTechnologyNewsRSSURL, indiaTechnologyNewsRSSURL} from './category-config.js';
import { hideLoaderAndDisplayContent} from '../dom-helper.js';
import {getMoreNewsElement} from './category-template.js';
import {fetchCategoryNews, getMainElement} from './category-helper.js';

async function initTechnologyCategory() {
  // Create a Category News URL
  const technologyNewsURL1 =  RSSToJSONConverterURL + technologyNewsRSSURL1;
  const technologyNewsURL2 =  RSSToJSONConverterURL + technologyNewsRSSURL2;
  const moreTechnologyNewsURL = RSSToJSONConverterURL + moreTechnologyNewsRSSURL;
  const indiaTechnologyNewsURL = RSSToJSONConverterURL + indiaTechnologyNewsRSSURL;

  // Get Technology news
  const technologyNews1 = await fetchCategoryNews(technologyNewsURL1);
  const technologyNews2 = await fetchCategoryNews(technologyNewsURL2);

  const technologyNews = [...technologyNews1.items, ...technologyNews2.items];

  // Add main to DOM
  const mainElement = getMainElement(technologyNews, 'Technology News');

  // Add India tech news to DOM
  const indiaTechnologyNews = await fetchCategoryNews(indiaTechnologyNewsURL);

  // Get India news element
  const indiaNewsElement = getMoreNewsElement(indiaTechnologyNews.items, 'India Tech');

  // Get more technology news
  const moreTechnologyNews = await fetchCategoryNews(moreTechnologyNewsURL);

  // Add morenews to DOM
  const moreNewsElement = getMoreNewsElement(moreTechnologyNews.items.slice(0, 10), 'More News');

  const asideElement = document.querySelector('aside');
  asideElement.append(indiaNewsElement, moreNewsElement);

  // Get the main grid element
  const mainGridElement = document.querySelector('.main-grid');

  mainGridElement.append(mainElement, asideElement);

  hideLoaderAndDisplayContent();
  
}

export default initTechnologyCategory;