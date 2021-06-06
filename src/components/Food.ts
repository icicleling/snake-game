import p5 from "p5";
import { GRID_SIZE } from "../utils/constants";

class Food {
  p: p5;
  x: number = 0;
  y: number = 0;

  constructor(p: p5) {
    this.p = p;
    this.spawn();
  }

  spawn() {
    let randX = this.p.random(this.p.width);
    let randY = this.p.random(this.p.height);
    this.x = randX - (randX % (this.p.width / GRID_SIZE));
    this.y = randY - (randY % (this.p.height / GRID_SIZE));
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
