import React from 'react'
import "./Navi.css"
const NavBar = () => {
  return (
    <div>
      <header>
  <div className="company-logo">logo</div>
  <nav className="navbar">
    <ul className="nav-items">
      <li className="nav-item">
        <a  className="lettre_nav">
          HOME
        </a>
      </li>
      <li className="nav-item">
        <a  className="lettre_nav">
          Application
        </a>
      </li>
         <li className="nav-item">
        <a  className="lettre_nav">
          CONTACT
        </a>
      </li>
    </ul>
  </nav>
  {/* <div className="menu-toggle">
    <i className="bx bx-menu" />
    <i className="bx bx-x" />
  </div> */}
</header>

    </div>
  )
}

export default NavBar