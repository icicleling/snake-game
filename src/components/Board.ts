import p5 from "p5";
import { GRID_SIZE } from "../utils/constants";

class Board {
  p: p5;

  constructor(p: p5) {
    this.p = p;
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
