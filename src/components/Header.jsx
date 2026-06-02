import './Header.css'

function Header() {
  return (
    <header className="header">
      <span className="logo">CountryInfo</span>
      <nav>
        <a href="/">Home</a>
        <a href="/favorites">Favorites</a>
        <a href="/wishlist">Wishlist</a>
        <a href="/compare">Compare</a>
        <a href="/quiz">Quiz</a>
      </nav>
    </header>
  )
}

export default Header
