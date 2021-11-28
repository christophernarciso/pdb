const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

document.addEventListener('DOMContentLoaded', () =>
  wait(2000).then(() => {
    // Copyright purposes
    const footerDate = document.getElementsByClassName("footer__year");
    if (footerDate) {
      footerDate[0].innerHTML = new Date().getFullYear();
    }
  })
);


let scrollpos = window.scrollY;
let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
const imgs = document.querySelectorAll(".simg");

window.addEventListener('scroll', function () {
  scrollpos = window.scrollY;

  imgs.forEach(i => {
    if (scrollpos >= 350 || isMobile) {
      if (isMobile) {
        // console.log('Mobile device detected. Ignore fancy transitions!');
      } else {
        // console.log('Acceptable device detected! Handling transitions');
      }
      i.classList.remove('fade-out');
      i.classList.add('fade-in');
    } else {
      i.classList.remove('fade-in');
      i.classList.add('fade-out');
    }
  });
});

const sliders = document.querySelectorAll('.come-in');

const appearOptions = {
  threshold: 0,
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting)
        return;
    else {
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    }
  });
}
, appearOptions);

sliders.forEach(s => {
    appearOnScroll.observe(s);
});

