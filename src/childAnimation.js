document.addEventListener("DOMContentLoaded", function () {
  const childGrid = document.querySelector(".child-grid");
  const page6 = document.getElementById("page6");
  let timeline = gsap.timeline({ paused: true });

  function createGrid() {
    childGrid.innerHTML = ""; // Clear existing content to reset the grid
    for (let i = 0; i < 5; i++) {
      const img = document.createElement("img");
      img.src = "../demo/img/child.svg";
      img.alt = "child";
      img.classList.add("child-svg");
      childGrid.appendChild(img);
    }
  }

  function setupAnimation() {
    const children = Array.from(childGrid.children);
    timeline.clear();
    timeline
      .set(children, { opacity: 1, transform: "translateY(0)" }) // Ensure all children are fully visible initially
      .to(children, {
        opacity: 0,
        duration: 1,
        stagger: {
          each: 1.5,
          from: "end", // Start animation from the last child (rightmost)
        },
        onComplete: () => {
          children.forEach((child) => child.remove());
          createGrid(); // Recreate the grid once all children are removed
          setupAnimation(); // Setup animation again
        },
      });
  }

  page6.addEventListener("mouseenter", function () {
    if (!timeline.isActive()) {
      createGrid(); // Ensure grid is created
      setupAnimation();
      timeline.restart(); // Restart the timeline
    }
  });

  // No need to clear the grid on mouseleave, remove mouseleave handler
  // Initial setup
  createGrid();
  setupAnimation();
});
