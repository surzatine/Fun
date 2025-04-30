var num = Math.floor(Math.random() * 13) + 1;

$("#card").wScratchPad({
  size: 100, // The size of the brush/scratch.
  bg: `Images/${num}.jpeg`, // Background (image path or hex color).
  fg: `Images/front.jpg`, // Foreground (image path or hex color).
  cursor: "pointer", // Set cursor.
});
