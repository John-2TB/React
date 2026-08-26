import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-image.png" alt="" />
          <h1>Find <span className='text-gradient'>Animes</span> You'll Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className='text-white text-2xl'>{searchTerm}</h1>
        </header>

        
      </div>
    </main>
  )
}

export default App