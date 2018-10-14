<template>
    <div class="container">
        <h1>Detail post № &nbsp;{{post.id}}</h1>
        <div class="wrapper">
            <main class="cardWrapper">
                <div class="card">
                    <h2 class="header">{{post.title}}</h2>
                    <div class="description"><p>{{post.body}}</p></div>
                    <div class="user_name"> 
                        <h3>Name author : {{userName}}</h3>
                    </div>
                    <div class="sum_comment">
                        <span class="highlight">Amount of comments  &nbsp;</span>
                        <p>{{sumPostComments(post.id)}}</p>
                    </div>
                    <div  @click="isOpen = !isOpen" class="toggle">Toggle comments</div>
                    <div class="commentWrap" :class="{active: isOpen}">
                        <section v-if="isOpen" v-for="(item, index) in comments" :key="index" class="comment">
                            <div><span>Number Comment</span><h3>{{index + 1}}</h3></div>
                            <div><span>Name Author</span><h2>{{userName}}</h2></div>
                            <div><span>Name comment</span><h3>{{item.name}}</h3></div>
                            <div><span>Body comment</span><p>{{item.body}}</p></div>
                            <div><span>Email</span><a :href="'mailto:' + item.email">{{item.email}}</a></div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script>
import {getPost} from '@/api/getPost'
import {getCommentsById} from '@/api/getCommentsById'
import { mapActions } from 'vuex'
export default {
    name: 'post',
    data: () => ({
        post: [],
        comments: [],
        isOpen: false,
        userName: ''
    }),
    methods: {
         ...mapActions(['getUsers', 'getComments', 'getPosts']),
        findUserName (id) {
        this.$store.state.users.map(item => {
            if (id === item.id) {
                this.userName = item.username 
                return
            }
        })
        },
        sumPostComments (id) {
        let sumComments = 0;
        this.comments.map(item => {
            if(id === item.postId) {
            sumComments++
            }
        })
        return sumComments
        },
        async takePost () {
            this.post = await getPost (this.$route.params.id)
            this.post = this.post.data
        },
        async getComments () {
            this.comments = await getCommentsById (this.$route.params.id)
            this.comments = this.comments.data
        }
    },
    created () {
        this.takePost()
        this.getComments ()
    },
    updated() {
        this.findUserName(this.post.userId)
    },
}
</script>
<style scoped>
.container{
    text-align: center;
}
.card, .comment{
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
    background: #343433;
    border: 1px solid rgba(255, 255, 255, 0.945);
    border-radius: 10px;
}
.commentWrap{
    max-height: 0;
    overflow: hidden;
    transition: 1s;
    width: calc(100vw - 120px);
}
.active{
    max-height: 3000px;
}
.header, .description, .user_name, .sum_comment{
    border-bottom: 1px solid rgba(0, 0, 0, 0.041);
    color: white;
}
.description{
    margin-bottom: 15px;
}
.user_name{
    font-size: 25px;
}
.header::first-letter, .description::first-letter, .user_name::first-letter{
    text-transform: capitalize;
}
.sum_comment{
    margin: 15px 0;
}
.toggle{
    margin-bottom: 15px;
    cursor: pointer;
    text-decoration: underline;
    transition: .4s;
    color: white;
    padding: 10px;
    border: 1px solid rgba(238, 226, 226, 0.26);
    border-radius: 10px;
}
.toggle:hover{
    color: #1c92d2;
}
.comment div{
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}
.comment div::first-letter{
    text-transform: capitalize;
}
.comment{
    margin-bottom: 15px;
    transition: .4s;
}
.comment:hover{
    box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
}
.comment div span{
    margin-bottom: 15px;
    text-decoration: underline;
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
