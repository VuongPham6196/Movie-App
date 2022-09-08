import { useState, useEffect } from 'react';

import SearchIcon from './SearchIcon';
import React, { Fragment } from 'react';

import classes from './NavBar.module.css';

const NavBar = props => {
  const [offset, setOffset] = useState(0);

  //To the search page
  const toSearchPage = event => {
    event.preventDefault();
    window.location.replace('/Search');
  };

  //Change Navbar style when Scroll
  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY !== offset && offset < 100) {
        setOffset(window.scrollY);
      }
    });
  });

  const navbarClasses = `${
    offset > 100
      ? `${classes.navBar} ${classes.navBarScrolled}`
      : classes.navBar
  }`;

  return (
    <Fragment>
      <div className={navbarClasses}>
        <a className={classes.title} href="/">
          Movie App
        </a>
        <div className={classes.searchBtn} onClick={toSearchPage}>
          <SearchIcon />
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
