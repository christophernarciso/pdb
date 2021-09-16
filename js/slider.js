document.addEventListener('DOMContentLoaded', function () {

    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(function (carousel) {

        const ele = carousel.querySelector('ul');
        const bullets = carousel.querySelectorAll('ol li');
        const nextarrow = carousel.querySelector('.next');
        const prevarrow = carousel.querySelector('.prev');
        bullets[0].classList.add('selected');

        const setSelected = function () {
            bullets.forEach(function (bullet) {
                bullet.classList.remove('selected');
            });
            let nthchild = (Math.round(ele.scrollLeft / carousel.scrollWidth) + 1);
            carousel.querySelector('ol li:nth-child(' + nthchild + ')').classList.add('selected');
        }

        const nextSlide = function () {
            if (!carousel.querySelector('ol li:last-child').classList.contains('selected')) {
                carousel.querySelector('ol li.selected').nextElementSibling.querySelector('a').click();
                ele.scrollLeft = ele.scrollLeft + carousel.scrollWidth;
            } else {
                carousel.querySelector('ol li:first-child a').click();
                ele.scrollLeft = 0;
            }
        }

        const prevSlide = function () {
            if (!carousel.querySelector('ol li:first-child').classList.contains('selected')) {
                carousel.querySelector('ol li.selected').previousElementSibling.querySelector('a').click();
                ele.scrollLeft = ele.scrollLeft - carousel.scrollWidth;
            } else {
                carousel.querySelector('ol li:last-child a').click();
                ele.scrollLeft = ele.scrollWidth - carousel.scrollWidth;
            }
        }

        // Attach the handlers
        ele.addEventListener("scroll", setSelected);
        nextarrow.addEventListener("click", nextSlide);
        prevarrow.addEventListener("click", prevSlide);

        //setInterval for autoplay
        if (carousel.getAttribute('duration')) {
            setInterval(function () {
                if (ele != document.querySelector(".carousel:hover ul")) {
                    if (ele.scrollWidth > ele.scrollLeft + carousel.scrollWidth) {
                        ele.scrollLeft = ele.scrollLeft + carousel.scrollWidth;
                    } else ele.scrollLeft = 0;
                }
            }, carousel.getAttribute('duration'));
        }

    }); //end foreach

    //Smooth scrolling with links
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function (event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
      });

}); //end onload