let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");
let disableScrollDetection = false;
const sidepanel = document.querySelector(".openbtn");
const logo = document.querySelector(".logo");

window.addEventListener("scroll", function () {
  if (disableScrollDetection) return;
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.classList.add("hidden-navbar");
    sidepanel.classList.add("hidden-sidepanel");
    logo.classList.add("hidden-sidepanel");
  } else {
    navbar.classList.remove("hidden-navbar");
    sidepanel.classList.remove("hidden-sidepanel");
    logo.classList.remove("hidden-sidepanel");
  }

  lastScrollTop = scrollTop;
});
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", function () {});
});
document.querySelectorAll(".sidepanel a").forEach((link) => {
  link.addEventListener("click", function () {
    document.getElementById("sidepanel").style.width = "0";
    logo.classList.remove("hidden-sidepanel");
  });
});

const toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.parentNode.classList.toggle("active");
  });
});
function myFunction() {
  document.getElementById("message").value = "";
  document.getElementById("name").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}
document.getElementById("s-b").addEventListener("click", myFunction);

window.addEventListener("DOMContentLoaded", () => {
  const starRating = new StarRating("form");
});

class StarRating {
  constructor(qs) {
    this.ratings = [
      { id: 1, name: "Terrible" },
      { id: 2, name: "Bad" },
      { id: 3, name: "OK" },
      { id: 4, name: "Good" },
      { id: 5, name: "Excellent" },
    ];
    this.rating = null;
    this.el = document.querySelector(qs);

    this.init();
  }
  init() {
    this.el?.addEventListener("change", this.updateRating.bind(this));

    // stop Firefox from preserving form data between refreshes
    try {
      this.el?.reset();
    } catch (err) {
      console.error("Element isn’t a form.");
    }
  }
  updateRating(e) {
    // clear animation delays
    Array.from(this.el.querySelectorAll(`[for*="rating"]`)).forEach((el) => {
      el.className = "rating__label";
    });

    const ratingObject = this.ratings.find((r) => r.id === +e.target.value);
    const prevRatingID = this.rating?.id || 0;

    let delay = 0;
    this.rating = ratingObject;
    this.ratings.forEach((rating) => {
      const { id } = rating;

      // add the delays
      const ratingLabel = this.el.querySelector(`[for="rating-${id}"]`);

      if (id > prevRatingID + 1 && id <= this.rating.id) {
        ++delay;
        ratingLabel.classList.add(`rating__label--delay${delay}`);
      }

      // hide ratings to not read, show the one to read
      const ratingTextEl = this.el.querySelector(`[data-rating="${id}"]`);

      if (this.rating.id !== id) ratingTextEl.setAttribute("hidden", true);
      else ratingTextEl.removeAttribute("hidden");
    });
  }
}
function openNav() {
  document.getElementById("sidepanel").style.width = "350px";
}

function closeNav() {
  document.getElementById("sidepanel").style.width = "0";
}
