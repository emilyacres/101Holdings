import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, updateProperty, deleteProperty, upOne, upAll, downOne, downAll, deleteImg, newImg } from '../store'
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
      images: "",
      thumb: "",
      rank: "",
      newImg: "",
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
    this.dispatchUpOne = props.handleUpOne.bind(this);
    this.dispatchUpAll = props.handleUpAll.bind(this);
    this.dispatchDownOne = props.handleDownOne.bind(this);
    this.dispatchDownAll = props.handleDownAll.bind(this);
    this.dispatchDeleteImg = props.handleDeleteImg.bind(this);
    this.dispatchImg = props.handleImg.bind(this)
    this.handleUpOne = this.handleUpOne.bind(this);
    this.handleUpAll = this.handleUpAll.bind(this);
    this.handleDownOne = this.handleDownOne.bind(this);
    this.handleDownAll = this.handleDownAll.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.getSignedRequest = this.getSignedRequest.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleThumb = this.handleThumb.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.handleNewImg = this.handleNewImg.bind(this);

  }

  componentWillReceiveProps (nextProps) {
    const property = nextProps.properties.filter( el => el.id == this.state.id)[0]
    this.setState({
      name: property.name,
      city: property.city,
      state: property.state,
      acquired: property.acquired,
      feet: property.feet,
      zip: property.zip,
      images: property.images,
      rank: property.rank,
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
        images: property.images,
        rank: property.rank,
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

  handleNewImg (event) {
    event.preventDefault();
    let imgObj = {
      filename: this.state.newImg,
      propertyId: this.state.id
    }
    this.dispatchImg(imgObj);
  }

  handleDelete (event) {
    this.dispatchDelete(this.state.id)
  }

  handleThumb (event) {
    const files = document.getElementById('file-input-thumb').files;
    const file = files[0];
    if(file == null){
      return alert('No file selected.');
    }
    this.setState({
      thumb: file.name
    })
    this.getSignedRequest(file);
  }

  handleImg (event) {
    const files = document.getElementById('file-input-img').files;
    const file = files[0];
    if(file == null){
      return alert('No file selected.');
    }
    this.setState({
      newImg: file.name
    })
    this.getSignedRequest(file);
  }

  getSignedRequest (file) {
    console.log(file)
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log("response", xhr.status)
          const response = JSON.parse(xhr.responseText);
          this.uploadFile(file, response.signedRequest, response.url);
        }
        else{
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
}

uploadFile (file, signedRequest, url) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        // document.getElementById('preview').src = url;
        // document.getElementById('avatar-url').value = url;
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}

handleUpOne () {
  this.dispatchUpOne(this.state);
}

handleUpAll () {
  this.dispatchUpAll(this.state);
}

handleDownOne () {
  this.dispatchDownOne(this.state);
}

handleDownAll () {
  this.dispatchDownAll(this.state);
}

deleteImg (id) {
  console.log("id", id);
  this.dispatchDeleteImg(id);
}

  render () {

    return (
      <div>
        <div id="admin-edit-img" style={ this.state.images[0] ? {backgroundImage: `url(http://one-oh-one.s3.us-east-2.amazonaws.com/${this.state.images[0].filename})`} : null} />
        <h1 id="edit-property">Edit Property</h1>
        <div id="edit-container">
          <h3>Edit general:</h3>
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
          <div id="edit-img">
            <h3 >Edit photos:</h3>
            {this.state.images && this.state.images.map(image => {
              return <div key={image.id} className="admin-edit-images" style={{backgroundImage: 'url(http://one-oh-one.s3.us-east-2.amazonaws.com/' + image.filename + ')', backgroundPosition:  'center center',
        backgroundSize: 'cover'}}><button onClick={() => {if(confirm('Are you sure you want to delete this image?')){ this.deleteImg(image.id) }}}className="btn-danger btn">x</button></div>})}
            <form onSubmit={this.handleNewImg} className="upload-photo" encType="multipart/form-data">
              <label className="admin-edit-lbl">Add Photo</label>
              <p className="img-sub">This should be a landscape photo (1920 x 1080)</p>
              <input id="file-input-img" onChange={this.handleImg} accept="application/x-zip-compressed,image/*" name="img" type="file" />
              <input id="admin-edit-btn" className="btn" type="submit" value="Upload new image" />
            </form>
            <form onSubmit={this.handleSubmit} className="upload-photo" encType="multipart/form-data">
              <label className="admin-edit-lbl">Update Thumbnail</label>
              <p className="img-sub">This should be a square photo (approx. 600 x 600)</p>
              <input id="file-input-thumb" onChange={this.handleThumb} accept="application/x-zip-compressed,image/*" name="img" type="file" />
              <input id="admin-edit-btn" className="btn" type="submit" value="Upload new thumbnail" />
            </form>
          </div>
          <div id="admin-edit-position">
            <h4>Edit positioning:</h4>
            <button onClick={this.handleUpOne} id="up-one-btn" className="btn">Move me up one</button>
            <button onClick={this.handleUpAll}id="up-all-btn" className="btn">Move me to top</button>
            <button onClick={this.handleDownOne} id="down-one-btn" className="btn">Move me down one</button>
            <button onClick={this.handleDownAll} id="down-all-btn" className="btn">Move me to bottom</button>
          </div>
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
    },
    handleUpOne (property) {
      dispatch(upOne(property))
    },
    handleUpAll (property) {
      dispatch(upAll(property))
    },
    handleDownOne (property) {
      dispatch(downOne(property))
    },
    handleDownAll (property) {
      dispatch(downAll(property))
    },
    handleDeleteImg (id) {
      dispatch(deleteImg(id))
    },
    handleImg (img) {
      dispatch(newImg(img))
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
