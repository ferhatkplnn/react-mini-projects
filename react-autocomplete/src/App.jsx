import { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
import "./App.css";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={60}
    viewBox="0 0 500 60"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="32" y="54" rx="0" ry="0" width="1" height="0" />
    <rect x="15" y="5" rx="0" ry="0" width="60" height="50" />
    <rect x="100" y="11" rx="0" ry="0" width="136" height="9" />
    <rect x="99" y="36" rx="0" ry="0" width="212" height="7" />
  </ContentLoader>
);

function App() {
  const [state, setState] = useState({
    search: "",
    result: [],
    isLoading: false,
  });

  const { search, result, isLoading } = state;

  const isShowNotFound = result.length === 0 && !!search.trim() && !isLoading;
  const isShowSkeletor = isLoading && !!search.trim();
  const isShowDataList = !!search.trim() && result.length > 0 && !isLoading;

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
          result: data,
          isLoading: false,
        }));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error(error);
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
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

  const handleInputChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      search: e.target.value,
      isLoading: true,
    }));
  };

  return (
    <div className="search" onBlur={handleBlur}>
      <input
        onChange={handleInputChange}
        value={search}
        type="search"
        autoFocus
        placeholder="Search for something..."
        className={search.trim() ? "active" : ""}
      />
      <hr />

      <div className="search-result">
        {isShowSkeletor &&
          new Array(3).fill().map((_, index) => <MyLoader key={index} />)}
        {isShowDataList &&
          result.map((item, index) => (
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
        {isShowNotFound && (
          <div className="not-found">No results found for "{search}"!</div>
        )}
      </div>
    </div>
  );
}

export default App;
