import { newsArticles } from "./data-processor.js";

// Create a array to store the bookmarks
let bookmarks = [];

function addShareEventListener() {
  // Get all the share news btns
  const shareNewsBtns = document.querySelectorAll('.action__btn--share');

  // Add an event listener to the body to capture all the share btns
  document.body.addEventListener('click', function(e) {
    // Check for the target
    if(e.target.closest('.action__btn--share') === null) return;

    // Get the target share button
    const shareBtn = e.target.closest('.action__btn--share');

    // Get the id of the share btn
    const targetId = shareBtn.id;

    // Get the targetNewsObject
    const newsArticle = getTargetNewsArticle(targetId);

    // Share the news
    shareNewsArticle(newsArticle);
  })
}

function addBookmarkEventListener() {
  // Add an event listener to the body to capture all the share btns
  document.body.addEventListener('click', function(e) {
    // Check for the target
    if(e.target.closest('.action__btn--bookmark') === null) return;

    // Get the target share button
    const bookmarkBtn = e.target.closest('.action__btn--bookmark');

    // Get the id of the share btn
    const targetId = bookmarkBtn.id;

    // Get the targetNewsObject
    const newsArticle = getTargetNewsArticle(targetId);

    // Share the news
    bookmarkArticle(newsArticle);
  })
}

function shareNewsArticle(article) {
  if(navigator.share) {
    const shareArticle = {
      title: article.title,
      url: article.URL,
      text: article.description
    }
    navigator.share(shareArticle);
  }
  else if(navigator.clipboard) {
    navigator.clipboard.writeText(article.URL);
  }
}

function bookmarkArticle(article) {
  // Check if bookmarks extist in localstorage
  if(!localStorage.bookmarks) {
    bookmarks.push(article);

    // save the bookmarks to local storage
    addBookmarksToLocalStorage(bookmarks);
    return;
  }

  // Get the bookmarks from the localstorage
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  bookmarks.push(article);

  addBookmarksToLocalStorage(bookmarks);
}

function addBookmarksToLocalStorage(bookmarks) {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function getTargetNewsArticle(articleId) {
  // Loop over the articles array and get the target article
  return newsArticles.find(newsArticle => newsArticle.id === articleId);
}

function initShareNews() {
  // Add event listener to share btn
  addShareEventListener();

  // Add event listener for bookmark
  addBookmarkEventListener();
}

export default initShareNews;