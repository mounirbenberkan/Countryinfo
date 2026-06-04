import { useEffect, useState } from 'react'
import { getAllCountries } from '../services/countryApi'

function Compare() {
  const [countries, setCountries] = useState([])
  const [firstCountryName, setFirstCountryName] = useState('')
  const [secondCountryName, setSecondCountryName] = useState('')

  useEffect(() => {
    getAllCountries().then((data) => {
      setCountries(data)
    })
  }, [])

  const firstCountry = countries.find((country) => {
    return country.name.common === firstCountryName
  })

  const secondCountry = countries.find((country) => {
    return country.name.common === secondCountryName
  })

  function getCurrencies(country) {
    if (!country.currencies) {
      return 'N/A'
    }

    return Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(', ')
  }

  function getLanguages(country) {
    if (!country.languages) {
      return 'N/A'
    }

    return Object.values(country.languages).join(', ')
  }

  function CountryInfo({ country }) {
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
          alt={`Flagga för ${country.name.common}`}
          className="compare-flag"
        />

        <h3>{country.name.common}</h3>

        <p>
          <strong>Huvudstad:</strong> {country.capital?.[0] || 'N/A'}
        </p>

        <p>
          <strong>Befolkning:</strong> {country.population.toLocaleString()}
        </p>

        <p>
          <strong>Region:</strong> {country.region || 'N/A'}
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

  return (
    <section className="compare-page">
      <h2>Compare Countries</h2>
      <p>Välj två länder och jämför dem sida vid sida.</p>

      <div className="compare-search">
        <div>
          <label>Första landet</label>
          <select
            value={firstCountryName}
            onChange={(e) => setFirstCountryName(e.target.value)}
          >
            <option value="">Välj land</option>

            {countries.map((country) => (
              <option key={country.name.common} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Andra landet</label>
          <select
            value={secondCountryName}
            onChange={(e) => setSecondCountryName(e.target.value)}
          >
            <option value="">Välj land</option>

            {countries.map((country) => (
              <option key={country.name.common} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="compare-grid">
        <CountryInfo country={firstCountry} />
        <CountryInfo country={secondCountry} />
      </div>
    </section>
  )
}

export default Compare