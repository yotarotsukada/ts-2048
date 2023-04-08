import { FC } from "react";

type TileProps = {
  value: number;
};

export const Tile: FC<TileProps> = ({ value }) => {
  const colors: { [key: number]: string } = {
    2: "bg-orange-200 text-orange-700",
    4: "bg-yellow-200 text-yellow-700",
    8: "bg-green-200 text-green-700",
    16: "bg-blue-200 text-blue-700",
    32: "bg-indigo-200 text-indigo-700",
    64: "bg-purple-200 text-purple-700",
    128: "bg-pink-200 text-pink-700",
    256: "bg-red-200 text-red-700",
    512: "bg-gray-200 text-gray-700",
    1024: "bg-teal-200 text-teal-700",
    2048: "bg-yellow-500 text-white",
  };

  const getColorClass = (value: number) => {
    return colors[value] || "bg-gray-200 text-gray-700";
  };

  return (
    <div
      className={`flex items-center justify-center h-12 w-12 font-bold text-xl rounded-lg shadow-md ${getColorClass(
        value
      )}`}
    >
      {value !== 0 && value}
    </div>
  );
};

export default Tile;
