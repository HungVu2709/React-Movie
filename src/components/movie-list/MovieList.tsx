import React, { useState, useEffect } from "react";

import "./_movie-list.scss";

import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";

import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import Button from "../common/Button";
import MovieCard from "../movie-card/MovieCard";

interface IProps {
  category: string;
  type: string;
  id: number;
}
const MovieList = (props: any) => {
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    const getList = async () => {
      let res = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            res = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            res = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        res = await tmdbApi.similar(props.category, String(props.id));
      }
      setItems(res.results);
    };
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item: any, i: number) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
