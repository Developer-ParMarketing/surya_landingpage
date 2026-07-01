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
});

document.querySelectorAll(".tcard").forEach(card => {

    const text = card.querySelector(".testimonial-text");
    const btn = card.querySelector(".read-more-btn");

    if (!btn) return;

    // Hide button for short testimonials
    if (text.scrollHeight <= text.clientHeight + 5) {
        btn.style.display = "none";
        return;
    }

    btn.addEventListener("click", () => {

        text.classList.toggle("expanded");

        btn.textContent = text.classList.contains("expanded")
            ? "Read Less"
            : "Read More";

    });

});

document.querySelector('.banner a').addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector('#lead-form').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});