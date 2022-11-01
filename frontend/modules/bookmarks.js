
function getBookmarksFromLocalStorage() {
  if(!localStorage.getItem('bookmarks')) {
    return [];
  }

  return JSON.parse(localStorage.getItem('bookmarks'));
}

function addBookmarksToDOM(bookmarks) {
  // Get the bookmarks element
  const bookmarksElement = document.querySelector('.bookmarks');

  // Loop over bookmarks and add them to DOM
  bookmarks.forEach(bookmark => {
    // Create a bookmark card element
    const bookmarkCardElement = document.createElement('div');
    bookmarkCardElement.setAttribute('class', 'bookmarks__card')

    // Get the inner html of bookmark card element
    bookmarkCardElement.innerHTML = getBookmarksCardInner(bookmark);

    bookmarksElement.append(bookmarkCardElement);
  })
}

function getBookmarksCardInner(bookmark) {
  return `
    <a href="${bookmark.URL}" class="bookmarks__card__link">
      <div class="bookmarks__card__img-container">
        <img src="${bookmark.imageURL}" alt="News image">
      </div>

      <div class="bookmarks__card__text-container">
        <span class="bookmarks__card__bookmarked-on">Bookmarked on 23 Sep 2022</span>
        <h2 class="bookmarks__card__title">
          ${bookmark.title}
        </h2>
        <span class="bookmarks__card__author">By ${bookmark.author}</span>
        <span class="bookmarks__card__publishedat">Published on ${bookmark.publishedAt}</span>
      </div>
    </a>
  `;
}

function getUniqueBookmarks(bookmarks) {
  const bookmarksMap = new Map();

  bookmarks.forEach(bookmark => {
    if(bookmarksMap.get(bookmark.title)) {
      bookmarksMap.set(bookmark.title, bookmarksMap.get(bookmark.title) + 1);
    }
    else {
      bookmarksMap.set(bookmark.title, 1);
    }
  })

  let uniqueObjects = [];

  bookmarks.forEach(bookmark => {
    if(bookmarksMap.get(bookmark.title)) {
      uniqueObjects.push(bookmark);
      bookmarksMap.delete(bookmark.title);
    }
  })

  return uniqueObjects;
}

function addNoBookMarksMessageToDOM() {
  // Get bookmarks element
  const bookmarksElement = document.querySelector('.bookmarks');

  bookmarksElement.innerHTML = `
    <div class="no-bookmarks-container">
      <div class="no-bookmarks-img-container">
        <img src="/frontend/src/images/no-bookmarks.png" alt="No Bookmarks image">
      </div>
      <h2 class="no-bookmarks-title">No bookmarks found</h2>
    </div>
  `;
}

function initBookmarks() {
  // Get bookmarks from local storage
  const bookmarks = getBookmarksFromLocalStorage();

  const uniqueBookmarks = getUniqueBookmarks(bookmarks)

  if(uniqueBookmarks.length) addBookmarksToDOM(uniqueBookmarks);
  else addNoBookMarksMessageToDOM();
}

export default initBookmarks;