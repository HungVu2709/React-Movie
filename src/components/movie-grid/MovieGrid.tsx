import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./_movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import { OutlineButton } from "../common/Button";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";

const MovieGrid = (props: { category: string }) => {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let res = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            res = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            res = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        res = await tmdbApi.search(props.category, { params });
      }
      setItems(res.results);
      setTotalPage(res.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let res = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          res = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          res = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      res = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...res.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="movie-grid">
        {items.map((item: any, i: number) => (
          <MovieCard key={i} category={props.category} item={item} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
