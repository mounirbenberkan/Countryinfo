import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Stäng menyn när man navigerar
  const close = () => setOpen(false)

  return (
    <header className="header">
      <h2 className="logo">CountryInfo</h2>

      <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        <span className={open ? 'bar open' : 'bar'} />
        <span className={open ? 'bar open' : 'bar'} />
        <span className={open ? 'bar open' : 'bar'} />
      </button>

      <nav className={open ? 'nav nav-open' : 'nav'}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={close} end>Home</NavLink>
        <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={close}>Favorites</NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={close}>Wishlist</NavLink>
        <NavLink to="/compare" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={close}>Compare</NavLink>
        <NavLink to="/quiz" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={close}>Quiz</NavLink>
      </nav>
    </header>
  )
}

export default Header
