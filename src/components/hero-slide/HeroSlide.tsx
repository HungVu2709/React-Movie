import React, { useEffect, useState } from "react";
import tmdbApi, { movieType } from "../../api/tmdbApi";

interface IMoviesList {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids: {
    0: number;
    1: number;
  }[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState<IMoviesList[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { params });

        setMovieItems(res.results.slice(0, 4));
      } catch {
        console.log("Sth Error :( ");
      }
    };
    getMovies();
  }, []);

  return <div>HeroSlide</div>;
};

export default HeroSlide;
