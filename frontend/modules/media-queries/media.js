function initNavbarMedia() {
  // Navbar media queries
  const navbarItemsMedia = window.matchMedia("(max-width: 700px)");

  const navbarItemsElement = document.querySelector(".navbar__items");
  const navbarTopElement = document.querySelector(".navbar__top");

  if (navbarItemsMedia.matches) {
    const parentHeight = navbarTopElement.getBoundingClientRect().height;
    navbarItemsElement.style.top = parentHeight + "px";
  }

  // Show or hide navbar links
  const hamburgerBtn = document.querySelector(".navbar__hamburger");

  hamburgerBtn.addEventListener("click", function () {
    this.classList.toggle("navbar__hamburger--active");
    navbarItemsElement.classList.toggle("show-navbar-items");
    document.body.classList.toggle("disable-scroll");
  });
}

function initResponsiveFilters() {
  const responsiveFilterMedia = window.matchMedia("(max-width: 800px)");

  if (!responsiveFilterMedia.matches) return;

  const responstiveFilterBtn = document.querySelector(
    ".btn--responsive-filter"
  );
  const filtersCloseBtn = document.querySelector(".btn--close-filters");

  function toggleFilters() {
    const filtersElement = document.querySelector(".filters");
    const pageElement = document.querySelector(".page");
    filtersElement.classList.toggle("filters--hidden");
    pageElement.classList.toggle("filters-active");
  }

  responstiveFilterBtn.addEventListener("click", toggleFilters);
  filtersCloseBtn.addEventListener("click", toggleFilters);

  const filterSwitchBtns = document.querySelectorAll(".btn--filter-switch");

  filterSwitchBtns.forEach((filterSwitchBtn) => {
    filterSwitchBtn.addEventListener("click", function (e) {
      // Get the target element
      const targetFilterSectionId = e.target.dataset.target;
      const targetFilterSection = document.querySelector(
        `.${targetFilterSectionId}`
      );

      // Get the active filter section
      const activeFilterSection = document.querySelector(
        ".filters__section--active"
      );

      if (activeFilterSection === targetFilterSection) return;

      activeFilterSection.classList.remove("filters__section--active");
      targetFilterSection.classList.add("filters__section--active");
    });
  });
}

export { initNavbarMedia, initResponsiveFilters };
