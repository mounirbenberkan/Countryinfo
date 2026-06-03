import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <h2 className="logo">CountryInfo</h2>

      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Favorites
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Wishlist
        </NavLink>

        <NavLink
          to="/compare"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Compare
        </NavLink>

        <NavLink
          to="/quiz"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Quiz
        </NavLink>
      </nav>
    </header>
  )
}

export default Header