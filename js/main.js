document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Spinner
    setTimeout(function () {
        const spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.classList.remove('show');
        }
    }, 1);

    // WOW.js initialization (assumes WOW.js is included)
    if (typeof WOW === 'function') {
        new WOW().init();
    }

    // Testimonial carousel (requires Owl Carousel and jQuery)
    if (typeof $ !== "undefined" && typeof $.fn.owlCarousel === "function") {
        const testimonialCarousel = document.querySelector(".testimonial-carousel");
        if (testimonialCarousel) {
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                items: 1,
                smartSpeed: 1500,
                dots: true,
                dotsData: true,
                loop: true,
                margin: 25,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ]
            });
        }
    }

    // Facts counter (requires counterUp and jQuery)
    if (typeof $ !== "undefined" && typeof $.fn.counterUp === "function") {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 5,
            time: 2000
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop?.classList.add('visible');
            backToTop?.style.setProperty('display', 'block');
            backToTop?.style.setProperty('opacity', '1');
        } else {
            backToTop?.style.setProperty('opacity', '0');
            backToTop?.style.setProperty('display', 'none');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop default submit

    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        form.style.display = "none"; // hide form
        status.innerHTML = `<div class="alert alert-success">✅ Thank you! Your message has been sent.</div>`;
      } else {
        status.innerHTML = `<div class="alert alert-danger">❌ Error: ${result.message}</div>`;
      }
    } catch (error) {
      status.innerHTML = `<div class="alert alert-danger">⚠️ Something went wrong. Please try again.</div>`;
    }
  });