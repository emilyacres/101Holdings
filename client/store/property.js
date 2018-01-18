import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_PROPERTIES = 'FETCH_PROPERTIES'
const UPDATE_PROPERTIES = 'UPDATE_PROPERTIES'

/**
 * INITIAL STATE
 */
const defaultProperties = []

/**
 * ACTION CREATORS
 */
const fetchProperties = properties => ({type: FETCH_PROPERTIES, properties})
const updateProperties = properties => ({type: UPDATE_PROPERTIES, properties})

/**
 * THUNK CREATORS
 */
export const allProperties = () =>
  dispatch =>
    axios.get('/api/properties')
      .then(res => {
        dispatch(fetchProperties(res.data || defaultProperties))
      })
      .catch(err => console.log(err))

export const updateProperty = (property) =>
  dispatch =>
    axios.put(`/api/properties/${property.id}`, property, { 'content-type': 'multipart/form-data' })
      .then(res => {
        console.log(res.data)
        return axios.get('/api/properties')
      })
      .then( res => {
        dispatch(updateProperties(res.data || defaultProperties))
      })
      .catch(err => console.log(err))

export const newProperty = (property) =>
  dispatch =>
    axios.post(`/api/properties/`, property )
      .then(res => {
        console.log(res.data)
        return axios.get('/api/properties')
      })
      .then( res => {
        dispatch(updateProperties(res.data || defaultProperties))
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultProperties, action) {
  switch (action.type) {
    case FETCH_PROPERTIES:
      return action.properties
    case UPDATE_PROPERTIES:
      return action.properties
    default:
      return state
  }
}
