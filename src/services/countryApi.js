const BASE_URL = 'https://api.restcountries.com/countries/v5'
const API_KEY = import.meta.env.VITE_REST_COUNTRIES_KEY
const PAGE_LIMIT = 100 // gratisplanen ger max 100 länder per anrop

function headers() {
  if (!API_KEY) throw new Error('API-nyckel för REST Countries saknas')
  return { Authorization: `Bearer ${API_KEY}` }
}

// Gör om ett land från v5-formatet till samma form som resten av appen använder
function mapCountry(country) {
  const languages = {}
  for (const lang of country.languages || []) {
    languages[lang.iso639_3 || lang.name] = lang.name
  }

  const currencies = {}
  for (const currency of country.currencies || []) {
    currencies[currency.code] = { name: currency.name, symbol: currency.symbol }
  }

  return {
    name: { common: country.names?.common, official: country.names?.official },
    flags: { png: country.flag?.url_png, svg: country.flag?.url_svg },
    capital: (country.capitals || []).map((c) => c.name),
    region: country.region,
    population: country.population,
    languages,
    currencies,
    timezones: country.timezones || [],
    borders: country.borders || [],
    cca3: country.codes?.alpha_3,
  }
}

export async function getAllCountries() {
  const countries = []
  let offset = 0
  let more = true

  // Hämta en sida i taget tills det inte finns fler
  while (more) {
    const res = await fetch(`${BASE_URL}?limit=${PAGE_LIMIT}&offset=${offset}`, {
      headers: headers(),
    })
    if (!res.ok) throw new Error('Kunde inte hämta länder')

    const json = await res.json()
    countries.push(...(json.data?.objects || []))

    more = json.data?.meta?.more
    offset += PAGE_LIMIT
  }

  return countries.map(mapCountry)
}

export async function getCountryByName(name) {
  const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(name)}`, {
    headers: headers(),
  })
  if (!res.ok) throw new Error('Landet hittades inte')

  const json = await res.json()
  const objects = json.data?.objects || []
  if (objects.length === 0) throw new Error('Landet hittades inte')

  const countries = objects.map(mapCountry)

  // Sökningen kan ge flera träffar, ta den som matchar namnet exakt
  const exact = countries.filter(
    (c) => c.name.common?.toLowerCase() === name.toLowerCase()
  )
  return exact.length > 0 ? exact : countries
}
