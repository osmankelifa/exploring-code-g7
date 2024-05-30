document.addEventListener("DOMContentLoaded", function () {
  const text = document.querySelector(".overlay-text");
  const line1 = "Water is life:";
  const line2 = "Protecting our most precious Resource!";

  const wordsLine1 = line1.split(" ");
  const wordsLine2 = line2.split(" ");

  text.innerHTML = "";

  const tl = gsap.timeline();

  wordsLine1.forEach((word, index) => {
    let wordSpan = document.createElement("span");
    wordSpan.innerHTML = word + "&nbsp;";
    text.appendChild(wordSpan);

    tl.from(
      wordSpan,
      { 
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power3.out",
      },
      index * 0.5
    );
  });

  text.appendChild(document.createElement("br"));

  const line2Container = document.createElement("span");
  text.appendChild(line2Container);

  wordsLine2.forEach((word) => {
    let wordSpan = document.createElement("span");
    wordSpan.innerHTML = word + "&nbsp;";
    line2Container.appendChild(wordSpan);
  });

  tl.from(
    line2Container,
    {
      duration: 5,
      y: 100,
      opacity: 0,
      ease: "power3.out",
    },
    wordsLine1.length * 0.5
  );
});


function button() {
  window.open("https://www.unicef.org", "_blank");
}