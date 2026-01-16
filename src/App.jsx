import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Search from './Components/Search.jsx';
import Spinner from './Components/Spinner.jsx';
import MovieCard from './Components/MovieCard.jsx';
import MovieDetails from './Components/MovieDetails.jsx';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS ={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

// function MovieDetails({ movieId }) {
//   // You can fetch movie details here using movieId
//   return <div className="text-white">Movie Details for ID: {movieId}</div>;
// }

function Home({
  searchTerm, setSearchTerm, setQuery, handleSearchIn,
  movies, Loding, errorMessage
}) {
  const navigate = useNavigate();
  return (
    <>
      <header className='w-full'>
        <img src="src/assets/logo.png" className="h-10" alt="Logo" />
        <img src="src/assets/hero-img.png" className="h-70" alt="Hero-image" />
        <h1 className='text-6sasxl'>Find <span className='text-gradient'>Movies</span> You’ll Love Without the Hassle</h1>
        <Search searchIn={searchTerm} setSearchIn={setSearchTerm} setQuery={setQuery} handleSearchIn={handleSearchIn} />
      </header>
      <section className='all-movies'>
        <div className='w- text-left m-0 p-0'>
          <h1 className='text-xl '>All Movies</h1>
        </div>
        {Loding && <Spinner />}
        {!Loding && errorMessage && <div className="error-message">{errorMessage}</div>}
        {!Loding && !errorMessage && (
          <ul>
            {movies.length === 0 ? (
              <div className=""><p className="text-white">No movies found.</p></div>
            ) : (
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              ))
            )}
          </ul>
        )}
      </section>
    </>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState(null);
  const [query, setQuery] = useState('');
  const handleSearchIn = (value) => {
    setSearchTerm(value);
    fetchMovies(value);
  }
  const [movies, setMovies] = useState([]);
  const [Loding, setLoding] = useState(false);
  const fetchMovies = async (query) => {
    setLoding(true);
    try{
      const endpoint = (query) ? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok){
        throw new Error("Network response was not ok");
        setLoding(false);
      }
      const data = await response.json();
      console.log(data);
      if(data.results.length === 0){
        seterrorMessage("No movies found.");
        setLoding(false);
        setMovies([]);
        return;
      }
      else {
        setMovies(data.results);  
        seterrorMessage(null);
      }
      // console.log(data.results);
      setLoding(false);
    }
    catch(error){
      seterrorMessage("Failed to fetch movies. Please try again later.");
      console.log("Error fetching movies:", error);
      setLoding(false);
    }
    finally {
      setLoding(false);
    }
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className="pattern">
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setQuery={setQuery}
                handleSearchIn={handleSearchIn}
                movies={movies}
                Loding={Loding}
                errorMessage={errorMessage}
              />
            }
          />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;