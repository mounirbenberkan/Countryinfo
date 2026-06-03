import { useEffect, useState, useMemo } from 'react'
import { getAllCountries } from '../services/countryApi'
import CountryCard from '../components/CountryCard'
import '../App.css'
import './Home.css'

const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

function Home() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')
  const [sort, setSort] = useState('az')

  useEffect(() => {
    getAllCountries()
      .then(setCountries)
      .catch(() => setError('Kunde inte hämta länder'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let result = countries

    if (search.trim()) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (region !== 'All') {
      result = result.filter((c) => c.region === region)
    }

    switch (sort) {
      case 'az':
        return [...result].sort((a, b) => a.name.common.localeCompare(b.name.common))
      case 'za':
        return [...result].sort((a, b) => b.name.common.localeCompare(a.name.common))
      case 'pop-desc':
        return [...result].sort((a, b) => b.population - a.population)
      case 'pop-asc':
        return [...result].sort((a, b) => a.population - b.population)
      default:
        return result
    }
  }, [countries, search, region, sort])

  if (loading) return <p className="status">Laddar...</p>
  if (error) return <p className="status">{error}</p>

  return (
    <div className="app">
      <div className="controls">
        <input
          type="text"
          placeholder="Sök efter ett land..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
          <option value="pop-desc">Befolkning: Hög–Låg</option>
          <option value="pop-asc">Befolkning: Låg–Hög</option>
        </select>
      </div>

      <div className="regions">
        {REGIONS.map((r) => (
          <button
            key={r}
            className={region === r ? 'region-btn active' : 'region-btn'}
            onClick={() => setRegion(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <p className="count">{filtered.length} länder hittade</p>

      <div className="grid">
        {filtered.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  )
}

export default Home
