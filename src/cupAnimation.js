document.addEventListener("DOMContentLoaded", function () {
  const cup = document.querySelector(".cup");

  // Set initial wave animation
  gsap.to(cup, {
    "--wave-background-position": "6000px 350px",
    duration: 10,
    ease: "linear",
    repeat: -1,
  });

  // Change water color after 1 second
  setTimeout(() => {
    gsap.to(cup, {
      "--wave-filter": "brightness(0.5) sepia(1) hue-rotate(-50deg)",
      duration: 2, // Transition to brown over 2 seconds
      ease: "linear",
    });
  }, 300);
});
