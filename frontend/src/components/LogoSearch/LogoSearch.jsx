import React from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import './LogoSearch.css'
import Logo from '../../img/logo.png'

const LogoSearch = () => {
  return (
    <div className="logoSearch">
      <img src={Logo} alt="logo-img" />
      <div className="search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  )
}

export default LogoSearch
