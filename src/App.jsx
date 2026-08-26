import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';

const App = () => {
  const API_URL = 'https://api.jikan.moe/v4';

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchTopAnimes = async () => {
    setisLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/top/anime`)

      if(!response.ok) {
        throw new Error(`${error.status}, ${error.message}`)
      }

      const data = await response.json()

      console.log(data);

      if(!data.data) {
        setErrorMessage(`${error.message || 'Failed to fetch animes'}`);
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
    fetchTopAnimes();
  }, []);

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
          <h2 className='mt-15'>Top Animes</h2>
          
          {isLoading ? (<Spinner />) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : (
            <ul>
              {animeList.map((anime) => (
                <p key={anime.mal_id} className='text-white'>{anime.title_english}</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App