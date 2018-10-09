import axios from 'axios';

export default function comments ( {params, store } ) {
  return axios.get('https://jsonplaceholder.typicode.com/comments')
    .then((response) => {
      store.commit('comments', response.data);
    })
}