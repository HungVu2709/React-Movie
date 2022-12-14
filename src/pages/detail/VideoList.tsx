import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import { VideoResults } from "../../interfaces/movie";

const VideoList = (props: { id: string }) => {
  const { category } = useParams<string>();
  const [videos, setVideos] = useState<VideoResults[]>();

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category!, props.id);
      setVideos(res.results.slice(0, 5));
    };
    getVideos();
  }, [category, props.id]);

  return (
    <>
      {videos?.map((item: any, i: number) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
};

const Video = (props: { item: VideoResults }) => {
  const item = props.item;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const height = (iframeRef.current?.offsetWidth! * 9) / 16 + "px";
    iframeRef.current?.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
