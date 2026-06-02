import { useEffect, useState } from 'react'
import { getAllCountries } from './services/countryApi'
import CountryCard from './components/CountryCard'
import Header from './components/Header'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        console.log('Länder hämtade:', data.length)
        setCountries(data)
      })
      .catch((err) => {
        console.error(err)
        setError('Kunde inte hämta länder')
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p>Laddar...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <Header />
    <div className="app">
      <h1>CountryInfo</h1>
      <input
        type="text"
        placeholder="Sök efter ett land..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p className="count">{filtered.length} länder hittade</p>
      <div className="grid">
        {filtered.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
    </>
  )
}

export default App
