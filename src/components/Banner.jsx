// import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Banner = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [randomMovie, setRandomMovie] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=e906656d57105b3d1344dfa9056c6b32&language=en-US&page=1`
      )
      .then((response) => {
        let allMovies = response.data.results;
        setMoviesList(allMovies);
        setRandomMovie(allMovies[Math.floor(Math.random() * allMovies.length)]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // change the random movie every 5 seconds
    const interval = setInterval(() => {
      setRandomMovie(moviesList[Math.floor(Math.random() * moviesList.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, [moviesList]);
  return (
    <div
      className="h-[20vh] md:h-[80vh] bg-cover flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${randomMovie?.backdrop_path})`,
      }}
    >
      <div className="bg-gray-900/60 w-full p-2 flex items-center justify-center text-2xl text-white">
        {randomMovie.original_name}
      </div>
    </div>
  );
};

export default Banner;
