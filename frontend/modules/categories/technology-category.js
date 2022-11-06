import {RSSToJSONConverterURL, technologyNewsRSSURL1, technologyNewsRSSURL2, moreTechnologyNewsRSSURL, indiaTechnologyNewsRSSURL} from './category-config.js';
import {serverURL} from '../config.js';
import {addErrorMessageToDOM} from '../dom-helper.js';
import {getFeaturedSection, getCategoryNewsSection, getMoreNewsElement} from './category-template.js';

async function fetchCategoryNews(URL) {
  try{
    // Make a fetch request to get the 
    const technologyNewsResponse = await fetch(URL);

    if(technologyNewsResponse.ok) {
      // Extract the data from the response
      const technologyNews = await technologyNewsResponse.json();
      return technologyNews;
    }
    else {
      const errorMessage = 'Server is experiencing high traffic. Please try again later.';
      throw new Error(errorMessage);
      return null;
    }
  }
  catch(error) {
    console.log(error.message);
    addErrorMessageToDOM(error.message);
  }
}

function getMainElement(newsObjects) {
  // Get the main element
  const mainElement = document.querySelector('main');

  // Get featured section
  const featuredSectionElement = getFeaturedSection(newsObjects.slice(0, 5), 'Featured');

  // Get Category news section
  const categoryNewsSectionElement = getCategoryNewsSection(newsObjects.slice(5), 'Technlology News');

  mainElement.append(featuredSectionElement, categoryNewsSectionElement);

  return mainElement;
}


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
  const mainElement = getMainElement(technologyNews);

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
  
}

export default initTechnologyCategory;