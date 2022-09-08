import React, { Fragment, useState } from 'react';

import MovieItem from '../MoviesList/MovieItem';

import classes from './ResultsList.module.css';

const ResultsList = props => {
  let SearchListContent = <p>No movies found!</p>;

  if (props.results.length > 0) {
    SearchListContent = props.results.map((movie, index) => {
      return (
        <MovieItem key={index} data={movie} onShowModal={props.onShowModal} />
      );
    });
  }

  return (
    <div className={classes['results-container']}>
      <h3 className={classes.title}>Search Results</h3>
      <div className={classes['results-list']}>{SearchListContent}</div>
    </div>
  );
};

export default ResultsList;
