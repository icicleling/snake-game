export const GRID_SIZE = 20;
export const CANVAS_SIZE = 700;

export const ALL_GRID_COORDS = [...Array(GRID_SIZE * GRID_SIZE).keys()].map(
  (item) => ({
    x: (item % GRID_SIZE) * (CANVAS_SIZE / GRID_SIZE),
    y: Math.floor(item / GRID_SIZE) * (CANVAS_SIZE / GRID_SIZE),
  })
);

export enum DirectionEnum {
  Up,
  Down,
  Left,
  Right,
}
