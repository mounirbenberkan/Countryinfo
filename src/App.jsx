import { useEffect, useState } from 'react'
import { getAllCountries } from './services/countryApi'
import CountryCard from './components/CountryCard'

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) return <p>Laddar...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>CountryInfo</h1>
      <p>{countries.length} länder hittade</p>
      <div>
        {countries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  )
}

export default App
