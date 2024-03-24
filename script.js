window.onscroll = function() {scroll()};

// let projects = document.getElementById("projects").offsetTop + 150;
// window.onscroll = function() {
//   if (window.scrollY > 0) {
//  let opac = (window.scrollY / projects);
//     console.log(opac);
//   document.body.style.backgroundAttachment = "fixed";
//   document.body.style.backgroundSize = "cover";
//   document.body.style.background = "linear-gradient(rgba(30, 30, 30, " + opac + "), rgba(47, 61, 69, " + opac + ")), url('img/waves.png') no-repeat";
//   }
// }

document.addEventListener("DOMContentLoaded", function() {
  carousel();
});

function scroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progressScroll").style.width = scrolled + "%";
}

let slideIndex = 0;

function carousel() {
  let x = document.getElementsByClassName("quote");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 6000); 
}