import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use';
import Search from './components/Search'
import Spinner from './components/Spinner';
import AnimeCard from './components/AnimeCard';
import { getTrendingAnimes, updateSearchCount } from './appwrite';

const App = () => {
  const API_URL = 'https://api.jikan.moe/v4';

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');
  const [trendingAnimes, settrendingAnimes] = useState([]);
  const [trendingAnimesErrorMessage, settrendingAnimesErrorMessage] = useState('');

  useDebounce(() => setdebouncedSearchTerm(searchTerm.toLocaleLowerCase()), 750, [searchTerm]);

  const fetchTopAnimes = async (query= '') => {
    setisLoading(true);
    setErrorMessage('');

    try {
      const response = query ? await fetch(`${API_URL}/anime?q=${encodeURIComponent(query)}`) : await fetch(`${API_URL}/top/anime`)

      if(!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`)
      }

      const data = await response.json()

      console.log(data);

      if(!data.data) {
        setErrorMessage(`${'Failed to fetch animes'}`);
        setAnimeList([]);
        return;
      }

      setAnimeList(data.data || []);

      if(query && data.data.length > 0) {
        await updateSearchCount(query, data.data[0]); 
      }
    } catch (error) {
      console.error(`Error fetching animes: ${error}`);
      setErrorMessage('Error fetching data. Please try again later');
    } finally {
      setisLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setisLoading(true);
    settrendingAnimesErrorMessage('')

    try {
      const response = await getTrendingAnimes();

      if(!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`)
      }

      settrendingAnimes(Array.isArray(response) ? response : []);

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      settrendingAnimesErrorMessage('Error fetching trending animes. Please try again later.');
      
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    fetchTopAnimes(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Trending Anime useEffect
  useEffect(() => {
    loadTrendingMovies();
  }, [])
  

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-image.png" alt="" />
          <h1>Find <span className='text-gradient'>Animes</span> You'll Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingAnimes.length > 0 ? (
          <section className='trending'>
            <h2>Trending Animes</h2>

            <ul>
              {trendingAnimes.map((anime, index) => {
                <li key={anime.$id}>
                  <p>{index + 1}</p>
                  <img src={anime.poster_url} alt="" />
                </li>
              })}
            </ul>
          </section>
        ) : trendingAnimesErrorMessage ? (
          <section className="trending">
            <h2>Trending Animes</h2>

            <p className='text-red-500'>{trendingAnimesErrorMessage}</p>
          </section>
        ) : (
          <scetion className="trending">
            <h2>Trending Animes</h2>

            <p>No trending animes</p>
          </scetion>
        )}

        <section className="all-movies">
          <h2 className='mt-15'>All Animes</h2>
          
          {isLoading ? (<Spinner />) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : (
            <ul>
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App