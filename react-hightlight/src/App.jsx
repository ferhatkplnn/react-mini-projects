import App2 from "./App2";

function App() {
  const text = "Bu @bir #yazi ve #python etiketini vurgulamak istiyorum @hello";
  return (
    <>
      <div>
        <HightLight
          text={text}
          match={"hashtag"}
          render={(part, index) => <mark key={index}>{part}</mark>}
        />
      </div>
      <App2 />
    </>
  );
}

function HightLight({ text, match, render }) {
  if (!match) return;
  const types = {
    hashtag: "(#[a-z]+)",
    mention: "(@[a-z]+)",
  };
  let regex = new RegExp(types[match] || `(${match}+)`, `gi`);
  let parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? render(part, index) : part
  );
}
export default App;
