<template>
  <div>
    <div class="post mb-10 bg-white rounded-lg shadow-md" v-for="(post, index) in posts" :key="index">
      <div>
        <Post :post="post" :books="books"></Post>
      </div>
      <div class="p-4">
        <CommentTextFieldComponent
          :postId="post._id"
          buttonAction="addComment"
          @commentActionDone="onCommentAdded"
        ></CommentTextFieldComponent>
        <div class="flex justify-center" v-if="showMoreValue < post.comments?.length">
          <button @click="showMore(post.comments.length)">Show older</button>
        </div>
        <Comment
          v-for="(comment, index) in post.comments?.slice(
            post.comments.length < showMoreValue ? 0 : post.comments.length - showMoreValue,
            post.comments.length
          )"
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
import Comment from "./comment/comment.component.vue";
import Post from "./post/post.component.vue";
import CommentTextFieldComponent from "./comment-text-field/comment-text-field.component.vue";
export default {
  name: "club-Feed",
  components: { Comment, Post, CommentTextFieldComponent },
  props: ["posts", "books"],
  data: () => ({
    showMoreValue: 3,
  }),

  methods: {
    showMore(commentsLength) {
      if (commentsLength - (this.showMoreValue + 3) < 0) {
        this.showMoreValue = commentsLength;
      } else {
        this.showMoreValue += 3;
      }
    },
    onCommentAdded() {
      this.showMoreValue++;
    },
  },
};
</script>

<style lang="scss">
.posts {
  max-width: 750px;
}
</style>
