import React from "react";

import Movie from "./Movie";
import "./MoviesList.css";

const MovieList = (props) => {
  const dest = (propsId) => {
    props.destroy(propsId);
  };
  return (
    <ul className="movies-list">
      {props.movies.map((movie) => (
        <Movie
          destroy={dest}
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
