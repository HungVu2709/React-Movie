import { AxiosResponse } from "axios";
import { getMoviesListRequest } from "../interfaces/movie";
import apiConfig from "./apiConfig";
import axiosClient from "./axiosClient";
interface ICategory {
  movie: string;
  tv: string;
}
interface IMovieType {
  upcoming: string;
  popular: string;
  top_rated: string;
}

interface ITvType {
  popular: string;
  top_rated: string;
  on_the_air: string;
}
export const category: ICategory = {
  movie: "movie",
  tv: "tv",
};

export const movieType: IMovieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType: ITvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMoviesList: (type: string, params: any): Promise<getMoviesListRequest> => {
    const url = "movie/" + movieType[type as keyof IMovieType];
    return axiosClient.get(url, params);
  },
  getTvList: (type: string, params: any) => {
    const url = "tv/" + tvType[type as keyof ITvType];
    return axiosClient.get(url, params);
  },
  getVideos: (cate: string, id: string) => {
    const url = category[cate as keyof ICategory] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (cate: string, params: any) => {
    const url = "search/" + category[cate as keyof ICategory];
    return axiosClient.get(url, params);
  },
  detail: (cate: string, id: string, params: any) => {
    const url = category[cate as keyof ICategory] + "/" + id;
    return axiosClient.get(url, params);
  },
  credits: (cate: string, id: string) => {
    const url = category[cate as keyof ICategory] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate: string, id: string) => {
    const url = category[cate as keyof ICategory] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
