function CountryCard({ country }) {
  const capital = country.capital?.[0] ?? 'N/A'
  const population = country.population?.toLocaleString() ?? 'N/A'

  return (
    <div>
      <img src={country.flags?.svg} alt={`Flagga för ${country.name.common}`} width="120" />
      <h3>{country.name.common}</h3>
      <p>Huvudstad: {capital}</p>
      <p>Region: {country.region}</p>
      <p>Befolkning: {population}</p>
    </div>
  )
}

export default CountryCard
