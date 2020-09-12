import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../../service';
import RBCarousel from 'react-bootstrap-carousel';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  useEffect(() => {
    async function fetchApi() {
      setNowPlaying(await fetchMovies());
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
    </div>
  );
}
