window.onscroll = function () {
  progressScroll();
};

function progressScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progressScroll").style.width = scrolled + "%";
}

document.addEventListener("DOMContentLoaded", function () {
  carousel();
});

let slideIndex = 0;
const quotes = [
  "I knew a man once who said, 'Death smiles at us all. All a man can do is smile back.'",
  "This player dreamed of sunlight and trees. Of fire and water. It dreamed it created.",
  "And the player was the universe. And the player was love.",
  "I would have gone with you to end, to the very fires of Mordor.",
  "Open your heart.",
  "Not all those who wander are lost.",
  "The world is not in your books and maps. It's out there.",
  "People call those imperfections, but no, that’s the good stuff.",
  "But now I'm not so sure I believe in beginnings and endings. There are days that define your story beyond your life.",
];
const authors = [
  "— Maximus, <em>Gladiator</em>",
  "— Julian Gough, <em>Minecraft</em>",
  "— Julian Gough, <em>Minecraft</em>",
  "— Aragorn, <em>The Lord of the Rings</em>",
  "— Kratos, <em>God of War: Ragnarok</em>",
  "— Bilbo Baggins, <em>The Lord of the Rings</em>",
  "— Gandalf, <em>The Hobbit</em>",
  "— Sean, <em>Good Will Hunting</em>",
  "— Louise, <em>The Arrival</em>",
];
function carousel() {
  let quote = document.getElementById("quote");
  let author = document.getElementById("author");
  quote.style.animation = "none"; //disable animation
  author.style.animation = "none"; //disable animation

  setTimeout(() => {
    quote.textContent = quotes[slideIndex]; //set text to quote
    author.innerHTML = authors[slideIndex]; // Set text to author
    quote.style.animation = ""; //enable animation after text change
    author.style.animation = ""; //enable animation after text change
  }, 10);

  slideIndex++;
  if (slideIndex >= quotes.length) slideIndex = 0;

  setTimeout(carousel, 6000);
}

const fadeIn = document.querySelectorAll(".fade-in");

const options = {
  threshold: 1,
  rootMargin: "0px 0px -50px 0px",
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

document.getElementById("hamburger").addEventListener("click", function () {
  const mobilebar = document.getElementById("mobilebar");
  mobilebar.classList.toggle("show");
  this.classList.toggle("active");
});
