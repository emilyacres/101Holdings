import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'


const AdminEdit = (props) => {
  const { handleClick, isLoggedIn, properties, handleNameChange, property } = props
  //const property = properties.filter( el => el.id == props.match.params.id)[0]
  //console.log(property);
  return (
    <div>
      {property ? <h1>{property.name} Admin Page</h1> : null}
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name/Street Address</label>
          <div className="col-sm-10">
            <input onChange={handleNameChange} type="name" className="form-control" id="name" placeholder={property ? property.name : "123 New Street"} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">City & State</label>
          <div className="col-sm-10">
            <input type="city" className="form-control" id="city" placeholder={property ? property.city : "City, State"} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Acquire Date</label>
          <div className="col-sm-10">
            <input type="aqcuired" className="form-control" id="aqcuired" placeholder={property ? property.acquired : "01.2000"} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Square Feet</label>
          <div className="col-sm-10">
            <input type="feet" className="form-control" id="feet" placeholder={property ? property.feet : "0"} />
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

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log(state)
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
    handleNameChange (e) {
      //console.log(e.target.value)
      //this.name = e.target.value;
      console.log(name)
    }
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
  isLoggedIn: PropTypes.bool.isRequired
}
