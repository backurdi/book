<template>
  <div
    class="px-12 text-white bg-red-400 rounded duration-300"
    :class="{ 'h-0 mb-0': !displayError, 'h-full py-2 mb-10': displayError }"
  >
    <p class="font-bold" :class="{ visible: displayError, invisible: !displayError }">{{ errorMessage }}</p>
  </div>
  <div class="create-post flex items-center justify-between mb-5">
    <div class="px-10 py-4 w-full text-dark bg-white rounded-full shadow-md" @click="addPostPopup()">
      <h3>Make a post</h3>
    </div>
    <router-link :to="'/club/' + activeClub._id" v-if="user.id === activeClub.owner">
      <DotsVerticalIcon class="w-10 h-10"></DotsVerticalIcon>
    </router-link>
  </div>
  <Popup @closePopUp="open = false" :open="open" :buttonText="'Add post'">
    <CreatePost
      :createLoading="createLoading"
      ref="createPost"
      buttonText="Create post"
      @close="open = false"
      @emitBody="addPostMethod"
    ></CreatePost>
  </Popup>
</template>

<script>
import Popup from "@/components/shared/popup";
import CreatePost from "@/components/shared/create-post/create-post.component.vue";
import { DotsVerticalIcon } from "@heroicons/vue/solid";
import { mapActions, mapState } from "vuex";

export default {
  name: "add-post-popup",
  components: {
    Popup,
    CreatePost,
    DotsVerticalIcon,
  },
  data: () => ({
    open: false,
    errorMessage: "",
    displayError: false,
    createLoading: false,
  }),
  computed: {
    ...mapState("clubStore", ["activeClub"]),
    ...mapState("userStore", ["user"]),
  },
  methods: {
    ...mapActions("postStore", ["addPost"]),
    addPostPopup() {
      this.open = !this.open;
    },
    async addPostMethod(event) {
      event.append("club", this.activeClub._id);
      this.createLoading = true;
      try {
        await this.addPost(event);
        this.$refs.createPost.clearFields();
        this.$refs.createPost.clearForm();
        this.createLoading = false;
        this.open = false;
      } catch (err) {
        this.errorMessage = err.message;
        this.displayError = true;

        setTimeout(() => {
          this.errorMessage = "";
          this.displayError = false;
        }, 5000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.create-post {
  max-width: 1000px;
}
</style>
