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
      zip: "",
      id: ""
    }

    this.scrollUp = this.scrollUp.bind(this);
    this.closeImg = this.closeImg.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showMobileFilters = this.showMobileFilters.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this.leftArrow = this.leftArrow.bind(this);
    this.rightArrow = this.rightArrow.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleMobileFilter = this.handleMobileFilter.bind(this);

  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      filteredProperties: nextProps.properties,
      properties: nextProps.properties
    })
  }

  componentDidMount () {
    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if(document.getElementById("properties-container") && navigator.appVersion.indexOf("Win")!=-1) {
      if(window.innerWidth < 1700) {
        document.getElementById("properties-container").style.marginLeft = '8vw';
      } else {
        document.getElementById("properties-container").style.marginLeft = '9vw';
      }
    }
  }

  handleFilter (city) {
    let newProperties;
    if ( city !== "National") {
      newProperties = this.state.properties.filter( property => {
        return property.city === city
      })
    } else {
      newProperties = this.state.properties.filter( property => {
        return property.city !== "Brooklyn" && property.city !== "Bronx" && property.city !== "New York"
      })
    }
    this.setState({
      filteredProperties: newProperties
    })

    if (city === "New York") city = "Manhattan";
    document.getElementById("nav-filter").innerHTML = "Filter: ";
    document.getElementById("nav-selected").innerHTML = "" + city + "";
    document.getElementById("close-filter").classList.remove("hide");
    this.toggleFilters();
  }

  handleMobileFilter (city) {
    let newProperties;
    if ( city !== "National") {
      newProperties = this.state.properties.filter( property => {
        return property.city === city
      })
    } else {
      newProperties = this.state.properties.filter( property => {
        return property.city !== "Brooklyn" && property.city !== "Bronx" && property.city !== "New York"
      })
    }
    this.setState({
      filteredProperties: newProperties
    })
    this.closeMenu();
  }

  closeFilter (event) {
    this.setState({
      filteredProperties: this.state.properties
    })
    document.getElementById("nav-filter").innerHTML = "Filter";
    document.getElementById("close-filter").classList.add("hide");
    document.getElementById("nav-selected").innerHTML = "";
  }

  scrollUp (event) {
    event.preventDefault();
    let top = document.getElementById("landing")
    top.scrollIntoView({behavior: "smooth", block: "start"})
  }

  expandImg (propertyId) {
    //prevent mobile users from expanding images
    if (window.innerWidth <= 800) {
      return ;
    }
    let propertyData = this.state.properties.filter(prop => prop.id === propertyId)[0];
    let fullImg = this.state.properties.filter(prop => prop.id === propertyId)[0].img;
    let fullImgDiv = document.getElementById("full-img");
    let classes = Array.prototype.slice.call(fullImgDiv.classList);

    //create text nodes for hover state
    let name = document.createTextNode(propertyData.name);
    let city = document.createTextNode(propertyData.city + ', ' + propertyData.state)
    let acquired = document.createTextNode("Acquired " + propertyData.acquired);
    let feet = document.createTextNode(propertyData.feet + " Sq ft.");

    if (classes.includes("hide")) {

      //add text node to proper places
      document.getElementById("full-img-name").appendChild(name);
      document.getElementById("full-img-city").appendChild(city);
      document.getElementById("full-img-acquired").appendChild(acquired);
      document.getElementById("full-img-feet").appendChild(feet);
      //make full image visible
      fullImgDiv.classList.remove("hide");
      fullImgDiv.style.backgroundImage = "url(http://one-oh-one.s3.us-east-2.amazonaws.com/" + fullImg + ")";
      document.getElementById("nav").scrollIntoView({behavior: "smooth", block: "start"})
      this.setState({
        id: propertyId
      })
      fullImgDiv.classList.add("propertyId" + propertyId);


    } else {
      //clear out old text nodes
      document.getElementById("full-img-name").innerHTML = "";
      document.getElementById("full-img-city").innerHTML = "";
      document.getElementById("full-img-acquired").innerHTML = "";
      document.getElementById("full-img-feet").innerHTML = "";
      //add updated text nodes
      document.getElementById("full-img-name").appendChild(name);
      document.getElementById("full-img-city").appendChild(city);
      document.getElementById("full-img-acquired").appendChild(acquired);
      document.getElementById("full-img-feet").appendChild(feet);

      fullImgDiv.style.backgroundImage = "url(http://one-oh-one.s3.us-east-2.amazonaws.com/" + fullImg + ")";
      document.getElementById("nav").scrollIntoView({behavior: "smooth", block: "start"})

      this.setState({
        id: propertyId
      })

      fullImgDiv.classList.add("propertyId" + propertyId);
    }
  }

  closeImg () {
    //hide image
    let fullImgDiv = document.getElementById("full-img");
    let classes = Array.prototype.slice.call(fullImgDiv.classList);
    let propertyId = classes.filter( clas => clas.startsWith("propertyId"))[0].slice(10);
    //remove property id class and hide full image
    document.getElementById("full-img").classList = [];
    fullImgDiv.classList.add("hide");
    //clear out the text
    document.getElementById("full-img-name").innerHTML = "";
    document.getElementById("full-img-city").innerHTML = "";
    document.getElementById("full-img-acquired").innerHTML = "";
    document.getElementById("full-img-feet").innerHTML = "";
    document.getElementById(propertyId).scrollIntoView({behavior: "smooth", block: "start"})
  }

  leftArrow () {
    let currentProp = this.state.properties.filter(prop => prop.id === this.state.id)[0];
    let currentIdx = this.state.properties.indexOf(currentProp);
    let nextProp;
    if(currentIdx === 0) {
      nextProp = this.state.properties[this.state.properties.length-1];
    } else {
      nextProp = this.state.properties[currentIdx-1]
    }

    let fullImg = nextProp.img;
    let fullImgDiv = document.getElementById("full-img");

    //create text nodes for hover state
    let name = document.createTextNode(nextProp.name);
    let city = document.createTextNode(nextProp.city + ', ' + nextProp.state)
    let acquired = document.createTextNode("Acquired " + nextProp.acquired);
    let feet = document.createTextNode(nextProp.feet + " Sq ft.");

    //clear out old text nodes
    document.getElementById("full-img-name").innerHTML = "";
    document.getElementById("full-img-city").innerHTML = "";
    document.getElementById("full-img-acquired").innerHTML = "";
    document.getElementById("full-img-feet").innerHTML = "";
    //add updated text nodes
    document.getElementById("full-img-name").appendChild(name);
    document.getElementById("full-img-city").appendChild(city);
    document.getElementById("full-img-acquired").appendChild(acquired);
    document.getElementById("full-img-feet").appendChild(feet);

    fullImgDiv.style.backgroundImage = "url(http://one-oh-one.s3.us-east-2.amazonaws.com/" + fullImg + ")";
    document.getElementById("nav").scrollIntoView({behavior: "smooth", block: "start"})

    fullImgDiv.classList.add("propertyId" + nextProp.id);

    this.setState({
      id: nextProp.id
    })
  }

  rightArrow () {
    let currentProp = this.state.properties.filter(prop => prop.id === this.state.id)[0];
    let currentIdx = this.state.properties.indexOf(currentProp);
    let nextProp;
    if(currentIdx === this.state.properties.length-1) {
      nextProp = this.state.properties[0];
    } else {
      nextProp = this.state.properties[currentIdx+1]
    }

    let fullImg = nextProp.img;
    let fullImgDiv = document.getElementById("full-img");

    //create text nodes for hover state
    let name = document.createTextNode(nextProp.name);
    let city = document.createTextNode(nextProp.city + ', ' + nextProp.state)
    let acquired = document.createTextNode("Acquired " + nextProp.acquired);
    let feet = document.createTextNode(nextProp.feet + " Sq ft.");

    //clear out old text nodes
    document.getElementById("full-img-name").innerHTML = "";
    document.getElementById("full-img-city").innerHTML = "";
    document.getElementById("full-img-acquired").innerHTML = "";
    document.getElementById("full-img-feet").innerHTML = "";
    //add updated text nodes
    document.getElementById("full-img-name").appendChild(name);
    document.getElementById("full-img-city").appendChild(city);
    document.getElementById("full-img-acquired").appendChild(acquired);
    document.getElementById("full-img-feet").appendChild(feet);

    fullImgDiv.style.backgroundImage = "url(http://one-oh-one.s3.us-east-2.amazonaws.com/" + fullImg + ")";
    document.getElementById("nav").scrollIntoView({behavior: "smooth", block: "start"})

    fullImgDiv.classList.add("propertyId" + nextProp.id);

    this.setState({
      id: nextProp.id
    })
  }

  showMenu () {
    document.getElementById("mobile-menu-list").classList.remove("hide")
  }

  closeMenu (event) {
    document.getElementById("mobile-filters").classList.add("hide")
    document.getElementById("mobile-menu-list").classList.add("hide")
  }

  showMobileFilters () {
    this.setState({
      filteredProperties: this.state.properties
    })

    let filters = document.getElementById("mobile-filters")
    let classes = Array.prototype.slice.call(filters.classList);

    if (classes.includes("hide")) {
      document.getElementById("mobile-filters").classList.remove("hide");
      document.getElementById("mobile-filter-toggle").classList.add("gray")
    } else {
      document.getElementById("mobile-filters").classList.add("hide");
      document.getElementById("mobile-filter-toggle").classList.remove("gray")
    }
  }

  toggleFilters () {
    let filters = document.getElementById("dropdown-menu");
    let classes = Array.prototype.slice.call(filters.classList)
    if ( classes.includes("hide") ) {
      filters.classList.remove("hide");
    } else {
      filters.classList.add("hide");
    }
  }

  render () {
    return (
      <div>
        <div id="properties-container">
          <div id="mobile-menu-list" className="mobile hide">
            <img src="img/x.png" onClick={this.closeMenu} id="mobile-close" />
            <h1 onClick={this.scrollUp}>Home</h1>
            <h1 onClick={this.closeMenu}>Portfolio</h1>
            <h1 id="mobile-filter-toggle" onClick={this.showMobileFilters}>Filter</h1>
              <div id="mobile-filters" className="hide">
                <h1 onClick={this.handleMobileFilter.bind(this, "New York")} onKeyPress={this.closeMenu} id="mobile-filter-city">Manhattan</h1>
                <h1 onClick={this.handleMobileFilter.bind(this, "Brooklyn")} onKeyPress={this.closeMenu} id="mobile-filter-state">Brooklyn</h1>
                <h1 onClick={this.handleMobileFilter.bind(this, "Bronx")} onKeyPress={this.closeMenu}  id="mobile-filter-zip"> Bronx</h1>
                <h1 onClick={this.handleMobileFilter.bind(this, "National")} onKeyPress={this.closeMenu}  id="mobile-filter-zip"> National</h1>
              </div>
            <Link to="/about"><h1>Contact</h1></Link>
          </div>
            <div id="mobile-nav" className="mobile">
              <img src="img/logo-black.png" onClick={this.scrollUp} id="mobile-logo" />
              <img src="img/menu.png" id="mobile-menu" onClick={this.showMenu} />
            </div>
            <div id="nav" className="desktop">
              <h3 id="nav-filter" onClick={this.toggleFilters}>Filter</h3>
              <h3 id="nav-selected"></h3>
              <img src="img/x.png" onClick={this.closeFilter} id="close-filter" className="hide" />
              <div id="dropdown-menu" className="hide">
                <h4 onClick={this.handleFilter.bind(this, "New York")}>Manhattan</h4>
                <h4 onClick={this.handleFilter.bind(this, "Brooklyn")}>Brooklyn</h4>
                <h4 onClick={this.handleFilter.bind(this, "Bronx")}>Bronx</h4>
                <h4 onClick={this.handleFilter.bind(this, "National")}>National</h4>
              </div>
              <img onClick={this.scrollUp} id="nav-logo" src="img/logo-black.png" />
              <Link id="nav-contact-link" to="/about"><h3 id="nav-contact">About</h3></Link>
            </div>
            <div id="full-img" className="hide">
              <img onClick={this.leftArrow} id="left-arrow" src="img/left-arrow.png" />
              <div id="full-img-hover">
                <img src="img/x.png" onClick={this.closeImg} id="close-img" />
                <h4 id="full-img-name" className="bold"></h4>
                <h4 id="full-img-city"></h4>
                <h4 id="full-img-acquired"></h4>
                <h4 id="full-img-feet"></h4>
              </div>
              <img onClick={this.rightArrow} id="right-arrow" src="img/right-arrow.png" />
            </div>
            {this.state.properties && this.state.filteredProperties.map(property => {
              return <div onClick={this.expandImg.bind(this, property.id)} key={property.id} id={property.id} className="property-tile" style={{backgroundImage: 'url(http://one-oh-one.s3.us-east-2.amazonaws.com/' + property.thumb + ')', backgroundPosition:  'center center',
        backgroundSize: 'cover'}}>

                    <div className="property-tile-hover">
                      <h4 className="property-tile-name">{property.name}</h4>
                      <h4 className="property-tile-date">{property.city}, {property.state}</h4>
                      <h4 className="property-tile-date mobile">{property.acquired}</h4>
                      <h4 className="property-tile-date mobile">{property.feet}</h4>
                    </div>
                  </div>
            })}
        </div>
        <img src="img/up-arrow.png" id="up-arrow" onClick={this.scrollUp} />
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
