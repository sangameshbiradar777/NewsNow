function lazyLoad() {
  // Get all the images with data-src attribute
  const images = document.querySelectorAll("[data-src]");

  const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: "200px",
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const image = entry.target;
      image.src = image.dataset.src;
      observer.unobserve(image);
    });
  }, observerOptions);

  images.forEach((image) => imageObserver.observe(image));
}

export default lazyLoad;
