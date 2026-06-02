import { useEffect, useState } from 'react'
import './CountryCard.css'
import {
  addFavorite,
  removeFavorite,
  addToWishlist,
  removeFromWishlist,
  isFavoriteCountry,
  isWishlistCountry
} from '../utils/localStorage'

function CountryCard({ country, onFavoriteChange, onWishlistChange }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)

  const capital = country.capital?.[0] ?? 'N/A'
  const population = country.population?.toLocaleString() ?? 'N/A'

  useEffect(() => {
    setIsFavorite(isFavoriteCountry(country))
    setIsInWishlist(isWishlistCountry(country))
  }, [country])

  function handleFavoriteClick() {
    if (isFavorite) {
      removeFavorite(country)
      setIsFavorite(false)
    } else {
      addFavorite(country)
      setIsFavorite(true)
    }
  
    if (onFavoriteChange) {
      onFavoriteChange()
    }
  }
  
  function handleWishlistClick() {
    if (isInWishlist) {
      removeFromWishlist(country)
      setIsInWishlist(false)
    } else {
      addToWishlist(country)
      setIsInWishlist(true)
    }
  
    if (onWishlistChange) {
      onWishlistChange()
    }
  }

  return (
    <div className="card">
      <img
        src={country.flags?.svg}
        alt={`Flagga för ${country.name.common}`}
      />

      <div className="card-body">
        <h3>{country.name.common}</h3>

        <p>
          <strong>Huvudstad:</strong> {capital}
        </p>

        <p>
          <strong>Region:</strong> {country.region}
        </p>

        <p>
          <strong>Befolkning:</strong> {population}
        </p>

        <div className="card-buttons">
          <button type="button" onClick={handleFavoriteClick}>
            {isFavorite ? 'Ta bort favorit' : 'Lägg till favorit'}
          </button>

          <button type="button" onClick={handleWishlistClick}>
            {isInWishlist ? 'Ta bort från önskelista' : 'Lägg till i önskelista'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CountryCard