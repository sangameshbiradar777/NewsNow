import {addErrorMessageToDOM} from '../dom-helper.js';
import {getFeaturedSection, getCategoryNewsSection} from './category-template.js';

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

function getMainElement(newsObjects, heading) {
  // Get the main element
  const mainElement = document.querySelector('main');

  // Get featured section
  const featuredSectionElement = getFeaturedSection(newsObjects.slice(0, 5), 'Featured');

  // Get Category news section
  const categoryNewsSectionElement = getCategoryNewsSection(newsObjects.slice(5), heading);

  mainElement.append(featuredSectionElement, categoryNewsSectionElement);

  return mainElement;
}

export {fetchCategoryNews, getMainElement}