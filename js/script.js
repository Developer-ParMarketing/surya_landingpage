/* Surya Hospitals — minimal interactions
   The booking form posts to process.php (same backend as your live site).
   No JS submission handling needed; the server handles it. */

document.addEventListener('DOMContentLoaded', function () {
    // Dynamic copyright year
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // Light front-end validation before the form posts to process.php
    var form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                form.reportValidity();
            }
        });
    }

    var bannerLink = document.querySelector('.banner a');
    if (bannerLink) {
        bannerLink.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector('#lead-form');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

/* ----------------------------------------------------------------
   Testimonial "Read More" — Swiper (loop:true) clones every slide
   into extra DOM nodes. Those clones share the same classes as the
   originals but are separate elements, so a listener bound once at
   load never reaches them. Event delegation on the swiper container
   fixes that: one listener catches clicks from originals and clones
   alike, and refreshReadMoreButtons() re-checks clamping whenever
   Swiper creates new clones (after init and on resize).
------------------------------------------------------------------- */
function refreshReadMoreButtons() {
    document.querySelectorAll('.testimonialSwiper .tcard').forEach(function (card) {
        var text = card.querySelector('.testimonial-text');
        var btn = card.querySelector('.read-more-btn');
        if (!text || !btn) return;

        // Skip cards already expanded by the user
        if (text.classList.contains('expanded')) return;

        var isClamped = text.scrollHeight > text.clientHeight + 2;
        btn.style.display = isClamped ? '' : 'none';
    });
}

document.addEventListener('click', function (e) {
    var btn = e.target.closest('.read-more-btn');
    if (!btn) return;

    var card = btn.closest('.tcard');
    var text = card && card.querySelector('.testimonial-text');
    if (!text) return;

    text.classList.toggle('expanded');
    btn.textContent = text.classList.contains('expanded') ? 'Read Less' : 'Read More';
});

window.addEventListener('load', refreshReadMoreButtons);
window.addEventListener('resize', function () {
    clearTimeout(window.__ttReadMoreResize);
    window.__ttReadMoreResize = setTimeout(refreshReadMoreButtons, 150);
});

/* Swiper init lives in index.html (needs the Swiper library loaded
   first). It calls refreshReadMoreButtons() itself once slides
   (including loop clones) exist in the DOM. */


/* FAQ Accordion - Only one open at a time */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    item.addEventListener("toggle", function () {
        if (this.open) {
            faqItems.forEach((otherItem) => {
                if (otherItem !== this) {
                    otherItem.open = false;
                }
            });
        }
    });
});