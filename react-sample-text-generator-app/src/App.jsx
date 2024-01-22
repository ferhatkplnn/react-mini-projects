import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState(1);
  const [include, setInclude] = useState("text");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://baconipsum.com/api/?type=all-meat&paras=${input}&format=${include}`
        );
        const data = await response.text();
        setOutput(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [input, include]);

  return (
    <div className="container">
      <h1>React Sample Text Generator App</h1>
      <hr />
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="paragraphs">Paragraphs</label>
          <div>
            <input
              id="paragraphs"
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Include HTML</label>
          <div>
            <select
              value={include}
              onChange={(e) => setInclude(e.target.value)}
              required
            >
              <option value="html">Yes</option>
              <option value="text">No</option>
            </select>
          </div>
        </div>
      </form>
      {loading ? (
        <p className="output">Loading...</p>
      ) : (
        <p className="output">{output}</p>
      )}
    </div>
  );
}

export default App;
