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
    <h3 class="text-black text-3xl font-bold mb-5">Create post</h3>
    <TextField @emitBody="createPost" buttonText="Create post"></TextField>
  </Popup>
</template>

<script>
import Popup from '@/components/shared/popup/popup.component';
import TextField from '@/components/shared/text-field/text-field.component'

export default {
  name:'Add post popup',
  components: {
    Popup,
    TextField,
  },
  data: () => ({
    searchText: "",
    booksData: [],
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
    createPost(data){
      this.$store.dispatch("addPost", data).then(()=>{
        this.postText = "";
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
    }
  },
};
</script>
<style lang="scss" scoped>
.create-post{
  max-width: 750px;
}
</style>
