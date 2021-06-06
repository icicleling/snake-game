import React, { useEffect, useRef } from "react";
import "./App.css";
import p5 from "p5";
import { DirectionEnum, GRID_SIZE } from "./utils/constants";
import Snake from "./components/Snake";
import Food from "./components/Food";

function App() {
  const contentRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const prevKeyFrame = useRef<number>(0);

  const initialP5 = () => {
    if (!contentRef.current) return;

    let snake: Snake;
    let food: Food;

    function sketch(p: p5) {
      if (p5Ref.current) p5Ref.current.remove();

      const draw = () => {
        p.background(200);

        for (let x = 0; x < p.width; x += p.width / GRID_SIZE) {
          for (let y = 0; y < p.height; y += p.height / GRID_SIZE) {
            p.stroke(255);
            p.strokeWeight(1);
            p.line(x, 0, x, p.height);
            p.line(0, y, p.width, y);
          }
        }

        snake.update();
        snake.draw();
        if (snake.hasEatenFood(food)) {
          food.spawn();
          snake.grow();
        }
        food.draw();
      };

      p.setup = () => {
        p.createCanvas(700, 700);
        p.frameRate(0);

        snake = new Snake(p);
        food = new Food(p);
        draw();
      };

      p.draw = draw;

      p.keyPressed = () => {
        if (p.frameRate() === 0) p.frameRate(6);

        if (p.frameCount === prevKeyFrame.current) return;
        prevKeyFrame.current = p.frameCount;

        if (p.keyCode === 38 && snake.dir !== DirectionEnum.Down) {
          snake.dir = DirectionEnum.Up;
        } else if (p.keyCode === 40 && snake.dir !== DirectionEnum.Up) {
          snake.dir = DirectionEnum.Down;
        } else if (p.keyCode === 37 && snake.dir !== DirectionEnum.Right) {
          snake.dir = DirectionEnum.Left;
        } else if (p.keyCode === 39 && snake.dir !== DirectionEnum.Left) {
          snake.dir = DirectionEnum.Right;
        }
      };
    }

    p5Ref.current = new p5(sketch, contentRef.current);
  };

  useEffect(() => {
    initialP5();
  }, []);

  return <div ref={contentRef}></div>;
}

export default App;
