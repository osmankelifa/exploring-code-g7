document.addEventListener("DOMContentLoaded", function () {
  const childGrid = document.querySelector(".child-grid");

  // Create a 1x3 grid (3 images)
  function createGrid() {
    for (let i = 0; i < 3; i++) {
      const img = document.createElement("img");
      img.src = "img/child.svg";
      img.alt = "child";
      img.classList.add("child-svg");
      childGrid.appendChild(img);
    }
  }

  function removeOneChild() {
    const children = document.querySelectorAll(".child-grid img");
    if (children.length > 0) {
      fadeOut(children[children.length - 1]); // Remove the last child in the grid
    } else {
      // Recreate the grid once all children are removed
      setTimeout(() => {
        childGrid.innerHTML = ""; // Clear the grid content
        createGrid();
      }, 1000);
    }
  }

  function fadeOut(element) {
    let opacity = 1;
    const fadeDuration = 50; // Adjust the duration of fade out here (smaller value = faster fade out)
    const fade = setInterval(function () {
      if (opacity <= 0) {
        clearInterval(fade);
        element.remove();
      } else {
        opacity -= 0.05;
        element.style.opacity = opacity;
      }
    }, fadeDuration);
  }

  createGrid(); // Initial grid creation
  setInterval(removeOneChild, 600); // Adjust the interval here (smaller value = faster removal)
});
