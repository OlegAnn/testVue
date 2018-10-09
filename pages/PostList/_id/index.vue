<template>
  <div class="container">
    <h1>All posts of user</h1>
    <div class="wrap">
      <div v-for="(item, index) in postList" :key="index" class="postlist">
          <div><span>Number post</span>{{item.id}}</div>
          <div class="name"><span>Name Author</span>{{findUserName(item.userId)}}</div>
          <div><span>Title post</span>{{item.title}}</div>
          <div><span>Body post</span>{{item.body}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getAllPostsUser} from '@/api/getAllPostsUser'
export default {
    name: 'PostList',
    middleware: ['users'],
    data: () => ({
        postList: [],
        userName: ''
    }),
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
      async takePostList () {
          this.postList = await getAllPostsUser (this.$route.params.id)
          this.postList = this.postList.data
      }
    },
    created () {
      this.takePostList()
    }
}
</script>

<style scoped>
.container{
  text-align: center;
}
.wrap{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.postlist{
  max-width: 320px;
  min-width: 320px;
  min-height: 460px;
  max-height: 460px;
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
.postlist div{
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 70px;
  max-height: 70px;
  color: white;
}
.postlist div span{
  margin-bottom: 15px;
  text-decoration: underline;
  color: #e4e4d9;
}
.name{
  font-size: 21px;
}
</style>
