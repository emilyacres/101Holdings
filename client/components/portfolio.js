import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Portfolio = (props) => {
  const { handleClick, isLoggedIn, properties } = props
  return (
    <div>
      <div id="properties-container">
        <div id="nav">
          <Link to="/"><img id="nav-logo" src="img/logo-black.png" /></Link>
          <Link id="nav-contact-link" to="/"><h3 id="nav-contact">Contact</h3></Link>
        </div>
        {properties.map(property => {
          return <div key={property.id} className="property-tile" style={{backgroundImage: 'url(img/' + property.thumb + ')', backgroundPosition:  'center center',
    backgroundSize: 'cover'}}><div className="property-tile-hover"><h4 className="property-tile-name">{property.name}</h4><h4 className="property-tile-date">{property.acquired}</h4></div></div>
        })}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    properties: state.property
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Portfolio))

/**
 * PROP TYPES
 */
Portfolio.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
