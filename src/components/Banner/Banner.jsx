import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';

import classes from './Banner.module.css';

const Banner = props => {
  const [movieData, setMovieData] = useState({});
  const [isError, setIsError] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    //fetch data
    const fetchBannerMovie = async () => {
      const respone = await fetch(
        `https://api.themoviedb.org/3${props.requests.fetchNetflixOriginals}`
      );
      if (!respone.ok) {
        throw new Error('Some thing went Wrong!');
      }
      const data = await respone.json();

      setMovieData(
        data.results[Math.floor(Math.random() * data.results.length)]
      );
      setIsError(false);
    };
    fetchBannerMovie().catch(error => {
      setIsError(true);
      setHttpError(error.message);
    });
  }, []);

  return (
    <Fragment>
      {!isError && (
        <div className={classes.banner}>
          <img
            src={`https://image.tmdb.org/t/p/original${
              movieData.backdrop_path || movieData.poster_path
            }`}
          />
          <div className={classes['movie-detail']}>
            <h2>{movieData.name}</h2>
            <button>Play</button>
            <button>My List</button>
            <p>{movieData.overview}</p>
          </div>
        </div>
      )}
      {isError && <p>{httpError.message}</p>}
    </Fragment>
  );
};

export default Banner;
