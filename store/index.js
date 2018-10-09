import Vue from 'vue'
import Vuex from 'vuex'

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
    }
  })
}

export default store