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
        return axios.get('/api/properties')
      })
      .then( res => {
        dispatch(updateProperties(res.data || defaultProperties))
      })
      .catch(err => console.log(err))

export const deleteProperty = (propertyId) =>
  dispatch =>
    axios.delete(`/api/properties/${propertyId}`)
      .then(res => {
        return axios.get('/api/properties')
      })
      .then( res => {
        dispatch(updateProperties(res.data || defaultProperties))
      })
      .catch(err => console.log(err))

export const upOne = (property) =>
  dispatch =>
    axios.put(`/api/rank/upone/${property.id}`, property)
      .then( res => {
        dispatch(updateProperties(res.data || defaultProperties))
      })
      .catch(err => console.log(err))

export const upAll = (property) =>
  dispatch =>
    axios.put(`/api/rank/upall/${property.id}`, property)
      .then( res => {
        dispatch(updateProperties(res.data || defaultProperties))
      })
      .catch(err => console.log(err))

export const downOne = (property) =>
  dispatch =>
    axios.put(`/api/rank/downone/${property.id}`, property)
      .then( res => {
        dispatch(updateProperties(res.data || defaultProperties))
      })
      .catch(err => console.log(err))

export const downAll = (property) =>
  dispatch =>
    axios.put(`/api/rank/downall/${property.id}`, property)
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
