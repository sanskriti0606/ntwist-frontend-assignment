let startTime = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const timeSpent = document.getElementById("timeSpent");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const ratingInput = document.getElementById("ratingValue"); // <- This must exist in HTML

  form.addEventListener("focusin", () => {
    if (!startTime) {
      startTime = new Date();
    }
  });

  window.handleSubmit = function (event) {
    event.preventDefault();

    const currentTime = new Date();
    const timeDiff = Math.round((currentTime - startTime) / 1000);
    timeSpent.textContent = timeDiff;

    confirmationMessage.classList.remove("hidden");
    form.reset();
    startTime = null;

    document.querySelectorAll('.rating span').forEach(star => {
      star.classList.remove('selected');
    });

    setTimeout(() => {
      confirmationMessage.classList.add("hidden");
    }, 4000);
  };

  const ratingStars = document.querySelectorAll('.rating span');

  ratingStars.forEach(star => {
    star.addEventListener('click', () => {
      const value = star.getAttribute('data-value');
      if (ratingInput) {
        ratingInput.value = value;
      }

      ratingStars.forEach(s => s.classList.remove('selected'));

      ratingStars.forEach(s => {
        if (s.getAttribute('data-value') <= value) {
          s.classList.add('selected');
        }
      });
    });

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
