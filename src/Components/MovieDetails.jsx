import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './Spinner.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${movieId}?language=en-US&append_to_response=videos`,
          API_OPTIONS
        );
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovie(data);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage('Could not load movie details.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Spinner />;
  if (errorMessage) return <div className="text-red-500">{errorMessage}</div>;
  if (!movie) return null;

  const trailer = movie.videos?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <div className="text-white flex justify-center items-center p-2">
      <div className="max-w-5xl w-full bg-gray-900/80 backdrop-blur-md px-8 py-6 rounded-xl shadow-2xl overflow-auto max-h-screen">
        
        {/* Header */}
        <div className="relative flex items-center justify-start mb-4">
        <button
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            onClick={() => navigate(-1)}
        >
            ← Back
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-gray-300 text-2xl truncate text-center max-w-[70%]">
            {movie.title}
        </h1>
        </div>




        {/* Poster + Trailer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/src/assets/No-Poster.png'
            }
            alt={movie.title}
            className="rounded-lg shadow-lg w-full max-h-[350px] object-cover"
          />
          {trailer ? (
            <iframe
              className="w-full h-[200px] md:h-[350px] rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center bg-gray-800 rounded-lg h-[200px] md:h-[350px]">
              <p className="text-gray-400">No Trailer Available</p>
            </div>
          )}
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {movie.genres?.map((g) => (
            <span
              key={g.id}
              className="bg-purple-700/70 px-3 py-1 rounded-full text-sm font-medium shadow"
            >
              {g.name}
            </span>
          ))}
        </div>

        {/* Overview */}
        <div className="mb-6">

          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p className="text-gray-300">{movie.overview || 'No overview available.'}</p>
        </div>

        {/* Movie Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
          <div>
            <p><span className="font-semibold">Release date:</span> {movie.release_date}</p>
            <p><span className="font-semibold">Status:</span> {movie.status}</p>
            <p><span className="font-semibold">Runtime:</span> {movie.runtime} min</p>
            <p><span className="font-semibold">Languages:</span> {movie.spoken_languages?.map(l => l.english_name).join(', ')}</p>
          </div>
          <div>
            <p><span className="font-semibold">Budget:</span> ${movie.budget?.toLocaleString()}</p>
            <p><span className="font-semibold">Revenue:</span> ${movie.revenue?.toLocaleString()}</p>
            <p><span className="font-semibold">Tagline:</span> {movie.tagline || 'N/A'}</p>
            <p>
              <span className="font-semibold">Production:</span>{' '}
              {movie.production_companies?.map(c => c.name).join(', ') || 'N/A'}
            </p>
          </div>
        </div>

        {/* Homepage button */}
        {movie.homepage && (
          <div className="mt-6">
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg shadow transition"
            >
              Visit Homepage →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
