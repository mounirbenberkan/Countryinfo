import { useEffect, useState } from 'react'

function WeatherCard({ country }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const capital = country?.capital?.[0]
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (!capital) {
      return
    }

    if (!apiKey) {
      setError('API-nyckel saknas. Lägg till VITE_WEATHER_API_KEY i .env')
      return
    }

    async function fetchWeather() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
        )

        if (!response.ok) {
          throw new Error('Kunde inte hämta väderdata')
        }

        const data = await response.json()
        setWeather(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [capital, apiKey])

  if (!country) {
    return null
  }

  if (!capital) {
    return (
      <div className="weather-card">
        <h3>Väder</h3>
        <p>Det finns ingen huvudstad för detta land.</p>
      </div>
    )
  }

  return (
    <div className="weather-card">
      <h3>Väder i {capital}</h3>

      {loading && <p>Laddar väder...</p>}

      {error && <p>{error}</p>}

      {weather && !loading && !error && (
        <>
          <p className="weather-temp">{Math.round(weather.main.temp)}°C</p>

          <p>{weather.weather[0].description}</p>

          <p>
            <strong>Känns som:</strong> {Math.round(weather.main.feels_like)}°C
          </p>

          <p>
            <strong>Luftfuktighet:</strong> {weather.main.humidity}%
          </p>

          <p>
            <strong>Vind:</strong> {weather.wind.speed} m/s
          </p>
        </>
      )}
    </div>
  )
}

export default WeatherCard