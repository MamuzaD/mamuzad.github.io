window.onscroll = function () {
  progressScroll();
};

let slideIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  carousel();
});

function progressScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progressScroll").style.width = scrolled + "%";
}

function bgScroll() {

}

function carousel() {
  let x = document.getElementsByClassName("quote");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) slideIndex = 1;
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 6000);
}

const fadeIn = document.querySelectorAll(".fade-in");

const options = {
  threshold: 1,
  rootMargin: "0px 0px -75px 0px",
};

const appearOnScroll = new IntersectionObserver(
  function (entries, appearOnScroll) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  options,
);

fadeIn.forEach((fade) => {
  appearOnScroll.observe(fade);
});

