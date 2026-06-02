import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">CountryInfo</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/compare">Compare</Link>
        <Link to="/quiz">Quiz</Link>
      </nav>
    </header>
  )
}

export default Header
