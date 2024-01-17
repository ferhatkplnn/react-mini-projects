const ColorCircle = ({ color, selectedColor, onClick }) => {
  const colorVariations = {
    green: "bg-green-400 hover:bg-green-500 hover:shadow-xl",
    pink: "bg-pink-400 hover:bg-pink-500 hover:shadow-xl",
    yellow: "bg-yellow-400 hover:bg-yellow-500 hover:shadow-xl",
  };

  return (
    <span
      className={`flex items-center justify-center ${colorVariations[color]} h-8 w-8 rounded-full cursor-pointer`}
      onClick={() => onClick(color)}
    >
      {selectedColor === color && <CheckmarkIcon className="w-6 h-6" />}
    </span>
  );
};

const CheckmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

export default ColorCircle;
