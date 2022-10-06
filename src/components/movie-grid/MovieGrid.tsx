import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import "./_movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import Button, { OutlineButton } from "../common/Button";

import tmdbApi, {
  category,
  ICategory,
  movieType,
  tvType,
} from "../../api/tmdbApi";
import Input from "../common/Input";
import { useNavigate } from "react-router-dom";

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
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword!} />
      </div>

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

const MovieSearch = (props: { category: string; keyword: string | number }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string | number>(
    props.keyword ? props.keyword : ""
  );
  const goToSearch = useCallback(() => {
    if (keyword.toString().trim().length > 0) {
      navigate(
        `/${category[props.category as keyof ICategory]}/search/${keyword}`
      );
    } else {
      navigate(`/${category[props.category as keyof ICategory]}/`);
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e: any) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        value={keyword}
        type="text"
        placeholder="Enter search ..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};
export default MovieGrid;
