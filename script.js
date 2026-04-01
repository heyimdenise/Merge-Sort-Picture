const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");

const img = new Image();
img.src = "cat.jpg";

const numBars = 20;
const barWidth = canvas.width / numBars;
const maxBarHeight = 300;

let bars = [];
let sorting = false;

img.onload = () => {
  createBars();
  drawBars();
};

function createBars() {
  bars = [];

  // Create bars in correct order first
  for (let i = 0; i < numBars; i++) {
    bars.push({
      value: i + 1,
      imgIndex: i
    });
  }

  // Shuffle them
  shuffle(bars);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function drawBars(highlight = []) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    const x = i * barWidth;
    const height = (bar.value / numBars) * maxBarHeight;
    const y = canvas.height - height;

    // Draw image slice inside bar
    const sliceWidth = img.width / numBars;
    const sourceX = bar.imgIndex * sliceWidth;

    ctx.drawImage(
      img,
      sourceX, 0, sliceWidth, img.height,   
      x, y, barWidth, height              
    );

    // Rectangle border
    ctx.strokeStyle = highlight.includes(i) ? "red" : "black";
    ctx.strokeRect(x, y, barWidth, height);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mergeSort(arr, left, right) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  await mergeSort(arr, left, mid);
  await mergeSort(arr, mid + 1, right);
  await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
  const leftPart = arr.slice(left, mid + 1);
  const rightPart = arr.slice(mid + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftPart.length && j < rightPart.length) {
    if (leftPart[i].value <= rightPart[j].value) {
      arr[k] = leftPart[i];
      i++;
    } else {
      arr[k] = rightPart[j];
      j++;
    }

    drawBars([k]);
    await sleep(150);
    k++;
  }

  while (i < leftPart.length) {
    arr[k] = leftPart[i];
    i++;
    drawBars([k]);
    await sleep(150);
    k++;
  }

  while (j < rightPart.length) {
    arr[k] = rightPart[j];
    j++;
    drawBars([k]);
    await sleep(150);
    k++;
  }
}

startBtn.addEventListener("click", async () => {
  if (sorting) return;
  sorting = true;

  await mergeSort(bars, 0, bars.length - 1);
  drawBars();

  sorting = false;
});