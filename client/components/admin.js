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
      filteredProperties: props.properties,
      properties: props.properties,
    }

    this.emailPassword = props.emailPassword.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.sortByRank = this.sortByRank.bind(this);

  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      properties: this.sortByRank(nextProps.properties),
      filteredProperties: this.sortByRank(nextProps.properties)
    })
  }

  handlePassword (event) {
    this.setState({
      password: event.target.value
    })
  }

  sortByRank (properties) {
    return properties.sort(function(a, b) {
        var x = a.rank; var y = b.rank;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  handleSearch (event) {
    //console.log(event.target.value)
    let newProperties = this.state.properties.filter( property => {
        return property.name.toLowerCase().includes(event.target.value.toLowerCase());
    })
    console.log(newProperties)
    this.setState({
      filteredProperties: this.sortByRank(newProperties)
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
      <div id="admin-container">
        <Link to="/"><img src="/img/logo-black.png" id="admin-logo" /></Link>
        <h1 id="admin-header">Preview properties:</h1>
        <input onChange={this.handleSearch} type="search" id="admin-search" placeholder="Search by name" />
        <Link to="/admin/new"><button className="btn" id="new-prop-btn">+ New Property</button></Link>
        <div id="admin-properties">
          {this.state.properties && this.state.filteredProperties.map(property => {
                return <Link key={property.id} to={`/admin/${property.id}`}><div id={property.id} className="property-tile" style={{backgroundImage: 'url(http://one-oh-one.s3.us-east-2.amazonaws.com/' + property.thumb + ')', backgroundPosition:  'center center',
          backgroundSize: 'cover'}}>

                      <div className="property-tile-hover">
                        <h4 className="property-tile-name">{property.name}</h4>
                        <h4 className="property-tile-date">{property.city}, {property.state}</h4>
                        <h4 className="property-tile-date mobile">{property.acquired}</h4>
                        <h4 className="property-tile-date mobile">{property.feet}</h4>
                      </div>
                    </div>
                    </Link>
              })}
        </div>
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
