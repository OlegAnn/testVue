import axios from 'axios';

export default function users ( {params, store } ) {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      store.commit('users', response.data);
    })
}