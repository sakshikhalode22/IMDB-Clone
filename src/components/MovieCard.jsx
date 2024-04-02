// import React from 'react'

import PropTypes from "prop-types";
import { useContext } from "react";
import { MovieContext } from "./MovieContext";

const MovieCard = ({ movie, posterPath, name }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(MovieContext);

  const doesMovieInWatchlist = (movie) => {
    return watchlist.some((m) => m.id === movie.id);
  };

  const emojiclass =
    "m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60";
  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration:300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${posterPath})`,
      }}
    >
      {!doesMovieInWatchlist(movie) ? (
        <div className={emojiclass} onClick={() => addToWatchlist(movie)}>
          &#128525;
        </div>
      ) : (
        <div className={emojiclass} onClick={() => removeFromWatchlist(movie)}>
          &#10060;
        </div>
      )}
      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60 rounded-xl">
        {name}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  posterPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MovieCard;
