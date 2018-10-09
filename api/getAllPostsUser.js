import axios from 'axios'


export function getAllPostsUser (id) {
  return axios({
    url: `https://jsonplaceholder.typicode.com/posts?userId=${id}`,
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  })
}