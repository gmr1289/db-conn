import React from "react";

import "./Movie.css";

const Movie = (props) => {
  const sendId = () => {
    props.destroy(props.title);
  };
  return (
    <li className="movie" onClick={sendId}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;
