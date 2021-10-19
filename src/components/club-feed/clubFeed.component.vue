<template>
  <div>
    <div class="posts mb-10 bg-gray-600 rounded" v-for="(post, index) in posts" :key="index">
      <Post :post="post" :books="books"></Post>
      <div class="p-4">
        <CommentTextFieldComponent :postId="post._id" buttonAction="addComment"></CommentTextFieldComponent>
        <Comment v-for="(comment, index) in post.comments" :key="index" :comment="comment" :index="index" :postId="post._id"></Comment>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '../shared/comment/comment.component.vue';
import Post from '../shared/post/post.component.vue';
import CommentTextFieldComponent from '../shared/comment-text-field/comment-text-field.component.vue';
export default {
  name: 'Club Feed',
  components:{Comment, Post, CommentTextFieldComponent},
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