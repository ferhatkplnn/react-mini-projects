import React, { useState } from "react";

function App2() {
  const [tag, setTag] = useState("mark");
  const text = "Bu bir deneme text yazisidir";

  return (
    <div>
      {text.split(" ").map((sentence, key) => (
        <Sentence key={key} sentence={sentence} tag={tag} />
      ))}
      <input type="text" onChange={(e) => setTag(e.target.value)} value={tag} />
    </div>
  );
}

function Sentence({ sentence, tag }) {
  const [selected, setSelected] = useState(" ");

  let renderedText;
  if (selected) {
    const sentenceArray = sentence.split(new RegExp(`(${selected}+)`, "gi"));
    renderedText = sentenceArray.map((item, key) =>
      item === selected ? React.createElement(tag, { key }, item) : item
    );
  } else {
    renderedText = sentence;
  }

  const handleMouseUp = () => {
    const selection = window.getSelection().toString();

    console.log(selection);
    if (!selected) return null;
    setSelected(selection);
  };
  return <span onMouseUp={handleMouseUp}>{renderedText} </span>;
}

export default App2;
