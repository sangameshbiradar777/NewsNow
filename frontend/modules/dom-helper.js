function hideLoaderAndDisplayContent() {
  // Get the loader element
  const loaderElement = document.querySelector('.loader-container');
  const pageElement = document.querySelector('.page');
      
  // On page load hide the loader and show body
  loaderElement.style.display = 'none';
  pageElement.style.display = 'block';
}

function addErrorMessageToDOM(errorMessage) {
  // Get the main element
  const mainElement = document.querySelector('main');

  // Set the main element to empty
  mainElement.innerHTML = "";

  // Create an error message element
  const errorMessageElement = document.createElement("div");
  errorMessageElement.setAttribute("class", "error-container error-container--homepage");

  errorMessageElement.innerHTML = `
    <p class="error__heading">Error: Too many requests</p>
    <div class="error__img-container">
      <img class="error__img" src="/frontend/src/images/error-image.png" alt="Error image">
    </div>
    <h3 class="error__message">${errorMessage}</h3>
  `;

  mainElement.append(errorMessageElement);
}

export {hideLoaderAndDisplayContent, addErrorMessageToDOM};