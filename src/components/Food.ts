import p5 from "p5";
import { GRID_SIZE } from "../utils/constants";
import Board from "./Board";
import Snake from "./Snake";

class Food {
  p: p5;
  x: number = 0;
  y: number = 0;
  board: Board;

  constructor(p: p5, board: Board) {
    this.p = p;
    this.board = board;
    this.spawn();
  }

  spawn(snake?: Snake) {
    let coords = this.board.ALL_GRID_COORDS.reduce(
      (prev, curr) => [...prev, ...curr],
      []
    );
    if (snake) {
      coords = coords.filter(
        (item) => !snake.body.find((v) => v.x === item.x && v.y === item.y)
      );
    }

    const randIndex = this.p.floor(this.p.random(coords.length));
    this.x = coords[randIndex].x;
    this.y = coords[randIndex].y;
  }

  draw() {
    this.p.fill(255, 100, 100);
    this.p.rect(
      this.x,
      this.y,
      this.p.width / GRID_SIZE,
      this.p.height / GRID_SIZE
    );
  }
}

export default Food;
