<template>
  <div>
    <div class="posts mb-10 bg-gray-600 rounded" v-for="(post, index) in posts" :key="index">
      <Post :post="post" :books="books"></Post>
      <Comment :comments="post.comments" :postId="post._id"></Comment>
    </div>
  </div>
</template>

<script>
import Comment from '../shared/comment/comment.component.vue';
import Post from '../shared/post/post.component.vue';
export default {
  name: 'Club Feed',
  components:{Comment, Post},
  computed:{
    posts(){
      return this.$store.state.posts
    },
    books(){
      return this.$store.state.books
    }
  },
}
</script>

<style lang="scss">
  .posts{
    max-width: 750px;
  }
</style>