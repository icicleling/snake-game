import React, { useEffect, useRef } from "react";
import "./App.css";
import p5 from "p5";
import { DirectionEnum, FRAME_RATE } from "./constants";
import Snake from "./components/Snake";
import Food from "./components/Food";
import Board from "./components/Board";
import styled from "styled-components";
import TouchController from "./components/TouchController";

function App() {
  const contentRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const prevKeyTime = useRef<number>(0);
  const nextDirection = useRef<DirectionEnum[]>([]);

  const initialP5 = () => {
    if (!contentRef.current) return;

    let board: Board;
    let snake: Snake;
    let food: Food;

    function sketch(p: p5) {
      if (p5Ref.current) p5Ref.current.remove();

      const draw = () => {
        if (nextDirection.current.length) {
          snake.direction = nextDirection.current[0];
          nextDirection.current.shift();
        }

        board.draw();

        snake.update();
        snake.draw();
        if (snake.hasEatenFood(food)) {
          food.spawn(snake);
          snake.grow();
        }
        food.draw();
      };

      p.setup = () => {
        board = new Board(p);
        p.createCanvas(board.CANVAS_SIZE, board.CANVAS_SIZE);
        p.frameRate(0);

        snake = new Snake(p, board);
        food = new Food(p, board);
        draw();
      };

      p.draw = draw;

      p.keyPressed = () => {
        p.frameRate(FRAME_RATE);

        if (Date.now() - prevKeyTime.current <= 1000 / FRAME_RATE) {
          const prevDirection =
            nextDirection.current[nextDirection.current.length - 1];

          if (
            p.keyCode === p.UP_ARROW &&
            prevDirection !== DirectionEnum.Down
          ) {
            nextDirection.current.push(DirectionEnum.Up);
          } else if (
            p.keyCode === p.DOWN_ARROW &&
            prevDirection !== DirectionEnum.Up
          ) {
            nextDirection.current.push(DirectionEnum.Down);
          } else if (
            p.keyCode === p.LEFT_ARROW &&
            prevDirection !== DirectionEnum.Right
          ) {
            nextDirection.current.push(DirectionEnum.Left);
          } else if (
            p.keyCode === p.RIGHT_ARROW &&
            prevDirection !== DirectionEnum.Left
          ) {
            nextDirection.current.push(DirectionEnum.Right);
          }
          return;
        }

        prevKeyTime.current = Date.now();
        nextDirection.current = [];

        if (
          p.keyCode === p.UP_ARROW &&
          snake.direction !== DirectionEnum.Down
        ) {
          nextDirection.current.push(DirectionEnum.Up);
        } else if (
          p.keyCode === p.DOWN_ARROW &&
          snake.direction !== DirectionEnum.Up
        ) {
          nextDirection.current.push(DirectionEnum.Down);
        } else if (
          p.keyCode === p.LEFT_ARROW &&
          snake.direction !== DirectionEnum.Right
        ) {
          nextDirection.current.push(DirectionEnum.Left);
        } else if (
          p.keyCode === p.RIGHT_ARROW &&
          snake.direction !== DirectionEnum.Left
        ) {
          nextDirection.current.push(DirectionEnum.Right);
        }
      };
    }

    p5Ref.current = new p5(sketch, contentRef.current);
  };

  useEffect(() => {
    initialP5();
  }, []);

  return (
    <Root>
      <BoardNode ref={contentRef} />
      <TouchController />
    </Root>
  );
}

const Root = styled.div`
  margin-top: 8px;
`;

const BoardNode = styled.div`
  margin: 0 auto;
  width: max-content;
`;

export default App;
