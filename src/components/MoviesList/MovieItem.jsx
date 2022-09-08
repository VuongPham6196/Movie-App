import React from 'react';
import classes from './MovieItem.module.css';

const MovieItem = props => {
  //movie click event
  const movieClicked = event => {
    props.onShowModal(event.target, props.data);
  };

  return (
    <div className={classes['movie-item']}>
      <img
        src={`https://image.tmdb.org/t/p/original${props.data.poster_path}`}
        onClick={movieClicked}
        alt=""
      />
    </div>
  );
};

export default MovieItem;
