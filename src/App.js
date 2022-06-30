import React, { useState, useCallback, useEffect } from "react";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [dataLoad, setdataLoad] = useState();

  const FetchFunction = useCallback(async () => {
    setdataLoad(true);

    const rep = await fetch(
      "https://react-db-16b40-default-rtdb.firebaseio.com/movie.json"
    );

    const data = await rep.json();

    const LoadMovie = [];
    for (const key in data) {
      LoadMovie.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,
      });
    }

    setMovies(LoadMovie);
    setdataLoad(false);
  }, []);
  useEffect(() => {
    FetchFunction();
  }, [FetchFunction]);

  async function AddMovieHandler(movie) {
    fetch("https://react-db-16b40-default-rtdb.firebaseio.com/movie.json", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    });
  }

  useEffect(() => {
    FetchFunction();
  }, []);

  const destroy = (gotTitle) => {
    setMovies(movies.filter((item) => item.title !== gotTitle));
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={AddMovieHandler} />
      </section>
      <section>
        <button onClick={FetchFunction}>Fetch Movies</button>
      </section>
      <section>
        {dataLoad ? (
          <h3>Data is Loading</h3>
        ) : (
          <MoviesList movies={movies} destroy={destroy} />
        )}
        {movies.length === 0 && !dataLoad && <h3>No movies found</h3>}
      </section>
    </React.Fragment>
  );
};

export default App;
