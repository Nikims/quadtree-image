mouseX = 3000;
root = { children: [], x: 0, y: 0, size: 300 };
windowsXpPic = new Image();
windowsXpPic.src = "image.jpg";
function generateChildren(node) {
  node.children.push(
    { children: [], x: node.x, y: node.y, size: node.size / 2 },
    { children: [], x: node.x + node.size / 2, y: node.y, size: node.size / 2 },
    { children: [], x: node.x, y: node.y + node.size / 2, size: node.size / 2 },
    {
      children: [],
      x: node.x + node.size / 2,
      y: node.y + node.size / 2,
      size: node.size / 2,
    }
  );
}
generateChildren(root);

function draw() {
  queue = [];
  queue.push(root);
  context.drawImage(windowsXpPic, 1000, 0, 300, 300);

  while (queue.length > 0) {
    if (queue[0].children.length != 0) {
      queue = queue.concat(queue[0].children);
    } else {
      errors = [];
      count = 0;
      pixels = [];
      // for (let i = 0; i < queue[0].size; i++) {
      // for (let j = 0; j < queue[0].size; j++) {
      // count++;
      // if (count % 2 == 0) {
      // pixels.push(
      //   context.getImageData(queue[0].x + 1000 + i, queue[0].y + j, 1, 1)
      //     .data
      // );
      // } else {
      // pixels[1] = context.getImageData(
      //   queue[0].x + 1000 + i,
      //   queue[0].y + j,
      //   1,
      //   1
      // ).data;
      // }
      // }
      // }
      sumOfErrors = 0;
      // for (let i = 1; i < count - 1; i++) {
      //   errors.push(
      //     Math.pow(
      //       (pixels[i][0] + pixels[i][1] + pixels[i][2]) / 3 -
      //         (pixels[i + 1][0] + pixels[i + 1][1] + pixels[i + 1][2]) / 3,
      //       2
      //     ) +
      //       Math.pow(
      //         (pixels[i][0] + pixels[i][1] + pixels[i][2]) / 3 -
      //           (pixels[i - 1][0] - pixels[i - 1][1] - pixels[i - 1][2]) / 3,
      //         2
      //       )
      //   );
      //   sumOfErrors += errors[errors.length - 1];
      // }
      // console.log(sumOfErrors);
      // if (sumOfErrors / count > 20000 && queue[0].size > 4) {
      //   generateChildren(queue[0]);
      // }

      // data = context.getImageData(queue[0].x + 1000, queue[0].y, 1, 1).data;

      if (
        areColliding(
          queue[0].x,
          queue[0].y,
          queue[0].size,
          queue[0].size,
          mouseX,
          mouseY,
          5,
          5
        )
      ) {
        if (queue[0].size > 3) {
          generateChildren(queue[0]);

          // break;
        }
      }

      data = context.getImageData(
        queue[0].x + 1000 + queue[0].size / 2,
        queue[0].y + queue[0].size / 2,
        1,
        1
      ).data;
      data = JSON.parse(JSON.stringify(data));

      color = `rgb(${data[0]},${data[1]},${data[2]})`;

      context.fillStyle = color;
      context.lineWidth = 1;
      context.strokeStyle = "white";
      // context.fillRect(queue[0].x, queue[0].y, queue[0].size, queue[0].size);
      // context.strokeRect(queue[0].x, queue[0].y, queue[0].size, queue[0].size);

      context.beginPath();
      context.arc(
        queue[0].x + queue[0].size / 2,
        queue[0].y + queue[0].size / 2,
        queue[0].size / 2,
        0,
        6.28
      );
      // context.stroke();
      context.fill();
    }

    queue.splice(0, 1);
  }
  // context.fillRect(mouseX, mouseY, 10, 10);
}
function update() {}
