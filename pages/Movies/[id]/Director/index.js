import React from "react";
import useSWR from "swr";
import data from "../../../../Data/Movies.json";
import { useRouter } from "next/router";

// Updated fetcher
const fetcher = ([_, movieId]) => {
  const movie = data.movies.find((movie) => movie.id === movieId);
  if (!movie) {
    throw new Error("Movie not found");
  }

  const director = data.directors.find((director) => director.id === movie.directorId);
  if (!director) {
    throw new Error("Director not found");
  }

  const moviesByDirector = data.movies.filter(
    (m) => m.directorId === director.id
  );

  return {
    director,
    movieTitle: movie.title,
    moviesByDirector,
  };
};

export default function DirectorPage() {
  const router = useRouter();
  const movieId = router.query.id;

  const { data: result, error, isValidating } = useSWR(
    movieId ? ["movie-director", movieId] : null,
    fetcher
  );

  if (isValidating) return <div>Loading...</div>;
  if (error) return <div>Failed to load director details: {error.message}</div>;
  if (!result) return <div>Loading Director Details...</div>;

  const { director, movieTitle, moviesByDirector } = result;

  return (
    <div>
      <h1>Director Details</h1>
      <ul>
        <li>Movie: {movieTitle || "Movie title not available"}</li>
        <li>Name: {director.name || "Name not available"}</li>
        <li>Biography: {director.biography || "Biography not available"}</li>
      </ul>

      <h2>Other Movies by {director.name}</h2>
      <ul>
        {moviesByDirector.length > 0 ? (
          moviesByDirector.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.releaseYear})
            </li>
          ))
        ) : (
          <li>No other movies found for this director.</li>
        )}
      </ul>
    </div>
  );
}
