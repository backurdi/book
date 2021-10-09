<template>
  <div class="post text-white mb-4 flex-col border-b-2 border-gray-400 pb-4 relative">
        <div class="flex justify-between px-8 pt-4">
          <div class="mb-5" v-html="domDecoder(post.text)"></div>
          <div @click="showDropdown = !showDropdown" v-if="user.id === post.user">
            <DotsVerticalIcon class="w-6 h-6 cursor-pointer" v-if="!showDropdown"></DotsVerticalIcon>
            <XIcon class="w-6 h-6 cursor-pointer" v-if="showDropdown"></XIcon>
          </div>
        </div>
        <div class="border-grey-100 absolute right-5 top-12 w-150 bg-white border rounded text-gray-600" v-if="showDropdown">
          <ul>
            <li class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="openPopup('Update')">
              <span class="font-bold">Update post</span>
            </li>
            <li class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="openPopup('Delete')">
              <span class="font-bold">Delete post</span>
            </li>
          </ul>
        </div>
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
        <div class="flex justify-center bg-black image-container">
          <img :src="post.photo" alt="">
        </div>
      </div>
      <Popup v-if="openUpdate" @closePopUp="openUpdate = false" :open="openUpdate">
        <CommentTextField class="overflow-visible" @emitBody="updatePost" :textFromParent="post.text" buttonText="Update"></CommentTextField>
      </Popup>
      <Popup v-if="openDelete" @closePopUp="openDelete = false" :open="openDelete">
        <DeletePopup @delete="deletePost" @cancle="closeDelete"></DeletePopup>
      </Popup>
</template>

<script>
import {DotsVerticalIcon, XIcon} from '@heroicons/vue/solid';
import Popup from '@/components/shared/popup/popup.component';
import CommentTextField from '@/components/shared/comment-text-field/comment-text-field.component';
import DeletePopup from '../../delete-popup/deletePopup.component.vue';

export default {
    name:'Post',
    components:{DotsVerticalIcon, XIcon, Popup, CommentTextField, DeletePopup},
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