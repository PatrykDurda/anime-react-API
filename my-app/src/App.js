import './App.css';

import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://gogoanime.consumet.org/popular`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Anime API</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {data &&
          data.map(({ animeId, animeTitle, animeImg, releasedDate, animeUrl }) => (
            <li key={animeId}>
              <h3>{animeTitle}</h3>
              <img alt="Anime logo" src={animeImg}></img>
              <h4>{releasedDate}</h4>
              <a href={animeUrl}>Link to anime</a>
            </li>
          ))}
      </ul>
    </div>
  );
}
