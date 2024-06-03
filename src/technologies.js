document.addEventListener("DOMContentLoaded", function () {
  // Register GSAP ScrollTrigger for scroll-triggered animations
  gsap.registerPlugin(ScrollTrigger);

  // Animate images with GSAP
  document.querySelectorAll(".c_animated-img img").forEach((img, index) => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img.parentNode,
        start: "top center+=100", // Adjust trigger point
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: index % 2 === 0 ? -300 : 300, // Alternate direction based on index
      duration: 3, // Duration of the animation
    });
  });

  // Animate corresponding text sections
  document.querySelectorAll(".p_img-text").forEach((text, index) => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text.parentNode,
        start: "top center+=100", // Match start point with image
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: index % 2 === 0 ? 300 : -300, // Opposite direction to image
      duration: 3, // Duration of the animation
    });
  });

  // Add event listeners to h3 headers to toggle visibility of paragraphs
  document.querySelectorAll(".p_img-text h3").forEach(function (header) {
    header.addEventListener("click", function () {
      // Locate the paragraph following this header
      var paragraph = header.nextElementSibling;
      // Toggle the display state of the paragraph
      if (paragraph.style.maxHeight) {
        paragraph.style.maxHeight = null;
        paragraph.style.display = "none";
      } else {
        paragraph.style.display = "block";
        paragraph.style.maxHeight = paragraph.scrollHeight + "px"; // Animate expansion
      }
    });
  });
});
