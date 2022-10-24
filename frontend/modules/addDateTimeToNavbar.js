function addDateTimeToNavbar() {
  // Get the date element from the DOM
  const dateElement = document.querySelector(".navbar__date");

  // Get the time element from the DOM
  const timeElement = document.querySelector(".navbar__time");

  const formattedDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
  console.log(formattedDate)

  dateElement.innerHTML = formattedDate;

  setInterval(() => {
    // Get the current Date
    const date = new Date();

    timeElement.innerHTML = date.toLocaleTimeString();
  }, 1000);
}

export { addDateTimeToNavbar };