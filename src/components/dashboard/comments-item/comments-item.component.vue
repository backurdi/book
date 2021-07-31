<template>
  <div>
    <comment-text-field @addComment="addComment($event)"></comment-text-field>
    <comments-list
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
      @deleteComment="deleteComment(comment._id)"
    ></comments-list>
  </div>
</template>

<script>
import commentTextField from "./comment-text-field/comment-text-field.component.vue";
import commentsList from "./comments-list/comments-list.component.vue";

export default {
  name: "comments item",
  components: { commentTextField, commentsList },
  props: ["comments"],
};
</script>

<style></style>
