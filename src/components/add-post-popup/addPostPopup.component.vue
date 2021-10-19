<template>
  <div
    class="px-12 text-white bg-red-400 rounded duration-300"
    :class="{ 'h-0 mb-0': !displayError, 'h-full py-2 mb-10': displayError }"
  >
    <p
      class="font-bold"
      :class="{ visible: displayError, invisible: !displayError }"
    >{{errorMessage}}</p>
  </div>
  <div class="flex justify-between mb-5 create-post">
    <div class="bg-gray-600 text-white py-4 px-10 w-full rounded-full" @click="addPostPopup()">
      <h3>Make a post</h3>
    </div>
  </div>
  <Popup @closePopUp="open = false" :open="open" :buttonText="'Add post'">
    <CreatePost ref="createPost" buttonText="Create post" @close="open=false" @emitBody="addPost"></CreatePost>
  </Popup>
</template>

<script>
import Popup from '@/components/shared/popup/popup.component';
import CreatePost from '@/components/shared/create-post/create-post.component.vue';

export default {
  name:'Add post popup',
  components: {
    Popup,
    CreatePost
  },
  data: () => ({
    open: false,
    errorMessage: '',
    displayError: false,
  }),
  computed:{
    club(){
      return this.$store.state.activeClub
    },
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    addPostPopup() {
      this.open = !this.open;
    },
    addPost(event){
      this.$store
        .dispatch("addPost", event)
        .then(() => {
          this.$refs.createPost.clearFields();
          this.$refs.createPost.clearForm();
          this.open = false;
        })
        .catch((err) => {
          this.errorMessage = err.message;
          this.displayError = true;

          setTimeout(() => {
            this.errorMessage = "";
            this.displayError = false;
          }, 5000);
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.create-post{
  max-width: 750px;
}
</style>
