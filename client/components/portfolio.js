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
class Portfolio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredProperties: props.properties,
      properties: props.properties,
      city: "",
      state: "",
      zip: ""
    }

    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.scrollUp = this.scrollUp.bind(this);

  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      filteredProperties: nextProps.properties,
      properties: nextProps.properties
    })
  }

  handleCity (event) {
    var newProperties = this.state.properties.filter( property => {
        return property.city.toUpperCase().startsWith(event.target.value.toUpperCase())
      })
    this.setState({
      filteredProperties: newProperties
    })
  }

  handleState (event) {
    var newProperties = this.state.properties.filter( property => {
        return property.state.toUpperCase().startsWith(event.target.value.toUpperCase())
      })
    this.setState({
      filteredProperties: newProperties
    })
  }

  handleZip (event) {
    var newProperties = this.state.properties.filter( property => {
        return property.zip.toUpperCase().startsWith(event.target.value.toUpperCase())
      })
    this.setState({
      filteredProperties: newProperties
    })
  }

  scrollUp (event) {
    event.preventDefault();
    var top = document.getElementById("landing")
    top.scrollIntoView({behavior: "smooth", block: "start"})
  }

  render () {
    return (
      <div>
        <div id="properties-container">
          <div id="nav">
            <h3 id="nav-filter">Filter</h3>
            <img onClick={this.scrollUp} id="nav-logo" src="img/logo-black.png" />
            <Link id="nav-contact-link" to="/about"><h3 id="nav-contact">About</h3></Link>
          </div>
          <div id="filters">
            <input onChange={this.handleCity} type="city" className="form-control" id="filter-city" placeholder="City" />
            <input onChange={this.handleState} type="state" className="form-control" id="filter-state" placeholder="State" />
            <input onChange={this.handleZip} type="zip" className="form-control" id="filter-zip" placeholder="Zip Code" />
          </div>
          {this.state.properties && this.state.filteredProperties.map(property => {
            return <div key={property.id} className="property-tile" style={{backgroundImage: 'url(img/' + property.thumb + ')', backgroundPosition:  'center center',
      backgroundSize: 'cover'}}>
                  <img className="hide" src={`img/${property.img}`} />
                  <div className="property-tile-hover">
                    <h4 className="property-tile-name">{property.name}</h4>
                    <h4 className="property-tile-date">{property.acquired}</h4>
                  </div>
                </div>
          })}
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
