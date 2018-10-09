<template>
    <div class="container">
        <h1>Detail post № &nbsp;{{post.id}}</h1>
        <div class="wrapper">
            <div class="cardWrapper">
                <div class="card">
                    <h1 class="header">{{post.title}}</h1>
                    <div class="description">{{post.body}}</div>
                    <div class="user_name">
                        <span class="highlight">Name author : &nbsp; </span>  
                        {{userName}}
                    </div>
                    <div class="sum_comment">
                        <span class="highlight">Amount of comments  &nbsp;</span>
                        {{sumPostComments(post.id)}}
                    </div>
                    <div  @click="isOpen = !isOpen" class="toggle">Toggle comments</div>
                    <div class="commentWrap" :class="{active: isOpen}">
                        <div v-if="isOpen" v-for="(item, index) in comments" :key="index" class="comment">
                            <div><span>Number Comment</span>{{index + 1}}</div>
                            <div><span>Name Author</span>{{userName}}</div>
                            <div><span>Name comment</span>{{item.name}}</div>
                            <div><span>Body comment</span>{{item.body}}</div>
                            <div><span>Email</span>{{item.email}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getPost} from '@/api/getPost'
import {getCommentsById} from '@/api/getCommentsById'
export default {
    name: 'post',
    middleware: ['index', 'users', 'comments'],
    data: () => ({
        post: [],
        comments: [],
        isOpen: false,
        userName: ''
    }),
    methods: {
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
        this.$store.state.comments.map(item => {
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
    },
    beforeUpdate() {
        this.getComments ()
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
    border: 1px solid rgba(0, 0, 0, 0.041);
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
}
.commentWrap{
    max-height: 0;
    overflow: hidden;
    transition: 1s;
    width: calc(100vw - 120px);
}
.active{
    max-height: 2000px;
}
.header, .description, .user_name{
    border-bottom: 1px solid rgba(0, 0, 0, 0.041);
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
}
.toggle:hover{
    color: #1c92d2;
}
.comment div{
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
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
.comment:nth-child(odd){
    background: rgba(0, 0, 0, 0.041);
}
.comment div span{
    margin-bottom: 15px;
    text-decoration: underline;
}
</style>
