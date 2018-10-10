<template>
  <div class="container">
    <h1>Post list API</h1>
    <div class="wrapper">
      <main class="cardWrapper">
        <div class="card" v-for="(item, index) in this.$store.state.posts" :key="index">
          <nuxt-link :to="{path: '/post/' + item.id}">
            <h2 class="header" :title='"Get detailed information of the post " + findUserName(item.userId)'>{{item.title}}</h2>
          </nuxt-link>
          <div class="description"><p>{{item.body}}</p></div>
          <nuxt-link :to="{path: '/postlist/' + item.userId}">
            <div class="user_name" :title='"Get all posts created by this user " + findUserName(item.userId)'> 
              <h3>Name author :&nbsp;{{findUserName(item.userId)}}</h3>
            </div>
          </nuxt-link>
          <div class="sum_comment"><span class="highlight">Amount of comments  &nbsp;</span><p>{{sumPostComments(item.id)}}</p></div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data: () => ({
  }),
  middleware: ['index', 'users', 'comments'],
  methods: {
    findUserName (id) {
      let name = ''
      this.$store.state.users.map(item => {
        if (id === item.id) {
          name = item.username
        }
      })
      return name
    },
    sumPostComments (id) {
      let sumComments = 0;
      this.$store.state.comments.map(item => {
        if(id === item.postId) {
          sumComments++
        }
      })
      return sumComments
    }
  },
  created() {
  }
}
</script>

<style scoped>
  .container{
    text-align: center;
  }
  .wrapper{
    position: relative;
    overflow: hidden;
  }
  .cardWrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .card{
    max-width: 320px;
    min-width: 320px;
    min-height: 560px;
    max-height: 560px;
    margin-bottom: 5%;
    border-radius: 2%;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
    transition: .2s box-shadow;
    display: flex;
    flex-direction: column;
    text-align: left;
    border: 1px solid rgba(0, 0, 0, 0.041);
    background: #343433;
  }
  .card:hover{
    box-shadow: 3px 3px 3px rgba(0,0,0,0.2);
  }
  .header{
    min-height: 170px;
    max-height: 170px;
    padding: 5px;
  }
  .header::first-letter, .description::first-letter{
    text-transform: capitalize;
  }
  .description, .user_name, .header{
    padding: 5px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  .description, .user_name, .sum_comment {
    min-height: 100px;
    max-height: 100px;
    color: white;
  }
  .user_name, .sum_comment{
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .user_name{
    cursor: pointer;
    font-size: 23px;
  }
  .highlight{
    color: #e4e4d9;
  }
  a{
    color: white;
    transition: .2s;
  }
  a:hover{
    color: #1c92d2;
  }
</style>

