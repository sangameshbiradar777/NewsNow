  // Get the category nav link btn
  const categoriesBtn = document.querySelector('.btn--navbar-link--categories');

  // Get the category list item
  const categoryListElement = document.querySelector('.navbar__links__category-list');

function toggleCategoryList() {
  categoriesBtn.addEventListener('click', function() {
    categoryListElement.classList.toggle('category-list--hidden');
  })
}

function hideCategoryList() {
  categoryListElement.addEventListener('click', function(e) {
    if(!e.target.classList.contains('category-list__item__link')) return;

    this.classList.add("category-list--hidden");
  })

  document.body.addEventListener('click', function(e) {
    if(e.target == categoriesBtn) return;

    if(!categoryListElement.classList.contains('category-list--hidden')) {
      categoryListElement.classList.add('category-list--hidden');
    }
  })
}

function initCategories() {
  toggleCategoryList();

  hideCategoryList();
}

export default initCategories;