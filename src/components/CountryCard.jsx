import { Link } from 'react-router-dom'
import './CountryCard.css'

function CountryCard({ country }) {
  const capital = country.capital?.[0] ?? 'N/A'
  const population = country.population?.toLocaleString() ?? 'N/A'

  return (
    <Link to={`/country/${encodeURIComponent(country.name.common)}`} className="card">
      <img src={country.flags?.svg} alt={`Flagga för ${country.name.common}`} />
      <div className="card-body">
        <h3>{country.name.common}</h3>
        <p><strong>Huvudstad:</strong> {capital}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Befolkning:</strong> {population}</p>
      </div>
    </Link>
  )
}

export default CountryCard
