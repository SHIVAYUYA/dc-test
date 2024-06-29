import './index.css'

export const Header = function(){
    return <header>
    <div className="header__inner">
      <h1>掲示板</h1>
      <nav className="header__nav">
        <ul>
          <li><a href="#">home</a></li>
          <li><a href="#">mypage</a></li>
        </ul>
      </nav>
    </div>
  </header>
}