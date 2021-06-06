import p5 from "p5";
import { ALL_GRID_COORDS, GRID_SIZE } from "../utils/constants";
import Snake from "./Snake";

class Food {
  p: p5;
  x: number = 0;
  y: number = 0;

  constructor(p: p5) {
    this.p = p;
    this.spawn();
  }

  spawn(snake?: Snake) {
    let gridCoords = ALL_GRID_COORDS;
    if (snake) {
      gridCoords = gridCoords.filter(
        (item) => !snake.body.find((v) => v.x === item.x && v.y === item.y)
      );
    }

    const randIndex = this.p.floor(this.p.random(gridCoords.length));
    this.x = gridCoords[randIndex].x;
    this.y = gridCoords[randIndex].y;
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
