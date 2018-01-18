import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth, sendPassword } from '../store'
import history from '../history'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, emailPassword, error} = props
  return (
    <div id="login-bg">
      <div id="login">
        <img id="login-logo" src="/img/logo-black.png" />
        <form onSubmit={handleSubmit} name="login">
          <div>
            <input className="login-input" placeholder="Username" name='email' type='text' />
          </div>
          <div>
            <input className="login-input" placeholder="Password" name='password' type='password' />
          </div>

          <div>
            <button id="login-btn" type='submit'>Login</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  )
}


const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (event) {
      event.preventDefault()
      const formName = 'login'
      const email = event.target.email.value
      const password = event.target.password.value
      dispatch(auth(email, password, formName))
    },
    emailPassword (event) {
      dispatch(sendPassword())
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
