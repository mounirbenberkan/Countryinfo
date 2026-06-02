import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCountryByName } from '../services/countryApi'
import './CountryDetails.css'

// Räknar ut tidsskillnad mot svensk tid (dynamisk, tar hänsyn till sommartid)
function getTimeDiffFromSweden(timezone) {
  const match = timezone.match(/UTC([+-]\d{1,2}):?(\d{0,2})/)
  if (!match) return null

  const hours = parseInt(match[1])
  const minutes = parseInt(match[2] || '0')
  const countryOffset = hours + (hours < 0 ? -minutes / 60 : minutes / 60)

  // Svensk offset just nu (tar hänsyn till sommartid)
  const swedenOffset = -new Date().getTimezoneOffset() / 60

  const diff = countryOffset - swedenOffset
  if (diff === 0) return 'samma tid som Sverige'
  return diff > 0 ? `+${diff}h från Sverige` : `${diff}h från Sverige`
}

function CountryDetails() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCountryByName(name)
      .then((data) => setCountry(data[0]))
      .catch(() => setError('Landet hittades inte'))
      .finally(() => setLoading(false))
  }, [name])

  if (loading) return <p className="status">Laddar...</p>
  if (error) return <p className="status">{error}</p>

  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A'
  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol})`).join(', ')
    : 'N/A'

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Tillbaka</button>

      <div className="details-content">
        <img src={country.flags?.svg} alt={`Flagga för ${country.name.common}`} />

        <div className="details-info">
          <h1>{country.name.common}</h1>
          <p className="official">{country.name.official}</p>

          <div className="details-grid">
            <p><strong>Huvudstad:</strong> {country.capital?.[0] ?? 'N/A'}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Befolkning:</strong> {country.population?.toLocaleString()}</p>
            <p><strong>Språk:</strong> {languages}</p>
            <p><strong>Valuta:</strong> {currencies}</p>
            <p>
              <strong>Tidszon:</strong> {country.timezones?.[0] ?? 'N/A'}
              {country.timezones?.[0] && (
                <span style={{ color: '#888', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                  ({getTimeDiffFromSweden(country.timezones[0])})
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryDetails
