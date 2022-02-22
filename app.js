const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const brushRange = document.querySelector("#jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.lineWidth = 2.5;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const canvasX = event.offsetX;
  const canvasY = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(canvasX, canvasY);
  } else {
    ctx.lineTo(canvasX, canvasY);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const penColor = event.target.style.backgroundColor;
  ctx.strokeStyle = penColor;
  ctx.fillStyle = penColor;
}
function handleBrushSizes(event) {
  const brushSize = event.target.value;
  ctx.lineWidth = brushSize;
}
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleRightClick(event) {
  event.preventDefault();
  alert("No Right Cick!");
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const imgLink = document.createElement("a");
  imgLink.href = image;
  imgLink.download = "painting";
  imgLink.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (brushRange) {
  brushRange.addEventListener("input", handleBrushSizes);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
