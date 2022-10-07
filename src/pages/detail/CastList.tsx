import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";

import { CastCredit } from "../../interfaces/movie";

const CastList = (props: { id: string }) => {
  const { category } = useParams<string>();
  const [casts, setCasts] = useState<CastCredit[]>();

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category!, props.id);
      setCasts(res.cast.slice(0, 5));
    };
    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts?.map((item: any, i: number) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
            }}
          ></div>
          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
