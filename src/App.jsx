import { useEffect, useState } from 'react'

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population')
      .then((res) => res.json())
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
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
