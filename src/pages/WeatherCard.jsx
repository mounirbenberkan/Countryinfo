import { useEffect, useState } from 'react'

function WeatherCard({ country }) {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const capital = country.capital?.[0]
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (!capital) {
      setError('Det finns ingen huvudstad för detta land.')
      return
    }

    if (!apiKey) {
      setError('API-nyckel saknas.')
      return
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data)
      })
      .catch(() => {
        setError('Kunde inte hämta väder.')
      })
  }, [capital, apiKey])

  if (error) {
    return (
      <div className="weather-card">
        <h3>Väder</h3>
        <p>{error}</p>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="weather-card">
        <h3>Väder i {capital}</h3>
        <p>Laddar väder...</p>
      </div>
    )
  }

  return (
    <div className="weather-card">
      <h3>Väder i {capital}</h3>

      <p className="weather-temp">
        {Math.round(weather.main.temp)}°C
      </p>

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
    </div>
  )
}

export default WeatherCard