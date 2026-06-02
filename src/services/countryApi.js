const BASE_URL = 'https://restcountries.com/v3.1'
const FIELDS = 'name,flags,capital,region,population'

export async function getAllCountries() {
  const res = await fetch(`${BASE_URL}/all?fields=${FIELDS}`)
  if (!res.ok) throw new Error('Kunde inte hämta länder')
  return res.json()
}
