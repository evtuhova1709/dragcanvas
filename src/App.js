import React, { useRef, useEffect } from 'react';
import Header from "./Header";


function App() {
  const canvas = useRef();
  let ctx = null;

  const boxes = [
    { x: 150, y: 300, w: 100, h: 50, color: 'green', isParent: true }
  ]
  function getRadians(degrees) {
    return (Math.PI / 180) * degrees;
  }
  const circles = [
    { x: 200, y: 200, radius: 40, startAngle: 0, endAngle: getRadians(360), color: 'blue', isParent: true }
  ]

  let isDownBoxes = false;
  let isDownCircles = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;


  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    ctx = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {
    draw();
  }, []);

  const draw = () => {
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    boxes.map(info => drawFillRect(info));
    circles.map(info => drawFillCircle(info));
  }

  function createNewRectangle() {
    let newBox = { x: 150, y: 300, w: 100, h: 50, color: 'green', isParent: false }
    boxes.unshift(newBox);
  }

  function createNewCircle() {
    let newCircle = { x: 200, y: 200, radius: 40, startAngle: 0, endAngle: getRadians(360), color: 'blue', isParent: false }
    circles.unshift(newCircle);
  }


  const drawFillRect = (info, style = {}) => {
    const { x, y, w, h, color } = info;
    const { backgroundColor = color } = style;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  }

  const drawFillCircle = (info, style = {}) => {
    const { x, y, radius, startAngle, endAngle, color } = info;
    const { backgroundColor = color } = style;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
  }

  const hitBox = (x, y) => {
    let isTarget = null;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (x >= box.x &&
        x <= box.x + box.w &&
        y >= box.y &&
        y <= box.y + box.h) {

        if (box.isParent === false) {
          dragTarget = box;
          isTarget = true;

        } else if (box.isParent === true) {
          createNewRectangle();
          dragTarget = boxes[0];
          isTarget = true;
        }

        break;
      }
    }
    return isTarget;
  }

  const hitCircle = (x, y) => {
    let isTarget = null;
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      var dx = x - circle.x,
        dy = y - circle.y,
        dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < circle.radius) {

        if (circle.isParent === false) {
          dragTarget = circle;
          isTarget = true;

        } else if (circle.isParent === true) {
          createNewCircle();
          dragTarget = circles[0];
          isTarget = true;
        }


        break;
      }
    }
    return isTarget;
  }

  const handleMouseDown = e => {
    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);

    isDownBoxes = hitBox(startX, startY);
    isDownCircles = hitCircle(startX, startY);

  }
  const handleMouseMove = e => {
    if (!isDownBoxes && !isDownCircles) return;


    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    dragTarget.x += dx;
    dragTarget.y += dy;
    draw();

  }
  const handleMouseUp = e => {
    dragTarget = null;
    isDownBoxes = false;
    isDownCircles = false;
  }
  const handleMouseOut = e => {
    handleMouseUp(e);
  }


  return (
    <div className="App">
      <canvas id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        ref={canvas}>

      </canvas>
    <Header />


    </div>
  );
}

export default App;