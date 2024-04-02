// import React from 'react'

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=e906656d57105b3d1344dfa9056c6b32&language=en-US&page=${pageNumber}`
      )
      .then((response) => {
        console.log(response.data.results);
        setMoviesList(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNumber]);

  const handlePrev = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className="p-5">
      <div className="text-2xl font-bold p-5 m-5 text-center">
        Trending Movies
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-5">
        {moviesList.map((movie) => {
          return (
            <MovieCard
              movie={movie}
              posterPath={movie.poster_path}
              name={movie.original_title}
              id={movie.id}
              key={movie.id}
            />
          );
        })}
      </div>
      <Pagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default Movies;
