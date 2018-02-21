import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, submitContact } from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: ""
    }

    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dispatchSubmit = props.handleSubmit.bind(this);

  }

  handleName (event) {
    this.setState({
      name: event.target.value
    })
  }

  handleEmail (event) {
    this.setState({
      email: event.target.value
    })
  }

  handleSubject (event) {
    this.setState({
      subject: event.target.value
    })
  }

   handleMessage (event) {
    this.setState({
      message: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault();
    if(!this.state.email || !this.state.email.includes("@") || !this.state.email.includes(".")) {
      document.getElementById("valid-email").classList.remove("hide");
    } else {
      document.getElementById("contact-form").style.display = "none";
      document.getElementById("thank-you").style.display = "block";
      this.dispatchSubmit(this.state);
      document.getElementById("valid-email").classList.add("hide");
    }
  }

  render () {
    return (
      <div>
        <div id="about-container">
          <div id="about-header">
            <h3 id="about-title" className="desktop">About Us</h3>
            <img src="img/logo-black.png" className="mobile" id="about-title" />
            <Link to="/"><img src="img/x.png" id="close-about" /></Link>
          </div>

          <div className="about-sub">
            <p className="bold">General Inquires</p>
            <p>info@101-holdings.com</p>
          </div>
          <div className="about-sub">
            <p className="bold">Acquisition Opportunities</p>
            <p>deals@101-holdings.com</p>
          </div>
          <div className="about-sub">
            <p className="bold">101 Holdings</p>
            <p>295 Lafayette Street</p>
            <p>7th Floor</p>
            <p>New York, NY 10012</p>
          </div>
        </div>
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
    },
    handleSubmit (contact) {
      dispatch(submitContact(contact))
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(About))

/**
 * PROP TYPES
 */
About.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
