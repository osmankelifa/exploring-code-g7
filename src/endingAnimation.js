document.addEventListener("DOMContentLoaded", function () {
  const endingPart = document.getElementById("ending-part");
  const dropContainer = endingPart.querySelector(".drop-container");
  const drop = dropContainer.querySelector(".drop");
  const h2 = endingPart.querySelector("h2");
  const clickPrompt = endingPart.querySelector(".click-prompt");
  const sound = document.getElementById("waterDropSound"); // 获取音频元素

  // 绑定点击事件，开始动画和音频播放
  dropContainer.addEventListener("click", function () {
    playAnimation();
    clickPrompt.style.display = "none"; // 点击时隐藏提示
    try {
      sound.play(); // 用户交互后播放音频
    } catch (error) {
      console.error("Audio play failed:", error);
    }
  });

  function playAnimation() {
    // 重置动画
    drop.style.animation = "none";
    h2.style.animation = "none";

    // 触发重排来重新开始动画
    void drop.offsetWidth;
    void h2.offsetWidth;

    // 开始动画
    drop.style.animation = "drip 3s forwards";
    h2.style.animation = "appear 2s 2.5s forwards";
    drop.style.transform = "scale(1)"; // 使水滴恢复正常大小并开始动画
  }
});
