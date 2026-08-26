import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use';
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const App = () => {
  const API_URL = 'https://api.jikan.moe/v4';

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');

  useDebounce(() => setdebouncedSearchTerm(searchTerm.toLocaleLowerCase()), 750, [searchTerm]);

  const fetchTopAnimes = async (query= '') => {
    setisLoading(true);
    setErrorMessage('');

    try {
      const response = query ? await fetch(`${API_URL}/anime?q=${encodeURIComponent(query)}`) : await fetch(`${API_URL}/top/anime`)

      if(!response.ok) {
        throw new Error(`${response.status}, ${response.message}`)
      }

      const data = await response.json()

      console.log(data);

      if(!data.data) {
        setErrorMessage(`${response.message || 'Failed to fetch animes'}`);
        setAnimeList([]);
        return;
      }

      setAnimeList(data.data || []);
    } catch (error) {
      console.error(`Error fetching animes: ${error}`);
      setErrorMessage('Error fetching data. Please try again later');
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAnimes(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-image.png" alt="" />
          <h1>Find <span className='text-gradient'>Animes</span> You'll Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className='mt-15'>All Animes</h2>
          
          {isLoading ? (<Spinner />) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : (
            <ul>
              {animeList.map((anime) => (
                <MovieCard key={anime.mal_id} anime={anime} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App