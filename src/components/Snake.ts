import p5 from "p5";
import { DirectionEnum, GRID_SIZE } from "../constants";
import Board from "./Board";
import Food from "./Food";

class Snake {
  p: p5;
  body: { boardRow: number; boardCol: number }[];
  direction: DirectionEnum | undefined;
  lastX: number;
  lastY: number;
  board: Board;

  constructor(p: p5, board: Board) {
    this.p = p;
    this.board = board;
    this.body = [];
    this.body.push({ boardRow: GRID_SIZE / 2, boardCol: GRID_SIZE / 2 });
    this.direction = undefined;
    this.lastY = this.body[this.body.length - 1].boardRow;
    this.lastX = this.body[this.body.length - 1].boardCol;
  }

  draw(isEaten?: boolean) {
    const head = this.body[0];
    if (!head) return;

    this.p.fill(100);
    const { x: headCoordX, y: headCoordY } =
      this.board.ALL_GRID_COORDS[head.boardRow][head.boardCol];
    this.p.rect(
      headCoordX,
      headCoordY,
      this.p.width / GRID_SIZE,
      this.p.height / GRID_SIZE
    );

    const fontSize = this.p.width / GRID_SIZE / 2;
    this.p.textSize(fontSize);
    this.p.fill(255);
    this.p.text(
      isEaten ? "^o^" : "^_^",
      headCoordX + fontSize / 3.5,
      headCoordY + fontSize * 1.2
    );

    this.p.fill(100);
    for (const { boardCol, boardRow } of this.body.slice(1)) {
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

    if (this.direction === DirectionEnum.Up) {
      this.body[0].boardRow = this.body[0].boardRow - 1;
    } else if (this.direction === DirectionEnum.Down) {
      this.body[0].boardRow = this.body[0].boardRow + 1;
    } else if (this.direction === DirectionEnum.Left) {
      this.body[0].boardCol = this.body[0].boardCol - 1;
    } else if (this.direction === DirectionEnum.Right) {
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
    this.direction = undefined;
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
