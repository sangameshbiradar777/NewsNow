function putCarouselItemsSidebySide(carouselInnerElement) {
  // Get all the carousel elements
  const carouselItemElements = Array.from(carouselInnerElement.children);

  // Get the width of one carousel item
  const carouselItemElementWidth = `${
    carouselItemElements[0].getBoundingClientRect().width
  }`;

  // Loop over all the carousel item elements and change its positions
  carouselItemElements.forEach((carouselItemElement, index) => {
    // Formula to make all the carousel items side by side => amountOfWidthToMove * index
    // If the width of carousel items is 200px, then first carousel item should be at 0th px,
    // second item at 200th px, third item should be at 400th px and so on...

    carouselItemElement.style.left = `${carouselItemElementWidth * index}px`;
  });
}

function goToNextCarouselItem(carouselInnerElement) {
  // Get the next carousel button from the DOM
  const btnCarouselNext = document.querySelector(".carousel__btn--right");

  btnCarouselNext.addEventListener("click", function () {
    // Get the current carousel item
    const currentCarouselItemElement =
      carouselInnerElement.querySelector(".active");

    // Get the next carousel item
    const targetCarouselItemElement =
      currentCarouselItemElement.nextElementSibling;

    moveCarouselInner(
      carouselInnerElement,
      currentCarouselItemElement,
      targetCarouselItemElement
    );

    // Update carousel btn elements
    updateCarouselBtn(carouselInnerElement, targetCarouselItemElement);

    // Find the index of target carousel item element
    const targetIndex = getIndexOfTargetCarouselItem(
      carouselInnerElement,
      targetCarouselItemElement
    );

    // Update carousel nav dots
    updateCarouselNav(targetIndex);
  });
}

function goToPrevCarouselItem(carouselInnerElement) {
  // Get the next carousel button from the DOM
  const btnCarouselPrev = document.querySelector(".carousel__btn--left");

  btnCarouselPrev.addEventListener("click", function () {
    // Get the current carousel item
    const currentCarouselItemElement =
      carouselInnerElement.querySelector(".active");

    // Get the previous carousel item element
    const targetCarouselItemElement =
      currentCarouselItemElement.previousElementSibling;

    moveCarouselInner(
      carouselInnerElement,
      currentCarouselItemElement,
      targetCarouselItemElement
    );

    // Update carousel btn elements
    updateCarouselBtn(carouselInnerElement, targetCarouselItemElement);

    // Find the index of target carousel item element
    const targetIndex = getIndexOfTargetCarouselItem(
      carouselInnerElement,
      targetCarouselItemElement
    );

    // Update carousel nav dots
    updateCarouselNav(targetIndex);
  });
}

function getIndexOfTargetCarouselItem(
  carouselInnerElement,
  targetCarouselItemElement
) {
  return Array.from(carouselInnerElement.children).findIndex(
    (carouselItemElement) => {
      return carouselItemElement === targetCarouselItemElement;
    }
  );
}

function moveCarouselInner(
  carouselInnerElement,
  currentCarouselItemElement,
  targetCarouselItemElement
) {
  // Move the carousel inner element according the left value of target carousel item
  carouselInnerElement.style.transform = `translateX(-${targetCarouselItemElement.style.left})`;

  // Update the active class
  currentCarouselItemElement.classList.remove("active");
  targetCarouselItemElement.classList.add("active");
}

function updateCarouselBtn(carouselInnerElement, targetCarouselItemElement) {
  // Find the index of targetCarouselItemElement
  const currentItemIndex = Array.from(carouselInnerElement.children).findIndex(
    (carouselItemElement) => {
      return carouselItemElement === targetCarouselItemElement;
    }
  );

  // Get the prev carousel button from DOM
  const prevCarouselBtn = document.querySelector(".carousel__btn--left");

  // Get the next carousel button from DOM
  const nextCarouselBtn = document.querySelector(".carousel__btn--right");

  if (currentItemIndex === 0) {
    // Add the hidden class to prevCarouselBtn
    prevCarouselBtn.classList.add("hidden");
  } else {
    prevCarouselBtn.classList.remove("hidden");
  }

  if (currentItemIndex === carouselInnerElement.children.length - 1) {
    // Add the hiddren class to nextCarouselBtn
    nextCarouselBtn.classList.add("hidden");
  } else {
    nextCarouselBtn.classList.remove("hidden");
  }
}

// Implementation of the function updateCarouselNav
function updateCarouselNav(targetIndex) {
  // Get the carouselNavElement from the dom
  const carouselNavElement = document.querySelector(".carousel__nav");

  // Get the current active dot
  const activeDotElement = carouselNavElement.querySelector(".active");

  // Get the target dot
  const targetDotElement = carouselNavElement.children[targetIndex];

  // Update the dots
  activeDotElement.classList.remove("active");
  targetDotElement.classList.add("active");
}

export default function initCarousel() {
  // Get the carousel element from the DOM
  const carouselElement = document.querySelector(".carousel");

  // Get the carousel inner element
  const carouselInnerElement = document.querySelector(".carousel__inner");

  // Put all the carousel item side by side
  putCarouselItemsSidebySide(carouselInnerElement);

  // Add move to next carousle item functionality
  goToNextCarouselItem(carouselInnerElement);

  // Add move to prev carousel item functionality
  goToPrevCarouselItem(carouselInnerElement);
}
