import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, sendPassword } from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      properties: props.properties
    };

    this.emailPassword = props.emailPassword.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);

  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      properties: nextProps.properties
    })
  }
  handlePassword(event) {
    this.setState({
      password: event.target.value
    })
  }
  checkPassword(event) {
    this.setState({
      password2: event.target.value
    })
  }
  updatePassword (event) {
    event.preventDefault();
    if ( this.state.password !== this.state.password2 ) {
      document.getElementById("password-match").classList.remove("hide");
    } else {
      this.emailPassword({
        password: this.state.password
      })
      document.getElementById("password-match").classList.add("hide");
      document.getElementById("password-success").classList.remove("hide");
    }
  }

  render () {
    return (
      <div>
        <h1>Admin Page</h1>
        {this.state.properties.map(property => {
          return <Link key={property.id} to={`/admin/${property.id}`}><div>{property.name}</div></Link>
        })}
        <Link to="/admin/new"><button className="btn" id="admin-edit-btn">New Property</button></Link>
        <form className="hide" onSubmit={this.updatePassword}>
          <div>
            <label className="admin-edit-lbl">New Password</label>
            <input onChange={this.handlePassword} type="password" className="admin-edit-input" id="password1" placeholder="password" />
          </div>
           <div>
            <label className="admin-edit-lbl">Retype Password</label>
            <input onChange={this.checkPassword} type="password" className="admin-edit-input" id="password2" placeholder="password" />
          </div>
          <p id="password-match" className="hide">Passwords do not match</p>
          <p id="password-success" className="hide">Password updated!</p>
          <button type="submit" className="btn">Update Password</button>
        </form>
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
    emailPassword (password) {
      dispatch(sendPassword(password))
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Admin))

/**
 * PROP TYPES
 */
Admin.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
