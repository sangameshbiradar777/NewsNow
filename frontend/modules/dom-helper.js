function hideLoaderAndDisplayContent() {
  // Get the loader element
  const loaderElement = document.querySelector(".loader-container");
  const pageElement = document.querySelector(".page");

  // On page load hide the loader and show body
  loaderElement.style.display = "none";
  pageElement.style.display = "block";
}

function addErrorMessageToDOM(errorMessage, isMainGrid) {
  let mainElement;

  // Get the main element
  if (isMainGrid) {
    mainElement = document.querySelector(".main-grid");
    mainElement.style.display = "block";
  } else mainElement = document.querySelector("main");

  hideLoaderAndDisplayContent();

  // Set the main element to empty
  mainElement.innerHTML = "";

  // Create an error message element
  const errorMessageElement = document.createElement("div");
  errorMessageElement.setAttribute(
    "class",
    "error-container error-container--homepage"
  );

  errorMessageElement.innerHTML = `
    <p class="error__heading">Error: Too many requests</p>
    <div class="error__img-container">
      <img class="error__img" src="/frontend/src/images/error-image.png" alt="Error image">
    </div>
    <h3 class="error__message">${errorMessage}</h3>
  `;

  mainElement.append(errorMessageElement);
}

function stickCategoryToTop(isCategory = false) {
  // Get the category element
  const categoriesElement = document.querySelector(".navbar__categories");

  let mainElement;

  if (isCategory) mainElement = document.querySelector(".main-grid");
  else mainElement = document.querySelector("main");

  // Get the height of navbar categories
  let { top, height } = categoriesElement.getBoundingClientRect();

  // We cannot get the padding top property for the main element in the category section,
  // because it is set with the css variable so hard coding the actual padding top value to height
  if (isCategory) height += 24;

  function stickyNavbar() {
    if (this.scrollY >= top) {
      categoriesElement.classList.add("sticky");
      mainElement.style.paddingTop = height + "px";
    } else {
      categoriesElement.classList.remove("sticky");
      if (isCategory) mainElement.style.paddingTop = "24px";
      else mainElement.style.paddingTop = 0;
    }

    console.log("fired");
  }

  window.addEventListener("scroll", function () {
    throttle(stickyNavbar, 200);
  });

  let timerId;

  function throttle(func, delay) {
    if (timerId) return;

    timerId = setTimeout(function () {
      func.call(this);
      timerId = undefined;
    }, delay);
  }
}

export {
  hideLoaderAndDisplayContent,
  addErrorMessageToDOM,
  stickCategoryToTop,
};
