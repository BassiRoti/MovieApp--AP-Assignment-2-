import React from "react";
import useSWR from "swr";
import data from "../../../../Data/Movies.json"; 
import { useRouter } from "next/router";

const fetcher = ([_, movieId]) => {
  const movie = data.movies.find((movie) => movie.id === movieId);

  const director = data.directors.find((director) => director.id === movie.directorId);

  return { director, movieTitle: movie.title };t
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


  const { director, movieTitle } = result;

  return (
    <div>
      <h1>Director Details</h1>
      <ul>
        <li>
        Movie: {movieTitle || "Movie title not available"}
        </li>
        <li>
         Name:{director.name || "Name not available"}
        </li>
        <li>
          Biography: {director.biography || "Biography not available"}
        </li>
      </ul>
    </div>
  );
}
