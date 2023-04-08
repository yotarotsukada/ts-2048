import { BoardType } from "../types/BoardType";

const BOARD_SIZE = 4;

export const initializeBoard = (): BoardType => {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = new Array(BOARD_SIZE).fill(0);
    board.push(row);
  }
  addNewTile(board);
  addNewTile(board);
  return board;
};

export const addNewTile = (board: BoardType): BoardType => {
  const newBoard = [...board];
  const emptyTiles = findEmptyTiles(newBoard);
  if (emptyTiles.length === 0) {
    return newBoard;
  }
  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  const [x, y] = emptyTiles[randomIndex];
  const value = Math.random() < 0.9 ? 2 : 4;
  newBoard[x][y] = value;
  return newBoard;
};

const findEmptyTiles = (board: BoardType): number[][] => {
  const emptyTiles: number[][] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) {
        emptyTiles.push([rowIndex, colIndex]);
      }
    });
  });
  return emptyTiles;
};

export const isGameOver = (board: BoardType): boolean => {
  const canMoveUp = move(board, "up")[1];
  const canMoveDown = move(board, "down")[1];
  const canMoveLeft = move(board, "left")[1];
  const canMoveRight = move(board, "right")[1];

  return !(canMoveUp || canMoveDown || canMoveLeft || canMoveRight);
};

export const isGameWon = (board: BoardType): boolean => {
  return board.some((row) => {
    return row.some((cell) => cell === 2048);
  });
};

const cloneBoard = (board: BoardType): BoardType => {
  return board.map((row) => [...row]);
};

export const move = (
  board: BoardType,
  direction: string
): [BoardType, boolean] => {
  const clonedBoard = cloneBoard(board);
  let hasMoved = false;

  switch (direction) {
    case "left":
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 1; col < BOARD_SIZE; col++) {
          if (clonedBoard[row][col]) {
            let currentCol = col;
            while (
              currentCol > 0 &&
              !clonedBoard[row][currentCol - 1] &&
              clonedBoard[row][currentCol] !== 0
            ) {
              // move tile to the left
              clonedBoard[row][currentCol - 1] = clonedBoard[row][currentCol];
              clonedBoard[row][currentCol] = 0;
              currentCol--;
              hasMoved = true;
            }
            if (
              currentCol > 0 &&
              clonedBoard[row][currentCol - 1] === clonedBoard[row][currentCol]
            ) {
              // merge tiles
              clonedBoard[row][currentCol - 1] *= 2;
              clonedBoard[row][currentCol] = 0;
              hasMoved = true;
            }
          }
        }
      }
      break;
    case "right":
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = BOARD_SIZE - 2; col >= 0; col--) {
          if (clonedBoard[row][col]) {
            let currentCol = col;
            while (
              currentCol < BOARD_SIZE - 1 &&
              !clonedBoard[row][currentCol + 1] &&
              clonedBoard[row][currentCol] !== 0
            ) {
              // move tile to the left
              clonedBoard[row][currentCol + 1] = clonedBoard[row][currentCol];
              clonedBoard[row][currentCol] = 0;
              currentCol++;
              hasMoved = true;
            }
            if (
              currentCol < BOARD_SIZE - 1 &&
              clonedBoard[row][currentCol + 1] === clonedBoard[row][currentCol]
            ) {
              // merge tiles
              clonedBoard[row][currentCol + 1] *= 2;
              clonedBoard[row][currentCol] = 0;
              hasMoved = true;
            }
          }
        }
      }
      break;
    case "down":
      for (let col = 0; col < BOARD_SIZE; col++) {
        for (let row = BOARD_SIZE - 2; row >= 0; row--) {
          if (clonedBoard[row][col]) {
            let currentRow = row;
            while (
              currentRow < BOARD_SIZE - 1 &&
              !clonedBoard[currentRow + 1][col] &&
              clonedBoard[currentRow][col] !== 0
            ) {
              // move tile down
              clonedBoard[currentRow + 1][col] = clonedBoard[currentRow][col];
              clonedBoard[currentRow][col] = 0;
              currentRow++;
              hasMoved = true;
            }
            if (
              currentRow < BOARD_SIZE - 1 &&
              clonedBoard[currentRow + 1][col] === clonedBoard[currentRow][col]
            ) {
              // merge tiles
              clonedBoard[currentRow + 1][col] *= 2;
              clonedBoard[currentRow][col] = 0;
              hasMoved = true;
            }
          }
        }
      }
      break;
    case "up":
      for (let col = 0; col < BOARD_SIZE; col++) {
        for (let row = 1; row < BOARD_SIZE; row++) {
          if (clonedBoard[row][col]) {
            let currentRow = row;
            while (
              currentRow > 0 &&
              !clonedBoard[currentRow - 1][col] &&
              clonedBoard[currentRow][col] !== 0
            ) {
              // move tile up
              clonedBoard[currentRow - 1][col] = clonedBoard[currentRow][col];
              clonedBoard[currentRow][col] = 0;
              currentRow--;
              hasMoved = true;
            }
            if (
              currentRow > 0 &&
              clonedBoard[currentRow - 1][col] === clonedBoard[currentRow][col]
            ) {
              // merge tiles
              clonedBoard[currentRow - 1][col] *= 2;
              clonedBoard[currentRow][col] = 0;
              hasMoved = true;
            }
          }
        }
      }
      break;
    default:
      break;
  }

  return [clonedBoard, hasMoved];
};
