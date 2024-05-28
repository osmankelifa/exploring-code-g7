gsap.registerPlugin(ScrollTrigger);

const innerCircle = document.getElementById("innerCircle");
const outerCircle = document.getElementById("outerCircle");

let lastMouseY = 0;
let rotationSpeedInner = 0;
let rotationSpeedOuter = 0;
let isDragging = false;

function updateRotation() {
  if (rotationSpeedInner !== 0 || rotationSpeedOuter !== 0) {
    gsap.to(innerCircle, {
      rotation: `+=${rotationSpeedInner}`,
      ease: "none",
      duration: 0.1,
      transformOrigin: "50% 50%",
    });

    gsap.to(outerCircle, {
      rotation: `-=${rotationSpeedOuter}`,
      ease: "none",
      duration: 0.1,
      transformOrigin: "50% 50%",
    });

    rotationSpeedInner *= 0.95; // Deceleration factor for inner circle
    rotationSpeedOuter *= 0.95; // Deceleration factor for outer circle

    if (
      Math.abs(rotationSpeedInner) < 0.01 &&
      Math.abs(rotationSpeedOuter) < 0.01
    ) {
      rotationSpeedInner = 0;
      rotationSpeedOuter = 0;
    } else {
      requestAnimationFrame(updateRotation);
    }
  }
}

document.addEventListener("wheel", (event) => {
  const delta = event.deltaY * 0.05; // Adjust multiplier for desired speed
  rotationSpeedInner += delta;
  rotationSpeedOuter += delta;

  if (!isDragging) {
    isDragging = true;
    requestAnimationFrame(updateRotation);
  }
});

document.addEventListener("mousemove", (event) => {
  if (event.buttons === 1) {
    const deltaY = event.clientY - lastMouseY;
    rotationSpeedInner += deltaY * 0.05; // Adjust multiplier for desired speed
    rotationSpeedOuter += deltaY * 0.05;

    lastMouseY = event.clientY;

    if (!isDragging) {
      isDragging = true;
      requestAnimationFrame(updateRotation);
    }
  }
});

document.addEventListener("mousedown", (event) => {
  lastMouseY = event.clientY;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  const deltaY = touch.clientY - lastMouseY;
  rotationSpeedInner += deltaY * 0.05; // Adjust multiplier for desired speed
  rotationSpeedOuter += deltaY * 0.05;

  lastMouseY = touch.clientY;

  if (!isDragging) {
    isDragging = true;
    requestAnimationFrame(updateRotation);
  }
});

document.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  lastMouseY = touch.clientY;
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

// Automatically start rotation when the circle appears in the viewport
gsap.to(innerCircle, {
  rotation: 360,
  ease: "none",
  scrollTrigger: {
    trigger: ".page3-container",
    start: "top top",
    end: "bottom+=500 bottom", // Adjust this value to control the end point
    scrub: 1, // Adjust scrub value for desired speed
    markers: false, // Hide markers
    onEnter: () => {
      rotationSpeedInner = 0.5; // Initial speed for inner circle
      rotationSpeedOuter = 0.5; // Initial speed for outer circle
      requestAnimationFrame(updateRotation);
    },
  },
  transformOrigin: "center center",
});

gsap.to(outerCircle, {
  rotation: -360,
  ease: "none",
  scrollTrigger: {
    trigger: ".page3-container",
    start: "top top",
    end: "bottom+=500 bottom", // Adjust this value to control the end point
    scrub: 1, // Adjust scrub value for desired speed
    markers: false, // Hide markers
    onEnter: () => {
      rotationSpeedInner = 0.5; // Initial speed for inner circle
      rotationSpeedOuter = 0.5; // Initial speed for outer circle
      requestAnimationFrame(updateRotation);
    },
  },
  transformOrigin: "center center",
});
