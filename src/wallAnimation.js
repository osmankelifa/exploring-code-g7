document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const runningPerson = document.getElementById("runningPerson");
  const wall = document.getElementById("wall");
  const toilet = document.getElementById("toilet");

  gsap.set(wall, { y: -200, opacity: 0 });

  ScrollTrigger.create({
    trigger: "#page4",
    start: "top center",
    onEnter: () => {
      // Show running person and toilet
      gsap.to([runningPerson, toilet], { opacity: 1, duration: 1 });

      // Animate wall dropping from the top and shaking
      gsap.to(wall, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
        onComplete: () => {
          gsap.to(wall, {
            x: -10,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            onComplete: () => {
              gsap.to(wall, { x: 0, duration: 0.1 });
            },
          });
        },
      });
    },
  });
});
