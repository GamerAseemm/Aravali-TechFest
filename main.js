let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");
let disableScrollDetection = false;

window.addEventListener("scroll", function () {
  if (disableScrollDetection) return;
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.classList.add("hidden-navbar");
  } else {
    navbar.classList.remove("hidden-navbar");
  }

  lastScrollTop = scrollTop;
});
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", function () {});
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
