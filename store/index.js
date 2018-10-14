import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    state: {
      posts: [],
      users: [],
      comments: []
    },
    mutations: {
      add (state, posts) {
        state.posts = posts;
      },
      users (state, users) {
        state.users = users;
      },
      comments (state, comments) {
        state.comments = comments;
      }
    },
    actions: {
      getUsers ( store ) {
        return axios.get('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            store.commit('users', response.data)
        })
      },
      getPosts (  store  ) {
        return axios.get('https://jsonplaceholder.typicode.com/posts')
          .then((response) => {
            store.commit('add', response.data);
        })
      },
      getComments (  store  ) {
        return axios.get('https://jsonplaceholder.typicode.com/comments')
          .then((response) => {
            store.commit('comments', response.data);
        })
      }
    },
    getters: {
      findUser: store => id => {
        return store.users.filter(item => item.id === id)
      }
    }
  })
}

export default store