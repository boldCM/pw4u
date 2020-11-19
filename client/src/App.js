import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import { useState } from "react";
import useAsync from "./hooks/useAsync";
import { useForm } from "react-hook-form";

function App() {
  const [inputValue, setInputValue] = useState("");

  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword(inputValue)
  );

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input name="example" defaultValue="test" ref={register} />

        {/* include validation with required or other standard HTML validation rules */}
        <input name="exampleRequired" ref={register({ required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
      {/* ursprünglicher Code: */}
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
