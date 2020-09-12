import React, { useState, useEffect } from 'react';
import { fetchMovies, fetchGenre, fetchMovieByGenre } from '../../service';
import RBCarousel from 'react-bootstrap-carousel';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import '../../index.css';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [geners, setGeneres] = useState([]);
  const [movieByGenre, setMoviebyGenre] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      setNowPlaying(await fetchMovies());
      setGeneres(await fetchGenre());
      setMoviebyGenre(await fetchMovieByGenre(28));
    }
    fetchApi();
  }, []);
  const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <div style={{ height: 500, width: '100%' }} key={index}>
        <div className="carousel-center">
          <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center">
          <i
            className="far fa-play-circle"
            style={{ fontSize: 95, color: '#f4c10f' }}
          ></i>
        </div>
        <div
          className="carousel-captain"
          style={{ textAlign: 'center', fontSize: 35 }}
        >
          {item.title}
        </div>
      </div>
    );
  });
  const genreList = geners.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button type="button" class="btn btn-outline-info">
          {item.name}
        </button>
      </li>
    );
  });

  const movieList = movieByGenre.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: 'bolder' }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={'#f4c10f'}
          ></ReactStars>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <RBCarousel
            autoplay={true}
            pauseOnVisibility={true}
            slidesshowSpeed={5000}
            version={4}
            indicator={false}
          >
            {movies}
          </RBCarousel>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>

    
        <div className="row mt-3">{movieList}</div>
      
    </div>
  );
}
