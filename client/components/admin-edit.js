import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, updateProperty } from '../store'


class AdminEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      acquired: "",
      feet: "",
      id: props.match.params.id,
      images: [],
    };
    this.handleName = this.handleName.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleAcquired = this.handleAcquired.bind(this);
    this.handleFeet = this.handleFeet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dispatchSubmit = props.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    const property = nextProps.properties.filter( el => el.id == this.state.id)[0]
    this.setState({
      name: property.name,
      city: property.city,
      acquired: property.acquired,
      feet: property.feet,
      images: property.images,
    })
  }
  handleDelete () {
    console.log("SUCCESS")
  }
  handleName (event) {
    this.setState({
      name: event.target.value,
    })
  }
  handleCity (event) {
    this.setState({
      city: event.target.value,
    })
  }
  handleAcquired (event) {
    this.setState({
      acquired: event.target.value,
    })
  }
  handleFeet (event) {
    this.setState({
      feet: event.target.value,
    })
  }
  handleSubmit (event) {
    event.preventDefault();
    this.dispatchSubmit(this.state);
  }
  render () {
    return (
      <div>
        {this.state.name ? <h1>{this.propertyName} Admin Page</h1> : <h1>Admin Page</h1>}
        {this.state.images.map( img => {
          return (
            <div key={img.id}>
              <h3>Delete photo</h3>
              <img src={`/img/${img.fileName}`} />
              <button onClick={() => {
                if(confirm('Are you sure you want to delete this photo?')){
                  this.handleDelete();
                }}} type="submit" className="btn btn-danger">x</button>
            </div>)
        })}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Name/Street Address</label>
            <div className="col-sm-10">
              <input onChange={this.handleName} type="name" className="form-control" id="name" placeholder={this.state.name ? this.state.name : "123 New Street"} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">City & State</label>
            <div className="col-sm-10">
              <input onChange={this.handleCity} type="city" className="form-control" id="city" placeholder={this.state.city ? this.state.city : "City, State"} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Acquire Date</label>
            <div className="col-sm-10">
              <input onChange={this.handleAcquired} type="aqcuired" className="form-control" id="aqcuired" placeholder={this.state.acquired ? this.state.acquired : "01.2000"} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Square Feet</label>
            <div className="col-sm-10">
              <input onChange={this.handleFeet} type="feet" className="form-control" id="feet" placeholder={this.state.feet ? this.state.feet : "0"} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
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
    properties: state.property,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    },
    handleSubmit (property) {
      dispatch(updateProperty(property))
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(AdminEdit))

/**
 * PROP TYPES
 */
AdminEdit.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
