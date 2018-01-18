import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, updateProperty, deleteProperty } from '../store'
import { history } from "../history"


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
    this.dispatchDelete = props.handleDelete.bind(this);

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
  handleDelete (event) {
    this.dispatchDelete(this.state.id)
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
                <button id="admin-edit-btn" type="submit" className="btn">Update information</button>
            </div>
          </form>
          <form className="upload-photo" action={`/api/upload/${this.state.id}`} method="post" encType="multipart/form-data">
            <label className="admin-edit-lbl">Update Photo</label>
            <p className="img-sub">This should be a landscape photo (approx. 1920 x 1080)</p>
            <input accept="application/x-zip-compressed,image/*" name="img" type="file" />
            <input id="admin-edit-btn" className="btn" type="submit" value="Upload new image" />
          </form>
          <form className="upload-photo" action={`/api/upload/thumb/${this.state.id}`} method="post" encType="multipart/form-data">
            <label className="admin-edit-lbl">Update Thumbnail</label>
            <p className="img-sub">This should be a square photo (approx. 600 x 600)</p>
            <input accept="application/x-zip-compressed,image/*" name="img" type="file" />
            <input id="admin-edit-btn" className="btn" type="submit" value="Upload new thumbnail" />
          </form>
          <button id="delete-btn" className="btn btn-danger" onClick={() => {if(confirm('Are you sure you want to delete this property?')){ this.handleDelete() }}}> Delete Property</button>
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
    handleDelete (property) {
      dispatch(deleteProperty(property))
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
