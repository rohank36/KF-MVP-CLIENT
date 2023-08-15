import React, { useState, useRef, useEffect } from "react";

const Drawing = () => {
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("red");
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const devicePixelRatio = window.devicePixelRatio || 1;
    const height = 650;
    const width = 1278;

    // Now we are setting the size of the canvas in real pixels
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;

    // CSS pixels are kept the same to scale down the canvas for display
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Scale the drawing context by the device pixel ratio to ensure
    // that the drawing coordinates match the CSS pixels
    context.scale(devicePixelRatio, devicePixelRatio);

    context.lineCap = "round";
    context.lineWidth = 4;

    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.strokeStyle = color;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const handleGreen = () => {
    setColor("green");
  };
  const handleBlue = () => {
    setColor("blue");
  };
  const handleRed = () => {
    setColor("red");
  };
  const handleYellow = () => {
    setColor("yellow");
  };

  function Eraser() {
    const clearCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { a, d } = ctx.getTransform(); // Save the current scale
      ctx.resetTransform(); // Reset the transformation
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.setTransform(a, 0, 0, d, 0, 0); // Restore the original scale
    };

    return (
      <div>
        <button
          className="mt-5 px-2 py-2 bg-sky-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-sky-600"
          type="button"
          onClick={clearCanvas}
        >
          {"\u{1F5D1}"} Clear All
        </button>
      </div>
    );
  }

  return (
    <div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseLeave={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        className="bg-slate-300 bg-opacity-0 absolute top-0 right-8 mt-16"
      />
      <div className="flex flex-row space-x-5 mr-16">
        <Eraser />
        <div className="space-x-3">
          <button
            onClick={handleGreen}
            className="w-20 mt-5 px-2 py-2 bg-green-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-green-600"
          >
            Green
          </button>
          <button
            onClick={handleBlue}
            className="w-20 mt-5 px-2 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-blue-600"
          >
            Blue
          </button>
          <button
            onClick={handleRed}
            className="w-20 mt-5 px-2 py-2 bg-red-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-red-600"
          >
            Red
          </button>
          <button
            onClick={handleYellow}
            className="w-20 mt-5 px-2 py-2 bg-yellow-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-yellow-600"
          >
            Yellow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawing;
