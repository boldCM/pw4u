import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import { useEffect, useState } from "react";

function App() {
  const [password, setPassword] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const doFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const newPassword = await getPassword(inputValue);
      setPassword(newPassword);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error && <div>{error.message}</div>}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // setInputValue(event.target.value);
            // console.log(inputValue);
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
        <div>{password}</div>
      </header>
    </div>
  );
}

export default App;
