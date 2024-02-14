import { useState } from "react";
import "./App.css";
const App = () => {
  const [items, setItems] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  const handlePaste = (e, index) => {
    e.preventDefault();
    const clipedData = e.clipboardData.getData("text").split("\n");
    const clipedItems = parseClipboardData(clipedData);
    const newItems = insertItemsAtIndex(items, index, clipedItems);

    setItems(newItems);
  };

  const parseClipboardData = (data) => {
    return data
      .map((item) => {
        if (/^\s*([\w.-]+)\s*=\s*(.*)\s*$/.test(item)) {
          const [key, value] = item.split("=");
          return { key, value };
        }
        return null;
      })
      .filter((item) => item !== null);
  };

  const insertItemsAtIndex = (originalItems, index, newItems) => {
    const updatedItems = [...originalItems];
    updatedItems.splice(index, 0, ...newItems);
    return updatedItems;
  };
  const handleInputChange = (e, index, prop) => {
    const { value } = e.target;
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [prop]: value } : item
      )
    );
  };

  const handleDeleteClick = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const addNewItem = () => {
    setItems((prevItems) => [...prevItems, { key: "", value: "" }]);
  };

  return (
    <>
      <header>
        <h1>ReactEnvParser</h1>
      </header>
      <div className="container">
        <div className="label-names">
          <span>Key</span>
          <span>Value</span>
          <i></i>
        </div>
        {items.map((item, index) => (
          <div key={index} className="input-group">
            <input
              onPaste={(e) => handlePaste(e, index)}
              onChange={(e) => handleInputChange(e, index, "key")}
              value={item.key}
              placeholder="e.g. CLIENT_KEY"
            />
            <input value={item.value} readOnly />
            <button onClick={() => handleDeleteClick(index)}>-</button>
          </div>
        ))}
        <div>
          <button onClick={addNewItem} className="add-new-btn">
            Add new
          </button>
        </div>
      </div>
      <div style={{ color: "white" }} className="container">
        <pre>
          <code>{JSON.stringify(items, null, 2)}</code>
        </pre>
      </div>
    </>
  );
};

export default App;
