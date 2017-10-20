import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_PROPERTIES = 'FETCH_PROPERTIES'

/**
 * INITIAL STATE
 */
const defaultProperties = []

/**
 * ACTION CREATORS
 */
const fetchProperties = properties => ({type: FETCH_PROPERTIES, properties})

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

/**
 * REDUCER
 */
export default function (state = defaultProperties, action) {
  switch (action.type) {
    case FETCH_PROPERTIES:
      return action.properties
    default:
      return state
  }
}