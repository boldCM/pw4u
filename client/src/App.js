import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import { useState } from "react";
import useAsync from "./hooks/useAsync";

function App() {
  const [inputValue, setInputValue] = useState("");

  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword(inputValue)
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error && <div>{error.message}</div>}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            doFetch();
            setInputValue("");
          }}
        >
          <input
            type="text"
            placeholder="search for password"
            value={inputValue}
            required={true}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </form>
        {loading && <div>Loading...</div>}
        <div>{data}</div>
      </header>
    </div>
  );
}

export default App;
