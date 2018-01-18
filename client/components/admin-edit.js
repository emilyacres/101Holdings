import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, updateProperty, updateImg } from '../store'


class AdminEdit extends React.Component {
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
      id: props.match.params.id,
    };
    this.handleName = this.handleName.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleAcquired = this.handleAcquired.bind(this);
    this.handleFeet = this.handleFeet.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dispatchSubmit = props.handleSubmit.bind(this);
    this.updateImg = this.updateImg.bind(this);
    this.dispatchImg = props.updateImg.bind(this);
    //this.properties = props.properties;
  }

  componentWillReceiveProps (nextProps) {
    console.log("recieved props")
    const property = nextProps.properties.filter( el => el.id == this.state.id)[0]
    this.setState({
      name: property.name,
      city: property.city,
      state: property.state,
      acquired: property.acquired,
      feet: property.feet,
      zip: property.zip,
      img: property.img,
      thumb: property.thumb,
    })
  }

  componentDidMount () {
    if (this.props.properties.length) {
      const property = this.props.properties.filter( el => el.id == this.state.id)[0]
      this.setState({
        name: property.name,
        city: property.city,
        state: property.state,
        acquired: property.acquired,
        feet: property.feet,
        zip: property.zip,
        img: property.img,
        thumb: property.thumb,
      })
    }
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

    this.dispatchSubmit(this.state);
  }
  updateImg (event) {
    event.preventDefault();
    console.log(typeof event.target)
    console.log(event.target.files[0])
    // this.setState({
    //   img: event.target.files[0],
    // })
    let data = {};
    data.img = event.target.files[0]
    this.dispatchImg(event.target.files[0])
  }
  render () {

    return (
      <div>
        <div id="admin-edit-img" style={{backgroundImage: `url(/img/${this.state.img})`}} />
        <h1 id="edit-property">Edit Property</h1>
        <div id="edit-container">
          <form onSubmit={this.handleSubmit}  encType="multipart/form-data">
            <div>
              <label className="admin-edit-lbl">Name/Street Address</label>
              <input onChange={this.handleName} type="name" className="admin-edit-input" id="name" placeholder={this.state.name ? this.state.name : "123 New Street"} />
            </div>
            <div>
              <label className="admin-edit-lbl">City</label>
              <input onChange={this.handleCity} type="city" className="admin-edit-input" id="city" placeholder={this.state.city ? this.state.city : "City"} />
            </div>
            <div>
              <label className="admin-edit-lbl">State</label>
              <input onChange={this.handleState} type="city" className="admin-edit-input" id="city" placeholder={this.state.state ? this.state.state : "State"} />
            </div>
            <div>
              <label className="admin-edit-lbl">Year Acquired</label>
              <input onChange={this.handleAcquired} type="aqcuired" className="admin-edit-input" id="aqcuired" placeholder={this.state.acquired ? this.state.acquired : "2000"} />
            </div>
            <div>
              <label className="admin-edit-lbl">Square Feet</label>
              <input onChange={this.handleFeet} type="feet" className="admin-edit-input" id="feet" placeholder={this.state.feet ? this.state.feet : "0"} />
            </div>
            <div>
              <label className="admin-edit-lbl">Zip Code</label>
              <input onChange={this.handleZip} type="zip" className="admin-edit-input" id="zip" placeholder={this.state.zip ? this.state.zip : "10003"} />
            </div>
            <div>
                <button id="admin-edit-btn" type="submit" className="btn">Update</button>
            </div>
          </form>
          <form>
            <label className="admin-edit-lbl">Update Photo</label>
            <input onChange={this.updateImg} accept="application/x-zip-compressed,image/*" name="img" type="file" />
            <button id="admin-edit-btn" type="submit" className="btn">Update</button>
          </form>
          <form>
            <label className="admin-edit-lbl">Update Thumbnail</label>
            <input name="bar" type="file" />
            <button id="admin-edit-btn" type="submit" className="btn">Update</button>
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
      dispatch(updateProperty(property))
    },
    updateImg (file) {
      dispatch(updateImg(file))
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
  handleSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
