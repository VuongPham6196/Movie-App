import React, { useState, useEffect, Fragment } from 'react';
import classes from './MoviesList.module.css';
import MovieItem from './MovieItem';

const MoviesList = props => {
  const [movieData, setMovieData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    //fetch data
    const fetchMovieList = async () => {
      const respone = await fetch(
        `https://api.themoviedb.org/3${props.request}`
      );
      if (!respone.ok) {
        throw new Error('Some thing went Wrong!');
      }
      const data = await respone.json();
      setMovieData(data.results);
      setIsError(false);
    };
    fetchMovieList().catch(error => {
      setIsError(true);
      setHttpError(error.message);
    });
  }, []);

  const movieListContent = movieData.map((movie, index) => {
    return (
      <MovieItem key={index} data={movie} onShowModal={props.onShowModal} />
    );
  });

  return (
    <Fragment>
      <div className={classes['movies-container']}>
        <h3>{props.title}</h3>
        {!isError && (
          <div
            className={`${classes['movies-list']} ${classes['snap-inline']}`}
          >
            {movieListContent}
          </div>
        )}
        {isError && <p>{httpError}</p>}
      </div>
    </Fragment>
  );
};

export default MoviesList;
