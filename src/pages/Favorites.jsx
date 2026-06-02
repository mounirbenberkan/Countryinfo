import { useEffect, useState } from 'react'
import CountryCard from '../components/CountryCard'
import { getFavorites } from '../utils/localStorage'

function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  function updateFavorites() {
    setFavorites(getFavorites())
  }

  return (
    <div className="app">
      <h1>Favoritländer</h1>

      {favorites.length === 0 ? (
        <p className="empty-message">
          Du har inte lagt till några favoritländer än.
        </p>
      ) : (
        <>
          <p className="count">{favorites.length} favoritländer sparade</p>

          <div className="grid">
            {favorites.map((country) => (
              <CountryCard
                key={country.cca3 || country.name.common}
                country={country}
                onFavoriteChange={updateFavorites}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Favorites