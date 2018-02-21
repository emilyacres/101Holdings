import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import { Portfolio } from './'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Home extends React.Component {

  constructor(props) {
    super(props);

    this.scrollDown = this.scrollDown.bind(this);

  }

  scrollDown (event) {
    event.preventDefault();
    var properties = document.getElementById("properties-container");
    properties.scrollIntoView({behavior: "smooth", block: "start"})
  }

  render () {
    return (
      <div>
        <div id="landing">
          <video autoPlay muted loop poster="http://one-oh-one.s3.us-east-2.amazonaws.com/101holdings-415greenwich-full.jpg" id="video-bg">
            <source src="img/bg.mp4" type="video/mp4" />
          </video>
          <img src="img/logo-white.png" id="landing-logo" />
          <img src="img/arrow.gif" id="down-arrow" onClick={this.scrollDown} />
        </div>
        <Portfolio />
      </div>
    )
  }
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
export default withRouter(connect(mapState, mapDispatch)(Home))

/**
 * PROP TYPES
 */
Home.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
