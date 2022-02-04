<template>
  <div>
    <div class="post mb-10 bg-white rounded-lg shadow-md" v-for="(post, index) in posts" :key="index">
      <div>
        <Post :post="post" :books="books"></Post>
      </div>
      <div class="p-4">
        <CommentTextFieldComponent :postId="post._id" buttonAction="addComment"></CommentTextFieldComponent>
        <Comment
          v-for="(comment, index) in post.comments"
          :key="index"
          :comment="comment"
          :index="index"
          :postId="post._id"
        ></Comment>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../shared/comment/comment.component.vue";
import Post from "../shared/post/post.component.vue";
import CommentTextFieldComponent from "../shared/comment-text-field/comment-text-field.component.vue";
import { mapState } from "vuex";
export default {
  name: "club-Feed",
  components: { Comment, Post, CommentTextFieldComponent },
  computed: {
    ...mapState("postStore", ["posts"]),
    ...mapState("bookStore", ["books"]),
  },
};
</script>

<style lang="scss">
.posts {
  max-width: 750px;
}
</style>
