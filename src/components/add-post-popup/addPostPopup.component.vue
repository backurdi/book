<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div
      class=" px-12 text-white bg-red-400 rounded duration-300"
      :class="{ 'h-0 mb-0': !displayError, 'h-full py-2 mb-10': displayError }"
    >
      <p
        class="font-bold"
        :class="{ visible: displayError, invisible: !displayError }"
      >{{errorMessage}}</p>
    </div>
  <div class="flex justify-between mb-5">
  <div class="bg-gray-600 text-white py-4 px-10 w-10/12 rounded-full" @click="addPostPopup()">
      <h3>Make a post</h3>
  </div>
  <div class="self-center rounded-full flex items-center justify-center text-gray-600 border border-gray-600 w-12 h-12 hover:text-white hover:bg-gray-600 cursor-pointer">
      <DotsVerticalIcon class="w-8 h-8"></DotsVerticalIcon>
  </div>
</div>
<Popup @closePopUp="open = false" :open="open" :buttonText="'Add post'">
  <CommentTextField class="overflow-visible" @emitBody="addPost" buttonText="Add post"></CommentTextField>
</Popup>
</template>

<script>
import Popup from '@/components/shared/popup/popup.component';
import CommentTextField from '@/components/shared/comment-text-field/comment-text-field.component';
import {
  DotsVerticalIcon,
} from '@heroicons/vue/solid';

export default {
  name:'Add post popup',
  components: {
    DotsVerticalIcon,
    Popup,
    CommentTextField
  },
  data: () => ({
    searchText: "",
    booksData: [],
    open: false,
    errorMessage: '',
    displayError: false,
  }),
  methods: {
    addPost(body) {
      this.$store.dispatch("addPost", body).then(()=>{
        this.text = "";
        this.pagesFrom = 0;
        this.pagesTo = 0;
        this.open = false;
      })
      .catch(err=>{
        this.errorMessage = err.message;
        this.displayError = true;

        setTimeout(()=>{
          this.errorMessage = '';
          this.displayError = false;
        }, 5000)
      });
    },
    addPostPopup() {
      this.open = !this.open;
    },
  },
};
</script>
