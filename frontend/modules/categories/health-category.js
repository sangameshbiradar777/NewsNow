import {RSSToJSONConverterURL, healthNewsRSSURL1, healthNewsRSSURL2, moreHealthNewsRSSURL} from './category-config.js';
import { hideLoaderAndDisplayContent} from '../dom-helper.js';
import {getMoreNewsElement} from './category-template.js';
import {fetchCategoryNews, getMainElement} from './category-helper.js';

async function initHealthCategory() {
  // Create a Category News URL
  const healthNewsURL1 = RSSToJSONConverterURL + healthNewsRSSURL1;
  const healthNewsURL2 = RSSToJSONConverterURL + healthNewsRSSURL2;
  const moreHealthNewsURL = RSSToJSONConverterURL + moreHealthNewsRSSURL;

  // Get Sports news
  const healthNews1 = await fetchCategoryNews(healthNewsURL1);
  const healthNews2 = await fetchCategoryNews(healthNewsURL2);

  const healthNews = [...healthNews1.items, ...healthNews2.items];

  // Add main to DOM
  const mainElement = getMainElement(healthNews, 'Health News');

  // Get more technology news
  const moreHealthNews = await fetchCategoryNews(moreHealthNewsURL);

  // Add morenews to DOM
  const moreNewsElement = getMoreNewsElement(moreHealthNews.items, 'More News');

  const asideElement = document.querySelector('aside');
  asideElement.append(moreNewsElement);

  // Get the main grid element
  const mainGridElement = document.querySelector('.main-grid');

  mainGridElement.append(mainElement, asideElement);

  hideLoaderAndDisplayContent();
  
}

export default initHealthCategory;