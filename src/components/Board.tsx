import { FC } from "react";
import Tile from "./Tile";

type BoardProps = {
  board: number[][];
};

export const Board: FC<BoardProps> = ({ board }) => {
  return (
    <div className="grid grid-cols-4 gap-4 w-64 bg-gray-200 rounded-lg p-4">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} value={value} />
        ))
      )}
    </div>
  );
};

export default Board;
