import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// https://randomuser.me/api

export default function App() {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const incrementCounter = () => {
    setCounter((prev) => ++prev);
  };

  useEffect(() => {
    try {
      // throw new Error("Errored Out");
      const fetchData = async () => {
        const res = await fetch(`https://randomuser.me/api?page=${counter}`);
        const data = await res.json();

        setData(data.results);
      };
      fetchData();
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const fetchNewUsers = async () => {
    console.log("running fetch");
    try {
      incrementCounter();
      const res = await fetch(`https://randomuser.me/api?page=${counter}`);
      const data = await res.json();
      setData((prev) => [...prev, ...data.results]);
    } catch (e) {
      setError(e.message);
    }
  };

  console.log(data);

  return (
    <div className="container">
      <h4>Ben Awad Test </h4>
      <div className="counter_container">
        <h3>{counter}</h3>
        <button onClick={fetchNewUsers}>Fetch More Users</button>
      </div>

      <Users data={data} />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

function Users({ data }) {
  return (
    <div>
      {data?.map((user, index) => (
        <div key={index}>
          <h1>{user.name.first}</h1>
          <img
            src={user.picture.thumbnail}
            alt={`${user.name.first} User Picture`}
          />
        </div>
      ))}
    </div>
  );
}
