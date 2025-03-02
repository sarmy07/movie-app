import React, { useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const API_KEY = "b14ae484";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    if (!query) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        console.log(response);
        setError("");
      } else {
        setMovies([]);
        setError("Movie not found. Please try another title.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Movie Search App
      </h1>

      <div className="flex w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <input
          type="text"
          placeholder="Enter movie title..."
          className="flex-1 p-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={fetchMovies}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? <AiOutlineLoading3Quarters /> : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}

      {movies?.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies?.map((movie) => (
            <div
              to={`/movie/${movie.imdbID}`}
              key={movie.imdbID}
              className="bg-white rounded-lg flex flex-col items-start shadow-md p-4"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-48 h-auto my-4 rounded-md self-center"
              />
              <h2 className="text-2xl font-semibold">{movie.Title}</h2>
              <p>
                <strong>Release Date:</strong> {movie.Year}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
