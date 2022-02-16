<template>
  <div class="comments text-dark">
    <div class="mb-5">
      <div class="flex">
        <div class="w-12 md:w-14">
          <div
            class="mr-2 mx-auto w-10 h-10 bg-cover rounded-full sm:w-12 sm:h-12"
            :style="{
              'background-image': `url(${comment.user.photo ? comment.user.photo : defaultAvatar})`,
            }"
          ></div>
        </div>
        <div class="px-1 w-9/12 sm:w-10/12">
          <div v-if="editComment !== index">
            <div class="p-2 bg-gray-100 rounded">
              <p class="mb-1 text-sm font-semibold">{{ comment.user.name }}</p>
              <p class="text-sm">{{ comment.text }}</p>
            </div>
            <p class="mb-2 text-gray-500 text-xs">{{ postDateFormat(comment.createdAt) }}</p>
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
    <DeletePopupComponent @delete-click="deleteClick" @cancle="closeDelete"></DeletePopupComponent>
  </PopupComponent>
</template>

<script>
import defaultAvatar from "@/assets/images/default-avatar.png";
import DotsDropdownComponent from "../dots-dropdown/dots-dropdown.component.vue";
import DeletePopupComponent from "../../delete-popup/deletePopup.component.vue";
import PopupComponent from "../popup.vue";
import CommentTextFieldComponent from "../comment-text-field/comment-text-field.component.vue";
import { mapActions, mapState } from "vuex";
import { postDateFormat } from "@/utils/helpers/date-format.js";
export default {
  name: "comment-item",
  props: ["comment", "postId", "index"],
  components: { CommentTextFieldComponent, DotsDropdownComponent, DeletePopupComponent, PopupComponent },
  data: () => ({
    openUpdate: false,
    openDelete: false,
    editComment: null,
    defaultAvatar,
  }),
  computed: {
    ...mapState("userStore", ["user"]),
  },
  methods: {
    ...mapActions("postStore", ["updatePost", "deleteComment"]),
    postDateFormat,
    closeDelete() {
      this.openDelete = false;
    },
    deleteClick() {
      this.deleteComment({ postId: this.postId, commentId: this.comment._id }).then(() => (this.openDelete = false));
    },
  },
};
</script>

<style lang="scss"></style>
