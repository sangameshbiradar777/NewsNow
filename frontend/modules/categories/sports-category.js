import {RSSToJSONConverterURL, sportsNewsRSSURL1, sportsNewsRSSURL2, moreSportsNewsRSSURL} from './category-config.js';
import { hideLoaderAndDisplayContent} from '../dom-helper.js';
import {getMoreNewsElement} from './category-template.js';
import {fetchCategoryNews, getMainElement} from './category-helper.js';

async function initSportsCategory() {
  // Create a Category News URL
  const sportsNewsURL1 = RSSToJSONConverterURL + sportsNewsRSSURL1;
  const sportsNewsURL2 = RSSToJSONConverterURL + sportsNewsRSSURL2;
  const moreSportsNewsURL = RSSToJSONConverterURL + moreSportsNewsRSSURL;

  // Get Sports news
  const sportsNews1 = await fetchCategoryNews(sportsNewsURL1);
  const sportsNews2 = await fetchCategoryNews(sportsNewsURL2);

  const sportsNews = [...sportsNews1.items, ...sportsNews2.items];

  // Add main to DOM
  const mainElement = getMainElement(sportsNews, 'Sports News');

  // Get more technology news
  const moreSportsNews = await fetchCategoryNews(moreSportsNewsURL);

  // Add morenews to DOM
  const moreNewsElement = getMoreNewsElement(moreSportsNews.items, 'More News');

  const asideElement = document.querySelector('aside');
  asideElement.append(moreNewsElement);

  // Get the main grid element
  const mainGridElement = document.querySelector('.main-grid');

  mainGridElement.append(mainElement, asideElement);

  hideLoaderAndDisplayContent();
  
}

export default initSportsCategory;