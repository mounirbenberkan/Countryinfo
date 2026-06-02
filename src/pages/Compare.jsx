import { useEffect, useState } from 'react'
import { getAllCountries } from '../services/countryApi'

function getCurrencies(country) {
  if (!country.currencies) {
    return 'Saknas'
  }

  return Object.values(country.currencies)
    .map((currency) => currency.name)
    .join(', ')
}

function getLanguages(country) {
  if (!country.languages) {
    return 'Saknas'
  }

  return Object.values(country.languages).join(', ')
}

function CountryCompareCard({ country }) {
  if (!country) {
    return (
      <div className="compare-card empty">
        <p>Välj ett land</p>
      </div>
    )
  }

  return (
    <div className="compare-card">
      <img
        src={country.flags.png}
        alt={country.flags.alt || `Flagga för ${country.name.common}`}
        className="compare-flag"
      />

      <h3>{country.name.common}</h3>

      <p>
        <strong>Huvudstad:</strong> {country.capital?.[0] || 'Saknas'}
      </p>

      <p>
        <strong>Befolkning:</strong> {country.population.toLocaleString()}
      </p>

      <p>
        <strong>Region:</strong> {country.region || 'Saknas'}
      </p>

      <p>
        <strong>Valuta:</strong> {getCurrencies(country)}
      </p>

      <p>
        <strong>Språk:</strong> {getLanguages(country)}
      </p>
    </div>
  )
}

function Compare() {
  const [countries, setCountries] = useState([])
  const [firstSearch, setFirstSearch] = useState('')
  const [secondSearch, setSecondSearch] = useState('')
  const [firstCountry, setFirstCountry] = useState(null)
  const [secondCountry, setSecondCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setCountries(data)
      })
      .catch(() => {
        setError('Kunde inte ladda länderna')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  function findCountry(searchValue) {
    return countries.find(
      (country) =>
        country.name.common.toLowerCase() === searchValue.toLowerCase()
    )
  }

  function handleFirstSearch(value) {
    setFirstSearch(value)
    setFirstCountry(findCountry(value) || null)
  }

  function handleSecondSearch(value) {
    setSecondSearch(value)
    setSecondCountry(findCountry(value) || null)
  }

  if (loading) {
    return <p>Laddar jämförelse...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className="compare-page">
      <h2>Compare Countries</h2>
      <p>Sök fram två länder och jämför dem sida vid sida.</p>

      <div className="compare-search">
        <div>
          <label htmlFor="first-country">Första landet</label>
          <input
            id="first-country"
            type="text"
            list="countries"
            placeholder="Exempel: Sweden"
            value={firstSearch}
            onChange={(e) => handleFirstSearch(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="second-country">Andra landet</label>
          <input
            id="second-country"
            type="text"
            list="countries"
            placeholder="Exempel: Norway"
            value={secondSearch}
            onChange={(e) => handleSecondSearch(e.target.value)}
          />
        </div>

        <datalist id="countries">
          {countries.map((country) => (
            <option key={country.name.common} value={country.name.common} />
          ))}
        </datalist>
      </div>

      <div className="compare-grid">
        <CountryCompareCard country={firstCountry} />
        <CountryCompareCard country={secondCountry} />
      </div>
    </section>
  )
}

export default Compare