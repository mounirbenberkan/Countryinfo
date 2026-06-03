import { useEffect, useState } from 'react'
import CountryCard from '../components/CountryCard'
import { getWishlist } from '../utils/localStorage'

function Wishlist() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    setWishlist(getWishlist())
  }, [])

  function updateWishlist() {
    setWishlist(getWishlist())
  }

  return (
    <div className="app">
      <h1>Önskelista</h1>

      {wishlist.length === 0 ? (
        <p className="empty-message">
          Du har inte lagt till några länder i önskelistan än.
        </p>
      ) : (
        <>
          <p className="count">{wishlist.length} länder i önskelistan</p>

          <div className="grid">
            {wishlist.map((country) => (
              <CountryCard
                key={country.cca3 || country.name.common}
                country={country}
                onWishlistChange={updateWishlist}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Wishlist