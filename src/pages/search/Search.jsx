import React, { Fragment, useState } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import SearchForm from '../../components/SearchForm/SearchForm';
import ResultsList from '../../components/ResultsList/ResultsList';
import DetailModal from '../../components/MoviesList/DetailModal';

const API_KEY = 'b3515899c7baeb5a09d76e6905a7267c';

function Search() {
  const [resultsList, setResultsList] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [modalIsShow, setModalIsShow] = useState(false);
  const [currentMovie, setCurrentMovie] = useState();
  const [movieData, setMovieData] = useState();
  const [movieKey, setMovieKey] = useState();

  //Search button event
  const onSearchHandler = keyword => {
    const fetchSearch = async () => {
      const respone = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}`
      );
      if (!respone.ok) {
        throw new Error('Some thing went Wrong!');
      }
      const data = await respone.json();

      setResultsList(data.results);
      setShowResults(true);
    };
    fetchSearch();
  };

  //Reset button event
  const onResetHandler = () => {
    setShowResults(false);
  };

  //Show detail modal  when click movie
  const showModalHandler = (movie, data) => {
    if (movie !== currentMovie) {
      setModalIsShow(true);
      const fetchMovieTrailer = async () => {
        const respone = await fetch(
          `https://api.themoviedb.org/3//movie/${data.id}/videos?api_key=${API_KEY}`
        );
        const videoData = await respone.json();
        console.log(videoData);
        if (videoData.results && videoData.results.length > 0) {
          const videoTrailerArr = videoData.results.filter(
            result => result.site === 'YouTube' && result.type === 'Trailer'
          );
          console.log(videoTrailerArr);
          const videoTeaserArr = videoData.results.filter(
            result => result.site === 'YouTube' && result.type === 'Teaser'
          );
          console.log(videoTeaserArr);
          if (videoTrailerArr.length > 0) {
            setMovieKey(videoTrailerArr[0].key);
          } else if (videoTeaserArr.length > 0) {
            setMovieKey(videoTeaserArr[0].key);
          }
        } else {
          setMovieKey(false);
        }
      };
      fetchMovieTrailer();

      setMovieData(data);
      setCurrentMovie(movie);
    } else {
      setModalIsShow(false);
      setCurrentMovie();
      setMovieData();
      setMovieKey();
      return;
    }
  };

  //close button event
  const onCloseHandler = () => {
    setModalIsShow(false);
  };

  return (
    <Fragment>
      <NavBar />
      <SearchForm onSubmit={onSearchHandler} onReset={onResetHandler} />
      {showResults && (
        <ResultsList results={resultsList} onShowModal={showModalHandler} />
      )}
      {modalIsShow && movieKey && (
        <>
          <DetailModal
            movieData={movieData}
            movieKey={movieKey}
            apiKey={API_KEY}
            onClose={onCloseHandler}
          />
          <div style={{ height: '50vh' }}></div>
        </>
      )}
      {modalIsShow && !movieKey && (
        <>
          <DetailModal
            movieData={movieData}
            movieKey={false}
            apiKey={API_KEY}
            onClose={onCloseHandler}
          />
          <div style={{ height: '50vh' }}></div>
        </>
      )}
    </Fragment>
  );
}

export default Search;
