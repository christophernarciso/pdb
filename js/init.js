const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

document.addEventListener('DOMContentLoaded', () =>
  wait(2000).then(() => {
    // Copyright purposes
    const footerDate = document.getElementsByClassName("footer__year");
    if (footerDate) {
      footerDate[0].innerHTML = new Date().getFullYear();
    }
  }));
