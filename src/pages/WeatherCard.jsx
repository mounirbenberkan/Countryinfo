import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
    <motion.div
      className="weather-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h3>Väder i {capital}</h3>

      <div className="weather-main">
        <span className="weather-temp">{Math.round(weather.main.temp)}°C</span>
        <span className="weather-desc">{weather.weather[0].description}</span>
      </div>

      <div className="weather-stats">
        <div>
          <span>Känns som</span>
          <strong>{Math.round(weather.main.feels_like)}°C</strong>
        </div>
        <div>
          <span>Luftfuktighet</span>
          <strong>{weather.main.humidity}%</strong>
        </div>
        <div>
          <span>Vind</span>
          <strong>{weather.wind.speed} m/s</strong>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherCard