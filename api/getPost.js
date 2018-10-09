import axios from 'axios'


export function getPost (id) {
  return axios({
    url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  })
}