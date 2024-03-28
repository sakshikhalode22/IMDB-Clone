import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Banner from "./components/Banner";

function App() {
  let [watchlist, setWatchlist] = useState([]);
  console.log(watchlist);
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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  addToWatchlist={addToWatchlist}
                  removeFromWatchlist={removeFromWatchlist}
                  watchlist={watchlist}
                />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Banner />
                <Movies
                  addToWatchlist={addToWatchlist}
                  removeFromWatchlist={removeFromWatchlist}
                  watchlist={watchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// https://api.themoviedb.org/3/movie/popular?api_key=e906656d57105b3d1344dfa9056c6b32&language=en-US&page=2
