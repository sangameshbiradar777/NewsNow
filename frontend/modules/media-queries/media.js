function initNavbarMedia() {
  // Navbar media queries
  const navbarItemsMedia = window.matchMedia('(max-width: 700px');

  const navbarItemsElement = document.querySelector('.navbar__items');
  const navbarTopElement = document.querySelector('.navbar__top');

  if(navbarItemsMedia.matches) {
    const parentHeight = navbarTopElement.getBoundingClientRect().height;
    navbarItemsElement.style.top = parentHeight + 'px';
  }

  // Show or hide navbar links
  const hamburgerBtn = document.querySelector('.navbar__hamburger');

  hamburgerBtn.addEventListener('click', function() {
    this.classList.toggle('navbar__hamburger--active')
    navbarItemsElement.classList.toggle('show-navbar-items');
    document.body.classList.toggle('disable-scroll');
  })
}

export {initNavbarMedia};