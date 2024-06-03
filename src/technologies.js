document.addEventListener("DOMContentLoaded", function () {
  // Scroll-triggered animations using GSAP for both images and text
  gsap.registerPlugin(ScrollTrigger);

  // Animate images
  document.querySelectorAll(".c_animated-img img").forEach((img, index) => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img.parentNode,
        start: "top center+=100", // Adjust so it triggers when desired
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: index % 2 === 0 ? -300 : 300, // Slide from left or right based on index
      duration: 3, // Slower animation for dramatic effect
    });
  });

  // Animate corresponding text
  document.querySelectorAll(".p_img-text").forEach((text, index) => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text.parentNode,
        start: "top center+=100", // Ensure it starts at the same point as the image
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: index % 2 === 0 ? 300 : -300, // Opposite direction to corresponding image
      duration: 3, // Match duration for synchronized effect
    });
  });
});
