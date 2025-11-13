$(document).ready(function() {
  $("#animateBtn").click(function() {
    let box = $("#box");

    box.animate({
      left: "200px",
      top: "100px",
      height: "250px",
    }, 1000)
    .css({
      "background-color": "tomato",
      "color": "white",
      "font-family": "'Comic Sans MS', cursive"
    })
    .text("Nise Tapol")

    .animate({
      left: "-200px",
      top: "-100px",
      height: "200px"
    }, 1000, function() {
      box.css({
        "background-color": "purple",
        "font-family": "'Courier New', monospace"
      });
    })

    .animate({
      left: "0px",
      top: "0px",
      height: "150px"
    }, 1000, function() {
      box.css({
        "background-color": "lightblue",
        "color": "black",
        "font-family": "Arial, sans-serif"
      });
      box.text("Nise");
    });
  });
});
