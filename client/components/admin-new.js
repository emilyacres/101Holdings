import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, newProperty, updateImg } from '../store'


class AdminNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      state: "",
      acquired: "",
      feet: "",
      zip: "",
      img: "",
      thumb: "",
    };
    this.handleName = this.handleName.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleAcquired = this.handleAcquired.bind(this);
    this.handleFeet = this.handleFeet.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dispatchSubmit = props.handleSubmit.bind(this);
    this.newImg = this.newImg.bind(this);
    this.dispatchImg = props.updateImg.bind(this);
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
  handleState (event) {
    this.setState({
      state: event.target.value,
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
  handleZip (event) {
    this.setState({
      zip: event.target.value,
    })
  }
  handleSubmit (event) {
    event.preventDefault();
    this.dispatchSubmit(this.state);
  }
  newImg (event) {
    event.preventDefault();
  }
  render () {

    return (
      <div>
        <div id="admin-edit-img" style={{backgroundImage: `url(/img/${this.state.img})`}} />
        <h1 id="edit-property">New Property</h1>
        <div id="edit-container">
          <form onSubmit={this.handleSubmit}  encType="multipart/form-data">
            <div>
              <label className="admin-edit-lbl">Name/Street Address</label>
              <input onChange={this.handleName} type="name" className="admin-edit-input" id="name" placeholder="123 New Street" />
            </div>
            <div>
              <label className="admin-edit-lbl">City</label>
              <input onChange={this.handleCity} type="city" className="admin-edit-input" id="city" placeholder="City" />
            </div>
            <div>
              <label className="admin-edit-lbl">State</label>
              <input onChange={this.handleState} type="city" className="admin-edit-input" id="city" placeholder="State" />
            </div>
            <div>
              <label className="admin-edit-lbl">Year Acquired</label>
              <input onChange={this.handleAcquired} type="aqcuired" className="admin-edit-input" id="aqcuired" placeholder="2000" />
            </div>
            <div>
              <label className="admin-edit-lbl">Square Feet</label>
              <input onChange={this.handleFeet} type="feet" className="admin-edit-input" id="feet" placeholder="0" />
            </div>
            <div>
              <label className="admin-edit-lbl">Zip Code</label>
              <input onChange={this.handleZip} type="zip" className="admin-edit-input" id="zip" placeholder="10003" />
            </div>
            <div>
                <button id="admin-edit-btn" type="submit" className="btn">Submit</button>
            </div>
          </form>
          <form>
            <label className="admin-edit-lbl">Submit Photo</label>
            <input onChange={this.newImg} accept="application/x-zip-compressed,image/*" name="img" type="file" />
            <button id="admin-edit-btn" type="submit" className="btn">Submit</button>
          </form>
          <form>
            <label className="admin-edit-lbl">Submit Thumbnail</label>
            <input name="bar" type="file" />
            <button id="admin-edit-btn" type="submit" className="btn">Submit</button>
          </form>
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
    properties: state.property,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    },
    handleSubmit (property) {
      dispatch(newProperty(property))
    },
    updateImg (file) {
      dispatch(updateImg(file))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(AdminNew))

/**
 * PROP TYPES
 */
AdminNew.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
