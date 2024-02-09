import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState({
    search: "",
    result: [],
    isTyping: false,
  });

  const { search, result, isTyping } = state;

  const showNoMatch = result.length === 0 && search.trim() && isTyping;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/api?s=${search}`;
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`Data is not fetching: ${response.status}`);
        }

        const data = await response.json();

        setState((prevState) => ({
          ...prevState,
          result: search.trim() ? data : [],
          isTyping: !!search.trim(),
        }));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error(error);
        }
      }
    };

    const timeoutId = setTimeout(fetchData, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search]);

  const handleBlur = () => {
    setState((prevState) => ({
      ...prevState,
      search: "",
    }));
  };

  const getItemDetail = (item) => {
    console.log(item);
  };

  return (
    <div className="search" onBlur={handleBlur}>
      <input
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            search: e.target.value,
          }))
        }
        value={search}
        type="search"
        autoFocus
        placeholder="Search for something..."
        className={isTyping ? "active" : ""}
      />
      <hr />

      {isTyping && (
        <div className="search-result">
          {result.map((item, index) => (
            <div
              onClick={() => getItemDetail(item)}
              key={index}
              className="search-result-item"
            >
              <img src={item.image} alt="" />
              <div className="info">
                <h3>{item.title}</h3>
                <p>{item.data}</p>
              </div>
            </div>
          ))}
          {showNoMatch && (
            <div className="not-found">No results found for "{search}"!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
