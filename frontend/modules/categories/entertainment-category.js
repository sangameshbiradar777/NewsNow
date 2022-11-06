import {RSSToJSONConverterURL, entertainmentNewsRSSURL1, entertainmentNewsRSSURL2, moreEntertainmentNewsRSSURL} from './category-config.js';
import { hideLoaderAndDisplayContent} from '../dom-helper.js';
import {getMoreNewsElement} from './category-template.js';
import {fetchCategoryNews, getMainElement} from './category-helper.js';

async function initEntertainmentCategory() {
  // Create a Category News URL
  const entertainmentNewsURL1 = RSSToJSONConverterURL + entertainmentNewsRSSURL1;
  const entertainmentNewsURL2 = RSSToJSONConverterURL + entertainmentNewsRSSURL2;
  const moreEntertainmentNewsURL = RSSToJSONConverterURL + moreEntertainmentNewsRSSURL;

  // Get Entertainment news
  const entertainmentNews1 = await fetchCategoryNews(entertainmentNewsURL1);
  const entertianmentNews2 = await fetchCategoryNews(entertainmentNewsURL2);

  const entertainmentNews = [...entertainmentNews1.items, ...entertianmentNews2.items];

  // Add main to DOM
  const mainElement = getMainElement(entertainmentNews, 'Entertainment News');

  // // Add India Entertainment news to DOM
  // const indiaEntertainmentNews = await fetchCategoryNews(indiaEntertainmentNewsURL);

  // // Get India Entertainment element
  // const indiaNewsElement = getMoreNewsElement(indiaEntertainmentNews.items, 'India Entertainment');

  // Get more technology news
  const moreEntertainmentNews = await fetchCategoryNews(moreEntertainmentNewsURL);

  // Add morenews to DOM
  const moreNewsElement = getMoreNewsElement(moreEntertainmentNews.items, 'More News');

  const asideElement = document.querySelector('aside');
  asideElement.append(moreNewsElement);

  // Get the main grid element
  const mainGridElement = document.querySelector('.main-grid');

  mainGridElement.append(mainElement, asideElement);

  hideLoaderAndDisplayContent();
  
}

export default initEntertainmentCategory;