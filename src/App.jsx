import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use';
import Search from './components/Search'
import Spinner from './components/Spinner';
import AnimeCard from './components/AnimeCard';
import { getTrendingAnimes, updateSearchCount } from './appwrite';
import Pagination from './components/Pagination';
import AnimeModal from './components/AnimeModal';

const App = () => {
  const API_URL = 'https://api.tenrai.org/v1';


  // ========================
  // useState
  // ========================
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');
  const [trendingAnimes, settrendingAnimes] = useState([]);
  const [trendingAnimesErrorMessage, settrendingAnimesErrorMessage] = useState('');
  const [isTrendingAnimesLoading, setisTrendingAnimesLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [hasNextPage, sethasNextPage] = useState(false);
  const [selectedAnime, setselectedAnime] = useState(null);



  useDebounce(() => setdebouncedSearchTerm(searchTerm.toLocaleLowerCase()), 750, [searchTerm]);


  // ========================
  // Functions
  // ========================
  const fetchTopAnimes = async (query= '') => {
    setisLoading(true);
    setErrorMessage('');

    try {
      const response = query ? await fetch(`${API_URL}/anime?q=${encodeURIComponent(query)}&page=${page}`) : await fetch(`${API_URL}/top/anime?page=${page}`)

      if(!response.ok) {
        if(response.status === 504) {
          throw new Error('Jikan is temporarily unavailable. Please try again.')
        }
        throw new Error(`HTTP Error Status: ${response.status}`)
      }

      const data = await response.json();

      if(!data.data) {
        setErrorMessage(`${'Failed to fetch animes'}`);
        setAnimeList([]);
        return;
      }

      sethasNextPage(data.pagination.has_next_page || false);

      setAnimeList(data.data || []);

      if(query && data.data.length > 0) {
        await updateSearchCount(query, data.data[0]); 
      }
    } catch (error) {
      console.error(`Error fetching animes: ${error}`);
      setErrorMessage(`Error fetching data. Please try again later`);
    } finally {
      setisLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setisTrendingAnimesLoading(true);
    settrendingAnimesErrorMessage('')

    try {
      const response = await getTrendingAnimes();

      settrendingAnimes(Array.isArray(response) ? response : []);

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      settrendingAnimesErrorMessage('Error fetching trending animes. Please try again later.');
      
    } finally {
      setisTrendingAnimesLoading(false)
    }
  }

  // ========================
  // useEffects
  // ========================
  useEffect(() => {
    fetchTopAnimes(debouncedSearchTerm);
  }, [debouncedSearchTerm, page]);

  // Reset pagination to 1 useEffect
  useEffect(() => {
    setpage(1)
  }, [debouncedSearchTerm]);

  // Trending Anime useEffect
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  // Stop scrolling body
  useEffect(() => {
    {selectedAnime ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = ''}
  }, [selectedAnime]);
  

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-image.png" alt="" />
          <h1>Find <span className='text-gradient'>Animes</span> You'll Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingAnimes.length > 0 && (
          <section className='trending'>
            <h2>Trending Animes</h2>

            <ul>
              {isTrendingAnimesLoading ? (<Spinner />) : trendingAnimesErrorMessage ? (<p className='text-red-500'>{trendingAnimesErrorMessage}</p>) : (
                trendingAnimes.map((anime, index) => (
                <li key={anime.$id}>
                  <p>{index + 1}</p>
                  <img src={anime.poster_url} alt="Image poster" />
                </li>
              ))
              )}
            </ul>
          </section>
        )} 


        {/* All Animes Section */}
        <section className="all-movies">
          <h2 className='mt-15'>All Animes</h2>
          
          {isLoading ? (<Spinner />) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : (
            <ul>
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} onSelect={setselectedAnime}/>
                
              ))}
            </ul>
          )}

          {selectedAnime && (<AnimeModal anime={selectedAnime} onSelect={setselectedAnime}/>)}

          <Pagination page={page} hasNextPage={hasNextPage} setPage={setpage}/>
        </section>
      </div>
    </main>
  )
}

export default App