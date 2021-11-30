<template>
  <div class="comments">
    <div class="mb-5">
      <div class="flex">
        <div class="w-1/12">
          <div
            class="mr-2 mx-auto w-12 h-12 bg-cover rounded-full"
            :style="{
              'background-image': `url(${
                comment.user.photo ? comment.user.photo : require('@/assets/images/default-avatar.png')
              })`,
            }"
          ></div>
        </div>
        <div class="px-3 w-10/12">
          <div v-if="editComment !== index">
            <p class="p-2 bg-gray-100 rounded">{{ comment.text }}</p>
            <img class="mt-2 w-96 rounded" v-if="comment.photo" :src="comment.photo" alt="" />
          </div>
          <CommentTextFieldComponent
            v-else
            :editText="comment.text"
            :editImage="comment.photo"
            :postId="postId"
            buttonAction="updateComment"
            @commentActionDone="editComment = null"
            :commentId="comment._id"
          ></CommentTextFieldComponent>
        </div>
        <DotsDropdownComponent
          v-if="user.id === comment.user._id"
          :commentIndex="index"
          dropdownContext="comment"
          @update="editComment = $event"
          @delete="openDelete = true"
        ></DotsDropdownComponent>
      </div>
    </div>
  </div>
  <PopupComponent v-if="openDelete" @closePopUp="openDelete = false" :open="openDelete">
    <DeletePopupComponent @delete="deleteComment" @cancle="closeDelete"></DeletePopupComponent>
  </PopupComponent>
</template>

<script>
import DotsDropdownComponent from "../dots-dropdown/dots-dropdown.component.vue";
import DeletePopupComponent from "../../delete-popup/deletePopup.component.vue";
import PopupComponent from "../../shared/popup/popup.component.vue";
import CommentTextFieldComponent from "../comment-text-field/comment-text-field.component.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Comment",
  props: ["comment", "postId", "index"],
  components: { CommentTextFieldComponent, DotsDropdownComponent, DeletePopupComponent, PopupComponent },
  data: () => ({
    openUpdate: false,
    openDelete: false,
    editComment: null,
  }),
  computed: {
    ...mapState("userStore", ["user"]),
  },
  methods: {
    ...mapActions("postStore", ["updatePost", "deleteComment"]),
    closeDelete() {
      this.openDelete = false;
    },
    deleteComment() {
      this.deleteComment({ commentId: this.comment._id, postId: this.postId }).then(() => {
        this.openDelete = false;
      });
    },
  },
};
</script>

<style lang="scss"></style>
