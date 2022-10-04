import React, { useEffect, useState } from "react";
import tmdbApi, { movieType } from "../../api/tmdbApi";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const param = { page: 1 };
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { param });
        console.log(res);
      } catch {
        console.log("Error");
      }
    };
    getMovies();
  }, []);

  return <div>HeroSlide</div>;
};

export default HeroSlide;
