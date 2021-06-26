import p5 from "p5";
import { DirectionEnum, GRID_SIZE } from "../utils/constants";
import Board from "./Board";
import Food from "./Food";

class Snake {
  p: p5;
  body: { boardRow: number; boardCol: number }[];
  dir: DirectionEnum | undefined;
  lastX: number;
  lastY: number;
  board: Board;

  constructor(p: p5, board: Board) {
    this.p = p;
    this.board = board;
    this.body = [];
    this.body.push({ boardRow: GRID_SIZE / 2, boardCol: GRID_SIZE / 2 });
    this.dir = undefined;
    this.lastY = this.body[this.body.length - 1].boardRow;
    this.lastX = this.body[this.body.length - 1].boardCol;
  }

  draw() {
    this.p.fill(100);
    for (let { boardCol, boardRow } of this.body) {
      this.p.rect(
        this.board.ALL_GRID_COORDS[boardRow][boardCol].x,
        this.board.ALL_GRID_COORDS[boardRow][boardCol].y,
        this.p.width / GRID_SIZE,
        this.p.height / GRID_SIZE
      );
    }
  }

  update() {
    this.lastX = this.body[this.body.length - 1].boardCol;
    this.lastY = this.body[this.body.length - 1].boardRow;
    for (let i = this.body.length - 1; i >= 1; i--) {
      this.body[i].boardRow = this.body[i - 1].boardRow;
      this.body[i].boardCol = this.body[i - 1].boardCol;
    }

    if (this.dir === DirectionEnum.Up) {
      this.body[0].boardRow = this.body[0].boardRow - 1;
    } else if (this.dir === DirectionEnum.Down) {
      this.body[0].boardRow = this.body[0].boardRow + 1;
    } else if (this.dir === DirectionEnum.Left) {
      this.body[0].boardCol = this.body[0].boardCol - 1;
    } else if (this.dir === DirectionEnum.Right) {
      this.body[0].boardCol = this.body[0].boardCol + 1;
    }

    this.hitWall();
    this.hitDetection();
  }

  grow() {
    this.body.push({ boardCol: this.lastX, boardRow: this.lastY });
  }

  spawn() {
    this.body = [];
    this.body.push({ boardRow: GRID_SIZE / 2, boardCol: GRID_SIZE / 2 });
    this.dir = undefined;
    this.lastY = this.body[this.body.length - 1].boardRow;
    this.lastX = this.body[this.body.length - 1].boardCol;
    this.p.frameRate(0);
  }

  hitDetection() {
    for (let i = 1; i < this.body.length; i++) {
      if (
        this.body[0].boardCol === this.body[i].boardCol &&
        this.body[0].boardRow === this.body[i].boardRow
      ) {
        this.spawn();
      }
    }
  }

  hitWall() {
    console.log(
      "hitwall:",
      this.body[0],
      this.body[0].boardCol > GRID_SIZE - 1 ||
        this.body[0].boardCol < 0 ||
        this.body[0].boardRow > GRID_SIZE - 1 ||
        this.body[0].boardRow < 0
    );
    if (
      this.body[0].boardCol > GRID_SIZE - 1 ||
      this.body[0].boardCol < 0 ||
      this.body[0].boardRow > GRID_SIZE - 1 ||
      this.body[0].boardRow < 0
    ) {
      this.spawn();
    }
  }

  hasEatenFood(food: Food) {
    if (
      this.body[0].boardCol === food.boardCol &&
      this.body[0].boardRow === food.boardRow
    ) {
      return true;
    }
  }
}
export default Snake;
