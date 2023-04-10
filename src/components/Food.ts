import p5 from "p5";
import { GRID_SIZE } from "../constants";
import Board from "./Board";
import Snake from "./Snake";

class Food {
  p: p5;
  boardCol = 0;
  boardRow = 0;
  board: Board;
  isNoPlaceToPut: boolean;

  constructor(p: p5, board: Board, snake: Snake) {
    this.p = p;
    this.board = board;
    this.isNoPlaceToPut = false;
    this.spawn(snake);
  }

  spawn(snake: Snake): boolean {
    let boardCellCoords: { boardRow: number; boardCol: number }[] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        boardCellCoords.push({ boardRow: i, boardCol: j });
      }
    }

    if (snake) {
      boardCellCoords = boardCellCoords.filter(
        (item) =>
          !snake.body.find(
            (v) => v.boardCol === item.boardCol && v.boardRow === item.boardRow
          )
      );
    }

    this.isNoPlaceToPut = boardCellCoords.length === 0;
    if (this.isNoPlaceToPut) return false;

    const randIndex = this.p.floor(this.p.random(boardCellCoords.length));
    this.boardCol = boardCellCoords[randIndex].boardCol;
    this.boardRow = boardCellCoords[randIndex].boardRow;
    return true;
  }

  draw() {
    if (this.isNoPlaceToPut) return;

    this.p.fill(255, 100, 100);
    this.p.rect(
      this.board.ALL_GRID_COORDS[this.boardRow][this.boardCol].x,
      this.board.ALL_GRID_COORDS[this.boardRow][this.boardCol].y,
      this.p.width / GRID_SIZE,
      this.p.height / GRID_SIZE
    );
  }
}

export default Food;
