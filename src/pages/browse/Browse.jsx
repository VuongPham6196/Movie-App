import React, { Fragment, useState } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import Banner from '../../components/Banner/Banner';
import MoviesList from '../../components/MoviesList/MoviesList';
import DetailModal from '../../components/MoviesList/DetailModal';

const API_KEY = 'b3515899c7baeb5a09d76e6905a7267c';
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

function Browse() {
  const [modalIsShow, setModalIsShow] = useState(false);
  const [currentMovie, setCurrentMovie] = useState();
  const [movieData, setMovieData] = useState();
  const [movieKey, setMovieKey] = useState();

  //Show detail modal  when click movie
  const showModalHandler = (movie, data) => {
    if (movie !== currentMovie) {
      setModalIsShow(true);
      const fetchMovieTrailer = async () => {
        const respone = await fetch(
          `https://api.themoviedb.org/3//movie/${data.id}/videos?api_key=${API_KEY}`
        );
        const videoData = await respone.json();

        if (videoData.results && videoData.results.length > 0) {
          const videoTrailerArr = videoData.results.filter(
            result => result.site === 'YouTube' && result.type === 'Trailer'
          );

          const videoTeaserArr = videoData.results.filter(
            result => result.site === 'YouTube' && result.type === 'Teaser'
          );

          if (videoTrailerArr.length > 0) {
            setMovieKey(videoTrailerArr[0].key);
          } else if (videoTeaserArr.length > 0) {
            setMovieKey(videoTeaserArr[0].key);
          }
        } else {
          setMovieKey();
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

  const onCloseHandler = () => {
    setModalIsShow(false);
  };

  return (
    <Fragment>
      <NavBar />
      <Banner requests={requests} />
      <MoviesList
        onShowModal={showModalHandler}
        request={requests.fetchNetflixOriginals}
        title="Original"
      />
      <MoviesList
        onShowModal={showModalHandler}
        request={requests.fetchTrending}
        title="Trending"
      />
      <MoviesList
        onShowModal={showModalHandler}
        request={requests.fetchTopRated}
        title="TopRated"
      />
      <MoviesList
        onShowModal={showModalHandler}
        request={requests.fetchActionMovies}
        title="Action"
      />
      <MoviesList
        onShowModal={showModalHandler}
        request={requests.fetchComedyMovies}
        title="Comedy"
      />
      <MoviesList
        onShowModal={showModalHandler}
        request={requests.fetchHorrorMovies}
        title="Horror"
      />
      <MoviesList
        onShowModal={showModalHandler}
        request={requests.fetchRomanceMovies}
        title="Romance"
      />
      <MoviesList
        onShowModal={showModalHandler}
        request={requests.fetchDocumentaries}
        title="Documentaries"
      />
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

export default Browse;
