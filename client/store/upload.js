import axios from 'axios';
import history from '../history';

/**
 * THUNK CREATORS
 */

export const updateImg = (file) =>
  dispatch => {
    axios.post('/api/upload', file, { 'content-type': 'multipart/form-data' })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }
