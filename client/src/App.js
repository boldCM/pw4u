import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import { useEffect, useState } from "react";

function App() {
  const [password, setPassword] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const doFetch = async () => {
      const newPassword = await getPassword(inputValue);
      setPassword(newPassword);
    };
    doFetch();
  }, [inputValue]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            getPassword(inputValue);
            setInputValue("");
          }}
        >
          <input
            type="text"
            placeholder="search for password"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          ></input>
        </form>
        <div>{inputValue && password}</div>
      </header>
    </div>
  );
}

export default App;
