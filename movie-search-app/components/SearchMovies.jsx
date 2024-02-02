import { useState } from 'react';
import GetMovies from './GetMovies';

const SearchMovies = ( {movie} ) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6fc98d83b841a28adb1ff67f3bb34889&language=en-US&query=${query}&page=1&include_adult=false`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.results);
      setError(null);
    } catch (error) {

      console.error('Error fetching data:', error.message);
      setError(error.message);
      setMovies([]);
    }
  };

  return (
    <>
    <div className="contain">
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="Find a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="card-list">
              <h2>Search Results:</h2>
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <GetMovies movie={movie} key={movie.id}/>
                ))}
        </div>
    </div>
    </>
  );
};

export default SearchMovies;
