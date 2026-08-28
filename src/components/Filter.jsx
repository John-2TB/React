import React from 'react'

const Filter = ({ genres, animes }) => {
  const allGenres = animes.flatMap((anime) => anime.genres);

  const uniqueGenres = [
    ...new Map(allGenres.map((genre) => [genre.mal_id, genre])).values()
  ];

  return (
    <div className='filter'>
      <h3>Filter By</h3>

      <div>
        <button
          onClick={() => genres('')}
        >All</button>

        {uniqueGenres.map((genre) => (
          <button
            key={genre.mal_id}
            onClick={() => {genres(genre.mal_id); console.log(genre.mal_id)}}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filter