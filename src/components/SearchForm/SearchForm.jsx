import React, { useRef, useState } from 'react';

import SearchIcon from '../NavBar/SearchIcon';

import classes from './SearchForm.module.css';

const SearchForm = props => {
  const searchInputRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //submit event
  const onSubmitHandler = event => {
    if (searchInputRef.current.value) {
      setIsValid(true);
      props.onSubmit(searchInputRef.current.value);
      setIsSubmitted(true);
    } else {
      setIsValid(false);
      setIsSubmitted(true);
    }
  };

  //input validate
  const inputChangeHandler = () => {
    if (searchInputRef.current.value) {
      setIsValid(true);
    }
  };

  //Reset event
  const onResetHandler = event => {
    searchInputRef.current.value = '';
    setIsValid(false);
    setIsSubmitted(false);
    props.onReset();
  };

  return (
    <div className={classes['form-control']}>
      <div className={classes['form-input']}>
        <input
          type="text"
          placeholder="Search"
          ref={searchInputRef}
          onChange={inputChangeHandler}
        ></input>
        <SearchIcon />
      </div>
      {!isValid && isSubmitted && (
        <p className={classes['form-invalid']}>Please input a valid keyword!</p>
      )}
      <div className={classes.divide}></div>
      <div className={classes['form-button']}>
        <button
          className={classes['form-resetBtn']}
          type="button"
          onClick={onResetHandler}
        >
          RESET
        </button>
        <button className={classes['form-searchBtn']} onClick={onSubmitHandler}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
