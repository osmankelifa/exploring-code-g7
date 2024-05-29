document.addEventListener("DOMContentLoaded", function () {
  const childGrid = document.querySelector(".child-grid");
  const page6 = document.getElementById("page6");
  let timeline = gsap.timeline({ paused: true });

  function createGrid() {
    childGrid.innerHTML = ""; // Clear existing content to reset the grid
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
        opacity: 0,
        duration: 1,
        stagger: {
          each: 1.5,
          from: "end", // Start animation from the last child (rightmost)
        },
        onComplete: () => {
          children.slice(-4).forEach((child) => child.remove());
        },
      });
  }

  page6.addEventListener("mouseenter", function () {
    if (!timeline.isActive()) {
      // Check if the timeline is not currently active
      createGrid(); // Re-create the grid every time to start fresh
      setupAnimation();
      timeline.restart(); // Restart the timeline
    }
  });

  page6.addEventListener("mouseleave", function () {
    timeline.pause(); // Simply pause the timeline
    timeline.clear(); // Optionally clear the timeline if needed
    childGrid.innerHTML = ""; // Clear the grid to ensure a fresh start next time
  });

  // Initial setup
  createGrid();
  setupAnimation();
});
