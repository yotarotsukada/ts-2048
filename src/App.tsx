import { useState } from "react";
import { Board } from "./components/Board";
import {
  initializeBoard,
  addNewTile,
  isGameOver,
  move,
  isGameWon,
} from "./utils/game";
import { useMove } from "./hooks/useMove";
import { GameOverModal } from "./components/GameOverModal";
import { GameWonModal } from "./components/GameWonModal";

function App() {
  const [board, setBoard] = useState(initializeBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const handleMove = (direction: string) => {
    if (isGameWon(board)) {
      return;
    }

    const [newBoard, hasMoved] = move(board, direction);
    if (hasMoved) {
      const newTileBoard = addNewTile(newBoard);
      setBoard(newTileBoard);
      if (isGameWon(newTileBoard)) {
        setGameWon(true);
      }
    }
    if (isGameOver(newBoard)) {
      setGameOver(true);
    }
  };

  useMove(handleMove);

  const restartGame = () => {
    setBoard(initializeBoard());
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Board board={board} />
      {gameOver && <GameOverModal visible={gameOver} onRestart={restartGame} />}
      {gameWon && <GameWonModal visible={gameWon} onRestart={restartGame} />}
    </div>
  );
}

export default App;
