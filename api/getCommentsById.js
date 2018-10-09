import axios from 'axios'


export function getCommentsById (id) {
  return axios({
    url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  })
}