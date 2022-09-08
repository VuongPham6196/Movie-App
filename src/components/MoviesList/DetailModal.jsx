import React from 'react';
import YouTube from 'react-youtube';

import classes from './DetailModal.module.css';

const DetailModal = props => {
  //youtube options
  const opts = {
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  //Close detail modal event
  const onCloseModal = () => {
    props.onClose();
  };

  return (
    <div className={classes['detail-container']}>
      <div className={classes.detail}>
        <h2>{props.movieData.title || props.movieData.name}</h2>
        <hr />
        <div className={classes['detail-date-rate']}>
          <p>
            Release Date:{' '}
            {props.movieData.release_date || props.movieData.first_air_date}
          </p>
          <p>Vote: {props.movieData.vote_average} / 10</p>
        </div>
        <p className={classes['detail-overview']}>{props.movieData.overview}</p>
      </div>
      <div className={classes['video-trailer']}>
        {props.movieKey && <YouTube videoId={props.movieKey} opts={opts} />}
        {!props.movieKey && (
          <img
            src={`https://image.tmdb.org/t/p/original${
              props.movieData.backdrop_path || props.movieData.poster_path
            }`}
          />
        )}
      </div>
      <button onClick={onCloseModal}>✖</button>
    </div>
  );
};

export default DetailModal;
