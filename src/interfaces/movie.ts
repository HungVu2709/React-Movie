export interface getMoviesListRequest {
  page: number;
  results: {
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
  }[];
  total_pages: number;
  total_results: number;
}

export interface getVideosRequest {
  id: number;
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
  }[];
}

export interface MovieListResult {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: {
    0: number;
    1: number;
  }[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
}
