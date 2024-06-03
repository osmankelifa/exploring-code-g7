document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("pieChart");
  const ctx = canvas.getContext("2d");
  const total = 100;
  const lackAccess = 22;
  const radius = 200;
  const separationDistanceX = 20;
  const separationDistanceY = 20;
  const backgroundColor = "#0b2447";
  canvas.width = 600;
  canvas.height = 600;

  let isAnimating = false;

  function drawPieChart() {
    if (isAnimating) return; // Prevent new animation if one is already in progress
    isAnimating = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(300, 300, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#A5D7E8";
    ctx.fill();
    ctx.closePath();

    let currentAngle = 0;
    const targetAngle = (lackAccess / total) * 2 * Math.PI;
    const duration = 4;
    const fps = 60;
    const increment = targetAngle / (duration * fps);

    function animate() {
      ctx.clearRect(0, 0, 600, 600); // Ensure the canvas is clear before each frame
      ctx.beginPath();
      ctx.arc(300, 300, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#A5D7E8";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(300, 300);
      ctx.arc(300, 300, radius, 0, currentAngle);
      ctx.fillStyle = "#A5D7E8";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(300, 300);
      ctx.arc(300, 300, radius, 0, currentAngle);
      ctx.fillStyle = "#8B4513";
      ctx.fill();
      ctx.closePath();

      currentAngle += increment;
      if (currentAngle < targetAngle) {
        requestAnimationFrame(animate);
      } else {
        separateTriangle();
      }
    }

    animate();
  }

  function separateTriangle() {
    const angle = (lackAccess / total) * 2 * Math.PI;

    const steps = 40;
    const stepX = separationDistanceX / steps;
    const stepY = separationDistanceY / steps;
    let step = 0;

    function animateSeparation() {
      ctx.clearRect(0, 0, 600, 600); // Ensure the canvas is clear before each frame

      drawPieChartBase();

      ctx.beginPath();
      ctx.moveTo(300, 300);
      ctx.arc(300, 300, radius, 0, angle);
      ctx.lineTo(300, 300);
      ctx.fillStyle = backgroundColor;
      ctx.fill();
      ctx.closePath();

      ctx.save();
      ctx.translate(step * stepX, step * stepY);
      ctx.beginPath();
      ctx.moveTo(300, 300);
      ctx.lineTo(300 + radius * Math.cos(0), 300 + radius * Math.sin(0));
      ctx.arc(300, 300, radius, 0, angle);
      ctx.lineTo(300, 300);
      ctx.fillStyle = "#8B4513";
      ctx.fill();
      ctx.closePath();
      ctx.restore();

      step++;
      if (step <= steps) {
        requestAnimationFrame(animateSeparation);
      } else {
        isAnimating = false; // Reset animation flag when complete
      }
    }

    animateSeparation();
  }

  function drawPieChartBase() {
    ctx.clearRect(0, 0, 600, 600); // Ensure the canvas is clear before each frame

    ctx.beginPath();
    ctx.arc(300, 300, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#A5D7E8";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.arc(300, 300, radius, (lackAccess / total) * 2 * Math.PI, 2 * Math.PI);
    ctx.lineTo(300, 300);
    ctx.fillStyle = "#A5D7E8";
    ctx.fill();
    ctx.closePath();
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

  ScrollTrigger.create({
    trigger: "#page2",
    start: "top center",
    onEnter: () => {
      if (!isAnimating) {
        drawPieChart();
      }
    },
  });

  canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const distance = Math.sqrt((x - 300) ** 2 + (y - 300) ** 2);

    if (distance <= radius) {
      canvas.title = "2.2 billion people lack access to safe drinking water";
    } else {
      canvas.title = "";
    }
  });
});
