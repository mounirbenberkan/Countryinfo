const FAVORITES_KEY = 'favorites'
const WISHLIST_KEY = 'wishlist'

function getCountryId(country) {
  return country.cca3 || country.name?.common
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function getFavorites() {
  return getFromLocalStorage(FAVORITES_KEY)
}

export function addFavorite(country) {
  const favorites = getFavorites()
  const countryId = getCountryId(country)

  const exists = favorites.some((item) => getCountryId(item) === countryId)

  if (!exists) {
    favorites.push(country)
    saveToLocalStorage(FAVORITES_KEY, favorites)
  }
}

export function removeFavorite(country) {
  const favorites = getFavorites()
  const countryId = getCountryId(country)

  const updatedFavorites = favorites.filter(
    (item) => getCountryId(item) !== countryId
  )

  saveToLocalStorage(FAVORITES_KEY, updatedFavorites)
}

export function getWishlist() {
  return getFromLocalStorage(WISHLIST_KEY)
}

export function addToWishlist(country) {
  const wishlist = getWishlist()
  const countryId = getCountryId(country)

  const exists = wishlist.some((item) => getCountryId(item) === countryId)

  if (!exists) {
    wishlist.push(country)
    saveToLocalStorage(WISHLIST_KEY, wishlist)
  }
}

export function removeFromWishlist(country) {
  const wishlist = getWishlist()
  const countryId = getCountryId(country)

  const updatedWishlist = wishlist.filter(
    (item) => getCountryId(item) !== countryId
  )

  saveToLocalStorage(WISHLIST_KEY, updatedWishlist)
}

export function isFavoriteCountry(country) {
  return getFavorites().some(
    (item) => getCountryId(item) === getCountryId(country)
  )
}

export function isWishlistCountry(country) {
  return getWishlist().some(
    (item) => getCountryId(item) === getCountryId(country)
  )
}