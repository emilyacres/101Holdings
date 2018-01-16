import axios from 'axios';
import history from '../history';

/**
 * THUNK CREATORS
 */

export const submitContact = (contact) =>
  dispatch =>
    axios.post('/api/contact/', contact)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
