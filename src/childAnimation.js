document.addEventListener("DOMContentLoaded", function () {
  const childGrid = document.querySelector(".child-grid");
  const page6 = document.getElementById("page6");
  let timeline = gsap.timeline({ paused: true });

  // Create a 1x7 grid (7 images)
  function createGrid() {
    childGrid.innerHTML = ""; // Clear any existing content
    for (let i = 0; i < 7; i++) {
      const img = document.createElement("img");
      img.src = "img/child.svg";
      img.alt = "child";
      img.classList.add("child-svg");
      childGrid.appendChild(img);
    }
  }

  function setupAnimation() {
    const children = Array.from(childGrid.children);
    timeline
      .clear()
      .set(children, { opacity: 1 }) // Ensure all children are fully visible initially
      .to(children.slice(-4), {
        // Select only the last four children for the animation
        opacity: 0,
        duration: 1,
        stagger: {
          each: 1.5,
          from: "end", // Start animation from the last child (rightmost)
        },
        onComplete: () => children.slice(-4).forEach((child) => child.remove()),
      });
  }

  // Re-create and restart the animation each time the mouse enters
  page6.addEventListener("mouseenter", function () {
    createGrid(); // Re-create the grid every time to start fresh
    setupAnimation();
    timeline.restart();
  });

  // Ensure that timeline is paused and reset when the mouse leaves
  page6.addEventListener("mouseleave", function () {
    timeline.pause();
    childGrid.innerHTML = ""; // Optionally clear the grid when mouse leaves
  });

  // Initial setup
  createGrid();
  setupAnimation();
});
