<template>
  <div class="post text-white mb-4 flex-col border-b-2 border-gray-400 pb-4 relative">
        <div class="flex justify-between px-4 pt-4">
          <div class="flex items-center">
            <div class="hover-trigger relative mx-auto w-12 h-12 bg-cover rounded-full mr-3"
                :style="{
                'background-image': `url(${post.user.photo ? post.user.photo : require('@/assets/images/default-avatar.png')})`,
              }"
          ></div>
          <p>{{post.user.name}}</p>
          </div>
          <DotsDropdownComponent v-if="user.id === post.user._id" dropdownContext="post" @update="openPopup('Update')" @delete="openPopup('Delete')"></DotsDropdownComponent>
        </div>
        <div class="p-4">
          <div class="mb-5" v-html="domDecoder(post.text)"></div>
          <div class="flex justify-end" v-if="bookForPost(post.book)">
            <img class="mr-5 border border-gray-200 w-8 rounded " :src="bookForPost(post.book).image" :alt="'cover of '+bookForPost(post.book).title">
            <div>
              <p>{{bookForPost(post.book).title.length > 18 ?  `${bookForPost(post.book).title.substring(0, 18)}...` : bookForPost(post.book).title}}</p>
              <div class="flex">
                <p class="mr-5">from: {{post.pagesFrom}}</p>
                <p>to: {{post.pagesTo}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center bg-black image-container">
          <img :src="post.photo" alt="">
        </div>
      </div>
      <Popup v-if="openUpdate" @closePopUp="openUpdate = false" :open="openUpdate">
        <CreatePost buttonText="Update post" @close="open=false" @emitBody="updatePost" :postData="post"></CreatePost>
      </Popup>
      <Popup v-if="openDelete" @closePopUp="openDelete = false" :open="openDelete">
        <DeletePopup @delete="deletePost" @cancle="closeDelete"></DeletePopup>
      </Popup>
</template>

<script>
import DotsDropdownComponent from '../dots-dropdown/dots-dropdown.component.vue';
import Popup from '@/components/shared/popup/popup.component';
import DeletePopup from '../../delete-popup/deletePopup.component.vue';
import CreatePost from '@/components/shared/create-post/create-post.component.vue';

export default {
    name:'Post',
    components:{DotsDropdownComponent, Popup, DeletePopup, CreatePost},
    props:['post', 'books'],
    data:()=>({
      showDropdown:false,
      openUpdate:false,
      openDelete:false,
    }),
    computed:{
      user(){
        return this.$store.state.user;
      }
    },
    methods:{
      domDecoder (str) {
        let parser = new DOMParser();
        let dom = parser.parseFromString('<!doctype html><body>' + str, 'text/html');
        return dom.body.textContent;
      },
      bookForPost(bookId){
        return this.books.find(book => book._id === bookId)
      },
      openPopup(popUp){
        this[`open${popUp}`] = !this[`open${popUp}`]
      },
      updatePost(updatedPost){
        this.$store.dispatch('updatePost', {id: this.post._id, content: updatedPost}).then(()=>{
          this.showDropdown = false;
          this.openUpdate = false;
        });
      },
      closeDelete(){
        this.showDropdown = false;
        this.openDelete = false;
      },
      deletePost(){
        this.$store.dispatch('deletePost', {postId: this.post._id, clubId: this.post.club}).then(()=>{
          this.showDropdown = false;
          this.openDelete = false;
        });
      }
    }

}
</script>

<style lang="scss">
</style>