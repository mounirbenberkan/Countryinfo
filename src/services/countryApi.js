const BASE_URL = 'https://restcountries.com/v3.1'
// Max 10 fält tillåts av REST Countries API
const FIELDS = 'name,flags,capital,region,population,languages,currencies,timezones,borders,cca3'

export async function getAllCountries() {
  const res = await fetch(`${BASE_URL}/all?fields=${FIELDS}`)
  if (!res.ok) throw new Error('Kunde inte hämta länder')
  return res.json()
}

export async function getCountryByName(name) {
  const res = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}?fullText=true&fields=${FIELDS}`)
  if (!res.ok) throw new Error('Landet hittades inte')
  return res.json()
}
