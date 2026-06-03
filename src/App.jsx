import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CountryDetails from './pages/CountryDetails'
import Favorites from './pages/Favorites'
import Wishlist from './pages/Wishlist'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<CountryDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  )
}

export default App
