import p5 from "p5";
import { CANVAS_SIZE, DirectionEnum, GRID_SIZE } from "../utils/constants";
import Food from "./Food";

class Snake {
  p: p5;
  body: { x: number; y: number }[];
  dir: DirectionEnum;
  lastX: number;
  lastY: number;

  constructor(p: p5) {
    this.p = p;
    this.body = [];
    this.body.push({ x: p.width / 2, y: p.height / 2 });
    this.dir = DirectionEnum.Right;
    this.lastX = p.width / 2;
    this.lastY = p.height / 2;
  }

  draw() {
    this.p.fill(100);
    for (let b of this.body) {
      this.p.rect(
        b.x,
        b.y,
        this.p.width / GRID_SIZE,
        this.p.height / GRID_SIZE
      );
    }
  }

  update() {
    this.hitDetection();
    this.hitWall();
    this.lastX = this.body[this.body.length - 1].x;
    this.lastY = this.body[this.body.length - 1].y;
    for (let i = this.body.length - 1; i >= 1; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    if (this.dir === DirectionEnum.Up) {
      this.body[0].y -= this.p.height / GRID_SIZE;
    } else if (this.dir === DirectionEnum.Down) {
      this.body[0].y += this.p.height / GRID_SIZE;
    } else if (this.dir === DirectionEnum.Left) {
      this.body[0].x -= this.p.width / GRID_SIZE;
    } else if (this.dir === DirectionEnum.Right) {
      this.body[0].x += this.p.width / GRID_SIZE;
    }
  }

  grow() {
    this.body.push({ x: this.lastX, y: this.lastY });
  }

  spawn() {
    this.body = [];
    this.body.push({ x: this.p.width / 2, y: this.p.height / 2 });
    this.dir = DirectionEnum.Right;
    this.lastX = this.p.width / 2;
    this.lastY = this.p.height / 2;
  }

  hitDetection() {
    for (let i = 1; i < this.body.length; i++) {
      if (
        this.body[0].x === this.body[i].x &&
        this.body[0].y === this.body[i].y
      ) {
        this.spawn();
      }
    }
  }

  hitWall() {
    const x = this.body[0].x;
    const y = this.body[0].y;
    if (x > CANVAS_SIZE || x < 0 || y > CANVAS_SIZE || y < 0) {
      this.spawn();
    }
  }

  hasEatenFood(food: Food) {
    if (this.body[0].x === food.x && this.body[0].y === food.y) {
      return true;
    }
  }
}
export default Snake;
