import React from "react";

import "./_movie-card.scss";

import { Link } from "react-router-dom";

import Button from "../common/Button";

import { category, ICategory } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { getMoviesListRequest, MovieListResult } from "../../interfaces/movie";

const MovieCard = (props: { category: string; item: MovieListResult }) => {
  const item = props.item;

  const link =
    "/" + category[props.category as keyof ICategory] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button className={undefined}>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
