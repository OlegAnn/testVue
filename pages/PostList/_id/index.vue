<template>
  <div class="container">
    <h1>All posts of user</h1>
    <main class="wrap">
      <section v-for="(item, index) in postList" :key="index" class="postlist">
        <!-- <label>km: <input type="text" v-model="km2"></label><br/>
        <label>cm: <input type="text" v-model="cm"></label><br/>
        <label>mm: <input type="text" v-model="mm"></label><br/> -->
        <div><span>Number post</span><h2>{{item.id}}</h2></div>
        <div class="name"><span>Name Author</span><h3>{{findUserName(item.userId)}}</h3></div>
        <div><span>Title post</span><h3>{{item.title}}</h3></div>
        <div><span>Body post</span><p>{{item.body}}</p></div>
      </section>
    </main>
  </div>
</template>
<script>
import {getAllPostsUser} from '@/api/getAllPostsUser'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'PostList',
    data: () => ({
        postList: [],
        userName: '',
        km2: 0,
        cm: 0,
        mm: 0,
        user: '',
        id: 0
    }),
    computed: {
      ...mapGetters([
        'findUser'
      ]),
      ser() {
        return this.findUser(10)
      }
    },
    methods: {
      ...mapActions(['getUsers']),
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
    async created () {
      this.getUsers()
      this.takePostList()
    },
    watch: {
      km2: function (val) {
        this.km2 = val
        this.cm = val * 100000
        this.mm = val * 1000000
      },
      cm (val) {
        this.km2 = val / 100000
        this.cm = val
        this.mm = val * 10
      }
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
.postlist div{
  margin: 20px 0;
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
