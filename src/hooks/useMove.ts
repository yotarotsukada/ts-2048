import { useEffect } from "react";

export type Direction = "up" | "down" | "left" | "right";

export const useMove = (callback: (direction: Direction) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          callback("up");
          break;
        case "ArrowDown":
          callback("down");
          break;
        case "ArrowLeft":
          callback("left");
          break;
        case "ArrowRight":
          callback("right");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};

export default useMove;
