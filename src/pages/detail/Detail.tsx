import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./_detail.scss";

import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import MovieList from "../../components/movie-list/MovieList";
import CastList from "./CastList";
import VideoList from "./VideoList";

type IParams = {
  id: string;
  category: string;
};

const Detail = () => {
  const { category, id } = useParams<IParams>();

  const [item, setItem] = useState<any>();

  useEffect(() => {
    const getDetail = async () => {
      const res = await tmdbApi.detail(category!, id!, { params: {} });
      setItem(res);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>

          <div className="movie-content mb-3 container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre: any, i: any) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>

              <p className="overview">{item.overview}</p>

              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category!} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Detail;
