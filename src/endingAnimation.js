document.addEventListener("DOMContentLoaded", function () {
  const endingPart = document.getElementById("ending-part");

  function playAnimation() {
    const dropContainer = endingPart.querySelector(".drop-container");
    const drop = dropContainer.querySelector(".drop");
    const h2 = endingPart.querySelector("h2");

    drop.style.animation = "none";
    h2.style.animation = "none";
    dropContainer.style.animation = "none";

    // Trigger reflow to restart the animation
    void drop.offsetWidth;
    void h2.offsetWidth;
    void dropContainer.offsetWidth;

    drop.style.animation = "drip 4s forwards";
    h2.style.animation = "appear 2s 2.5s forwards";
    dropContainer.style.animation = "";
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function checkAndPlayAnimation() {
    if (isElementInViewport(endingPart)) {
      playAnimation();
    }
  }

  // Using IntersectionObserver to ensure the animation plays when the element is in the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playAnimation();
        }
      });
    },
    {
      threshold: 0.5, // Adjust this value as needed
    }
  );

  observer.observe(endingPart);

  // Fallback to check on scroll if IntersectionObserver is not supported
  if (!("IntersectionObserver" in window)) {
    window.addEventListener("scroll", checkAndPlayAnimation);
    checkAndPlayAnimation();
  }
});
