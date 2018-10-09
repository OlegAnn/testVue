import axios from 'axios';

export default function posts ( {params, store } ) {
  return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      store.commit('add', response.data);
    })
}