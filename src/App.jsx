import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { MovieContext } from "./components/MovieContext";

import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Banner from "./components/Banner";

function App() {
  let [watchlist, setWatchlist] = useState([]);
  let addToWatchlist = (movie) => {
    let newWatchlist = [...watchlist, movie];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };
  let removeFromWatchlist = (movie) => {
    let newWatchlist = watchlist.filter((m) => m.id !== movie.id);
    localStorage.setItem("moviesApp", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  useEffect(() => {
    let movies = localStorage.getItem("moviesApp");
    if (!movies) {
      return;
    }
    setWatchlist(JSON.parse(movies));
  }, []);
  return (
    <>
      <MovieContext.Provider
        value={{
          watchlist,
          setWatchlist,
          addToWatchlist,
          removeFromWatchlist,
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Banner />
                  <Movies />
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                  <Banner />
                  <Movies />
                </>
              }
            />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </BrowserRouter>
      </MovieContext.Provider>
    </>
  );
}

export default App;

// https://api.themoviedb.org/3/movie/popular?api_key=e906656d57105b3d1344dfa9056c6b32&language=en-US&page=2
