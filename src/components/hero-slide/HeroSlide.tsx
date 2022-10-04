import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "./hero-slide.scss";
import Button, { OutlineButton } from "../common/Button";
import Modal, { ModalContent } from "../modal/Modal";

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
  SwiperCore.use([Autoplay]);

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

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 2000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props: { item: IMoviesList; className: string }) => {
  const navigate = useNavigate();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path!
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)
      ? document.querySelector(`#modal_${item.id}`)
      : null;

    const videos = await tmdbApi.getVideos(category.movie, String(item.id));

    if (videos.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        ?.querySelector(".modal__content > iframe")!
        .setAttribute("src", videSrc);
    } else {
      modal!.querySelector(".modal__content")!.innerHTML = "No trailer";
    }

    modal?.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ background: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button
              onClick={() => navigate("/movie/" + item.id)}
              className={undefined}
            >
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive} className={undefined}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path!)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props: { item: IMoviesList }) => {
  const item = props.item;

  const iframeRef = useRef<any>(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
