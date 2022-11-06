import {RSSToJSONConverterURL, businessNewsRSSURL1, businessNewsRSSURL2, moreBusinessNewsRSSURL} from './category-config.js';
import { hideLoaderAndDisplayContent} from '../dom-helper.js';
import {getMoreNewsElement} from './category-template.js';
import {fetchCategoryNews, getMainElement} from './category-helper.js';

async function initBusinessCategory() {
  // Create a Category News URL
  const businessNewsURL1 = RSSToJSONConverterURL + businessNewsRSSURL1;
  const businessNewsURL2 = RSSToJSONConverterURL + businessNewsRSSURL2;
  const moreBusinessNewsURL = RSSToJSONConverterURL + moreBusinessNewsRSSURL;

  // Get Sports news
  const businessNews1 = await fetchCategoryNews(businessNewsURL1);
  const businessNews2 = await fetchCategoryNews(businessNewsURL2);

  const businessNews = [...businessNews1.items, ...businessNews2.items];

  // Add main to DOM
  const mainElement = getMainElement(businessNews, 'Business News');

  // Get more technology news
  const moreBusinessNews = await fetchCategoryNews(moreBusinessNewsURL);

  // Add morenews to DOM
  const moreNewsElement = getMoreNewsElement(moreBusinessNews.items, 'More News');

  const asideElement = document.querySelector('aside');
  asideElement.append(moreNewsElement);

  // Get the main grid element
  const mainGridElement = document.querySelector('.main-grid');

  mainGridElement.append(mainElement, asideElement);

  hideLoaderAndDisplayContent();
  
}

export default initBusinessCategory;