$(document).ready(function () {
  try {
    $("body").ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04,
      interactive: true,
    });
  } catch (e) {
    console.error("Error initializing ripples:", e);
  }

  $(".js-ripples-disable").on("click", function () {
    $("body, main").ripples("destroy");
    $(this).hide();
  });

  $(".js-ripples-play").on("click", function () {
    $("body, main").ripples("play");
  });

  $(".js-ripples-pause").on("click", function () {
    $("body, main").ripples("pause");
  });

  setInterval(function () {
    var $el = $("main");
    var x = Math.random() * $el.outerWidth();
    var y = Math.random() * $el.outerHeight();
    var dropRadius = 20;
    var strength = 0.04 + Math.random() * 0.04;

    $el.ripples("drop", x, y, dropRadius, strength);
  }, 400);

  $("body").on("touchstart", function (e) {
    const touch = e.touches[0];
    const x = touch.pageX;
    const y = touch.pageY;
    const dropRadius = 20;
    const strength = 0.04 + Math.random() * 0.04;

    $("body").ripples("drop", x, y, dropRadius, strength);
  });
});
