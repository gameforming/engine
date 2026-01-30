// =====================
// CONFIG
// =====================
const TILE_SIZE = 16;
const GRID_WIDTH = 50;
const GRID_HEIGHT = 40;

// =====================
// CANVAS
// =====================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// =====================
// INPUT
// =====================
let mouse = {
  x: 0,
  y: 0,
  down: false
};

canvas.addEventListener("mousemove", e => {
  mouse.x = Math.floor(e.offsetX / TILE_SIZE);
  mouse.y = Math.floor(e.offsetY / TILE_SIZE);
});

canvas.addEventListener("mousedown", () => mouse.down = true);
canvas.addEventListener("mouseup", () => mouse.down = false);
canvas.addEventListener("mouseleave", () => mouse.down = false);

// =====================
// GRID DATA
// =====================
let grid = [];

function initGrid() {
  grid = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    grid[y] = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      grid[y][x] = null;
    }
  }
}

initGrid();

// =====================
// UI
// =====================
const colorPicker = document.getElementById("colorPicker");
document.getElementById("clear").onclick = initGrid;

// =====================
// UPDATE
// =====================
function update() {
  if (mouse.down) {
    if (
      mouse.x >= 0 && mouse.x < GRID_WIDTH &&
      mouse.y >= 0 && mouse.y < GRID_HEIGHT
    ) {
      grid[mouse.y][mouse.x] = colorPicker.value;
    }
  }
}

// =====================
// RENDER
// =====================
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const color = grid[y][x];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(
          x * TILE_SIZE,
          y * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      }

      // grid lijnen
      ctx.strokeStyle = "#ddd";
      ctx.strokeRect(
        x * TILE_SIZE,
        y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}

// =====================
// GAME LOOP
// =====================
function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

loop();
