// import React from 'react'

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MovieContext } from "./MovieContext";
const Watchlist = () => {
  const { watchlist, setWatchlist, removeFromWatchlist } =
    useContext(MovieContext);
  const [search, setSearch] = useState("");
  const [allGenreIds, setAllGenreIds] = useState([]);
  const [genreList, setGenreList] = useState(["All Genre"]);
  const [currentGenre, setCurrentGenre] = useState("All Genre");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=e906656d57105b3d1344dfa9056c6b32&language=en-US`
      )
      .then((response) => {
        console.log(response.data.genres);
        setAllGenreIds(response.data.genres);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const sortAscend = () => {
    let sortedAscending = watchlist.sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setWatchlist([...sortedAscending]);
  };

  const sortDescend = () => {
    let sortedDescending = watchlist.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setWatchlist([...sortedDescending]);
  };

  const getGenre = (id) => {
    console.log("id", id);
    return allGenreIds.find((genre) => genre.id === id)?.name;
  };

  useEffect(() => {
    let temp = watchlist.map((movie) => {
      // return allGenreIds.find((genre) => genre.id === movie.genre_ids[0])?.name;
      return getGenre(movie.genre_ids[0]);
    });
    // remove duplicates
    temp = [...new Set(temp)];
    setGenreList(["All Genre", ...temp]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchlist, allGenreIds]);

  const handleFilter = (genre) => {
    setCurrentGenre(genre);
  };

  return (
    <>
      <div className="flex justify-center flex-wrap m-4 gap-4">
        {genreList.map((genre) => {
          return (
            <div
              key={genre}
              onClick={() => {
                handleFilter(genre);
              }}
              className={`flex justify-center items-center ${
                currentGenre === genre ? "bg-blue-400" : "bg-gray-400/50"
              } h-[3rem] w-[9rem] rounded-xl text-white font-bold `}
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search movies..."
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
          value={search}
          onChange={handleChange}
        />
      </div>
      {watchlist.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
          <table className="w-full text-gray-500 text-center text-lg">
            <thead className="border-b-2">
              <tr>
                <th>Movie</th>
                <th className="flex justify-center">
                  <div className="p-2 cursor-pointer" onClick={sortAscend}>
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className="p-2">Rating</div>
                  <div className="p-2 cursor-pointer" onClick={sortDescend}>
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                </th>

                <th>Popularity</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {watchlist
                .filter((movie) => {
                  if (currentGenre === "All Genre") {
                    return true;
                  } else {
                    return getGenre(movie.genre_ids[0]) === currentGenre;
                  }
                })
                .filter((movie) => {
                  return movie.original_title
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((movie) => {
                  return (
                    <tr className="border-b-2" key={movie.id}>
                      <td className="flex item-center px-6 py-4">
                        <img
                          className="h-[6rem] w-[10rem]"
                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        />
                        <div className="mx-6 my-8 font-bold">
                          {movie.original_title}
                        </div>
                      </td>
                      <td>{movie.vote_average}</td>
                      <td>{movie.popularity}</td>
                      <td>{getGenre(movie.genre_ids[0])}</td>
                      <td>
                        <button
                          className="text-red-800"
                          onClick={() => removeFromWatchlist(movie)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Watchlist;
