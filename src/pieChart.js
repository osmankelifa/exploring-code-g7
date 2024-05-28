document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("pieChart");
  const ctx = canvas.getContext("2d");
  const total = 100;
  const lackAccess = 22;
  const radius = 200; // 半径，约为2/3大小
  const separationDistanceX = 20; // 水平分离距离，约为2/3大小
  const separationDistanceY = 20; // 垂直分离距离，约为2/3大小
  const backgroundColor = "#0b2447"; // 网页背景色

  canvas.width = 600; // 调整画布宽度
  canvas.height = 600; // 调整画布高度

  function drawPieChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制初始饼图
    ctx.beginPath();
    ctx.arc(300, 300, radius, 0, 2 * Math.PI); // 调整圆心位置
    ctx.fillStyle = "#A5D7E8"; // 初始饼图颜色
    ctx.fill();
    ctx.closePath();

    let currentAngle = 0;
    const targetAngle = (lackAccess / total) * 2 * Math.PI;
    const duration = 4; // 调慢绘画速度
    const fps = 60;
    const increment = targetAngle / (duration * fps);

    function animate() {
      ctx.beginPath();
      ctx.moveTo(300, 300); // 调整圆心位置
      ctx.arc(300, 300, radius, currentAngle, currentAngle + increment);
      ctx.lineTo(300, 300);
      ctx.fillStyle = "#8B4513"; // 干枯土地颜色
      ctx.fill();
      ctx.closePath(); // 确保路径正确关闭
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

    const steps = 40; // 调慢分离速度
    const stepX = separationDistanceX / steps;
    const stepY = separationDistanceY / steps;
    let step = 0;

    function animateSeparation() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 重绘初始饼图
      drawPieChartBase();

      // 填充缺角为背景色
      ctx.beginPath();
      ctx.moveTo(300, 300); // 调整圆心位置
      ctx.arc(300, 300, radius, 0, angle);
      ctx.lineTo(300, 300);
      ctx.fillStyle = backgroundColor;
      ctx.fill();
      ctx.closePath();

      // 移动并绘制分离的三角形
      ctx.save();
      ctx.translate(step * stepX, step * stepY);
      ctx.beginPath();
      ctx.moveTo(300, 300); // 调整圆心位置
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
      }
    }

    animateSeparation();
  }

  function drawPieChartBase() {
    ctx.beginPath();
    ctx.arc(300, 300, radius, 0, 2 * Math.PI); // 调整圆心位置
    ctx.fillStyle = "#A5D7E8";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(300, 300); // 调整圆心位置
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

  function checkAndDraw() {
    if (isElementInViewport(canvas)) {
      drawPieChart();
      window.removeEventListener("scroll", checkAndDraw);
    }
  }

  window.addEventListener("scroll", checkAndDraw);
  checkAndDraw();

  canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const distance = Math.sqrt((x - 300) ** 2 + (y - 300) ** 2); // 调整圆心位置

    if (distance <= radius) {
      canvas.title = "2.2 billion people lack access to safe drinking water";
    } else {
      canvas.title = "";
    }
  });
});
