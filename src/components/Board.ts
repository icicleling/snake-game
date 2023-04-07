import p5 from "p5";
import { GRID_SIZE } from "../constants";
import { Coords } from "../interface";

class Board {
  p: p5;
  CANVAS_SIZE: number;
  ALL_GRID_COORDS: Coords[][];

  constructor(p: p5) {
    this.p = p;
    this.CANVAS_SIZE =
      (document.body.clientWidth > document.body.clientHeight
        ? document.body.clientHeight
        : document.body.clientWidth) - 20;

    const matrixCoords: Coords[][] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      matrixCoords[i] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        matrixCoords[i][j] = {
          x: j * (this.CANVAS_SIZE / GRID_SIZE),
          y: i * (this.CANVAS_SIZE / GRID_SIZE),
        };
      }
    }
    this.ALL_GRID_COORDS = matrixCoords;
  }

  draw() {
    this.p.background(200);

    for (let x = 0; x < this.p.width; x += this.p.width / GRID_SIZE) {
      for (let y = 0; y < this.p.height; y += this.p.height / GRID_SIZE) {
        this.p.stroke(255);
        this.p.strokeWeight(1);
        this.p.line(x, 0, x, this.p.height);
        this.p.line(0, y, this.p.width, y);
      }
    }
  }
}

export default Board;
