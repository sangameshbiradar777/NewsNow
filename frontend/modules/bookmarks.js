import { newsImageFallbackURL } from "./config.js";
import { shareNewsArticle, addBookmarksToLocalStorage } from "./share-news.js";

function getBookmarksFromLocalStorage() {
  if (!localStorage.getItem("bookmarks")) {
    return [];
  }

  return JSON.parse(localStorage.getItem("bookmarks"));
}

function addBookmarksToDOM(bookmarks) {
  if (bookmarks.length === 0) {
    addNoBookMarksMessageToDOM();
    return;
  }

  // Get the bookmarks element
  const bookmarksElement = document.querySelector(".bookmarks");

  bookmarksElement.innerHTML = "";

  // Loop over bookmarks and add them to DOM
  bookmarks.forEach((bookmark) => {
    // Create a bookmark card element
    const bookmarkCardElement = document.createElement("div");
    bookmarkCardElement.setAttribute("class", "bookmarks__card");

    // Get the inner html of bookmark card element
    bookmarkCardElement.innerHTML = getBookmarksCardInner(bookmark);

    bookmarksElement.append(bookmarkCardElement);
  });
}

function getBookmarksCardInner(bookmark) {
  return `
    <div class="action-container">
      <button id="${bookmark.id}" class="btn action__btn action__btn--share">
        <ion-icon class="action__icon" name="share-social-outline"></ion-icon>
      </button>
      <button id="${bookmark.id}" class="btn action__btn action__btn--delete-bookmark">
        <ion-icon class="action__icon" name="trash-outline"></ion-icon>
      </button>
    </div>
    <a href="${bookmark.URL}" class="bookmarks__card__link">
      <div class="bookmarks__card__img-container">
        <img src="${bookmark.imageURL}"
         alt="News image"
         onerror="this.src='${newsImageFallbackURL}'"
         >
      </div>

      <div class="bookmarks__card__text-container">

        <span class="bookmarks__card__author">By ${bookmark.author}, ${bookmark.date}</span>
        <h2 class="bookmarks__card__title">
          ${bookmark.title}
        </h2>
        <span class="bookmarks__card__bookmarked-on"><ion-icon name="bookmark"></ion-icon> ${bookmark.bookmarkedOn}</span>
      </div>
    </a>
  `;
}

function getUniqueBookmarks(bookmarks) {
  const bookmarksMap = new Map();

  bookmarks.forEach((bookmark) => {
    if (bookmarksMap.get(bookmark.title)) {
      bookmarksMap.set(bookmark.title, bookmarksMap.get(bookmark.title) + 1);
    } else {
      bookmarksMap.set(bookmark.title, 1);
    }
  });

  let uniqueObjects = [];

  bookmarks.forEach((bookmark) => {
    if (bookmarksMap.get(bookmark.title)) {
      uniqueObjects.push(bookmark);
      bookmarksMap.delete(bookmark.title);
    }
  });

  return uniqueObjects;
}

function addNoBookMarksMessageToDOM() {
  // Get bookmarks element
  const bookmarksElement = document.querySelector(".bookmarks");

  bookmarksElement.innerHTML = `
    <div class="no-bookmarks-container">
      <div class="no-bookmarks-img-container">
        <img src="../src/images/no-bookmarks.png" alt="No Bookmarks image">
      </div>
      <h2 class="no-bookmarks-title">No bookmarks found</h2>
    </div>
  `;
}

function shareBookmarkedArticle() {
  document.body.addEventListener("click", function (e) {
    if (e.target.closest(".action__btn--share") === null) return;

    const shareBtn = e.target.closest(".action__btn--share");

    // Get the target news article id
    const targetId = shareBtn.id;

    const targetNewsArticle = getBookmarksFromLocalStorage().find(
      (bookmark) => bookmark.id === targetId
    );

    shareNewsArticle(targetNewsArticle);
  });
}

function deleteBookmark() {
  document.body.addEventListener("click", function (e) {
    if (e.target.closest(".action__btn--delete-bookmark") === null) return;

    const deleteBookmarkBtn = e.target.closest(".action__btn--delete-bookmark");

    const targetId = deleteBookmarkBtn.id;

    const updatedBookmarks = getBookmarksFromLocalStorage().filter(
      (bookmark) => bookmark.id !== targetId
    );

    addBookmarksToLocalStorage(updatedBookmarks);

    addBookmarksToDOM(updatedBookmarks);
  });
}

function initBookmarks() {
  // Get bookmarks from local storage
  const bookmarks = getBookmarksFromLocalStorage();

  const uniqueBookmarks = getUniqueBookmarks(bookmarks);

  if (uniqueBookmarks.length) addBookmarksToDOM(uniqueBookmarks);
  else addNoBookMarksMessageToDOM();

  shareBookmarkedArticle();

  deleteBookmark();
}

export default initBookmarks;
