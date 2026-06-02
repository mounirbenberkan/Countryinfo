import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CountryDetails from './pages/CountryDetails'
import Quiz from './pages/Quiz'
import Compare from './pages/Compare'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<CountryDetails />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </>
  )
}

export default App