const drumItems = [
  { id: 1, value: "Приз 1" },
  { id: 2, value: "Приз 2" },
  { id: 3, value: "Приз 3" },
  { id: 4, value: "Приз 4" },
  { id: 5, value: "Приз 5" },
  { id: 6, value: "Приз 6" },
  { id: 7, value: "Приз 7" },
  { id: 8, value: "Приз 8" },
  { id: 9, value: "Приз 9" },
];

const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 200;

function drawSegment(ctx, startAngle, endAngle, color) {
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawCircleSegments(segmentCount, items) {
  const angleStep = (2 * Math.PI) / segmentCount;

  for (let i = 0; i < segmentCount; i++) {
    const startAngle = i * angleStep;
    const endAngle = (i + 1) * angleStep;
    const color = generateRandomColor();

    drawSegment(ctx, startAngle, endAngle, color);

    const midAngle = startAngle + (endAngle - startAngle) / 2;
    const textX = centerX + (radius / 1.5) * Math.cos(midAngle);
    const textY = centerY + (radius / 1.5) * Math.sin(midAngle);

    ctx.save();
    ctx.translate(textX, textY);
    ctx.rotate(midAngle);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText(items[i].value, 0, 0);
    ctx.restore();
  }
}

drawCircleSegments(drumItems.length, drumItems);

let rotationDegree = 0;

function spinDrum(duration, targetId) {
  const targetItem = drumItems.find(item => item.id === targetId);
  const targetIndex = drumItems.indexOf(targetItem);
  const anglePerItem = 360 / drumItems.length;
  const fullRotations = 5 * 360;
  const targetRotation = -(targetIndex * anglePerItem);

  rotationDegree = fullRotations + targetRotation;

  canvas.style.transition = `transform ${duration}s ease-out`;
  canvas.style.transform = `rotate(${rotationDegree}deg)`;
}

function fetchPrize() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomPrizeId = Math.floor(Math.random() * drumItems.length) + 1;
      resolve({ prizeId: randomPrizeId });
    }, 1000);
  });
}

document.querySelector('.spin-button').addEventListener('click', async () => {
  const response = await fetchPrize();
  spinDrum(3, response.prizeId);
});

