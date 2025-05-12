let startTime = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const timeSpent = document.getElementById("timeSpent");
  const confirmationMessage = document.getElementById("confirmationMessage");

  // Start time tracking
  form.addEventListener("focusin", () => {
    if (!startTime) {
      startTime = new Date();
    }
  });

  // Handle form submission
  window.handleSubmit = function (event) {
    event.preventDefault();

    const currentTime = new Date();
    const timeDiff = Math.round((currentTime - startTime) / 1000);
    timeSpent.textContent = timeDiff;

    confirmationMessage.classList.remove("hidden");
    form.reset();
    startTime = null;

    // Reset rating UI
    document.querySelectorAll('.rating span').forEach(star => {
      star.classList.remove('selected');
    });

    setTimeout(() => {
      confirmationMessage.classList.add("hidden");
    }, 4000);
  };

  // ⭐ Rating logic
  const ratingStars = document.querySelectorAll('.rating span');
  const ratingInput = document.getElementById('ratingValue');

  ratingStars.forEach(star => {
    star.addEventListener('click', () => {
      const value = star.getAttribute('data-value');
      ratingInput.value = value;

      // Remove previous selections
      ratingStars.forEach(s => s.classList.remove('selected'));

      // Highlight selected stars
      ratingStars.forEach(s => {
        if (s.getAttribute('data-value') <= value) {
          s.classList.add('selected');
        }
      });
    });

    // Optional hover effect (can be removed)
    star.addEventListener('mouseenter', () => {
      ratingStars.forEach(s => s.classList.remove('hovered'));
      ratingStars.forEach(s => {
        if (s.getAttribute('data-value') <= star.getAttribute('data-value')) {
          s.classList.add('hovered');
        }
      });
    });

    star.addEventListener('mouseleave', () => {
      ratingStars.forEach(s => s.classList.remove('hovered'));
    });
  });
});
