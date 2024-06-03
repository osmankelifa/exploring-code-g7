document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("barChart").getContext("2d");
  let chart; // Declare the chart variable here for broader scope

  const conflictDeaths = 1; // Base value for conflict deaths
  const diseaseDeaths = conflictDeaths * 20; // 20 times the conflict deaths

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Conflict", "Diarrhoeal Disease"],
      datasets: [
        {
          label: "Number of Deaths",
          data: [0, 0], // Start with zero data for animation
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          display: false, // Hide Y-axis labels
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      animation: {
        onComplete: () => {
          console.log("Animation complete");
        },
      },
      onHover: (event, chartElement) => {
        if (chartElement.length) {
          chart.getDatasetMeta(0).data[chartElement[0].index].backgroundColor =
            "rgba(165, 215, 232, 0.6)";
          chart.update("none"); // Only redraw the chart to show hover effect
        } else {
          chart.data.datasets[0].backgroundColor = [
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ];
          chart.update("none");
        }
      },
    },
  });

  function growBars() {
    // Set the actual values for animation
    chart.data.datasets.forEach((dataset) => {
      dataset.data[0] = conflictDeaths;
      dataset.data[1] = diseaseDeaths;
    });
    chart.update({
      duration: 8000,
      easing: "easeOut",
      onComplete: () => {
        console.log("Growth animation complete.");
      },
    });
  }

  // ScrollTrigger to start the bar grow animation when the chart becomes fully visible
  ScrollTrigger.create({
    trigger: "#page7",
    start: "top center",
    onEnter: growBars,
    once: true, // Ensure animation only runs once per page load
  });
});
