import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickingLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-bar-mobile-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="sm-mobile-website-logo"
          />
        </Link>
        <ul className="mobile-icons-list">
          <li>
            <Link to="/">
              <AiFillHome className="icon" />
            </Link>
          </li>

          <li>
            <Link to="/jobs">
              <BsFillBriefcaseFill className="icon" />
            </Link>
          </li>

          <li>
            <button
              className="logout-btn"
              type="button"
              onClick={onClickingLogout}
              aria-label="click"
            >
              <FiLogOut className="icon" />
            </button>
          </li>
        </ul>
      </div>

      <div className="nav-bar-large-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="lg-website-logo"
        />
        <ul className="large-links-list">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>

          <li>
            <button
              type="button"
              className="logout-button"
              onClick={onClickingLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
