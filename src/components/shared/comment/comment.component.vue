<template>
    <div class="comments py-4 px-4">
        <CommentTextFieldComponent :postId="postId" buttonAction="addComment"></CommentTextFieldComponent>
        <div v-for="(comment, index) in comments" :key="index" class="mb-5">
            <div class="flex">
                <div class="w-1/12">
                    <div class="mx-auto w-12 h-12 bg-cover rounded-full mr-2"
                            :style="{
                            'background-image': `url(${comment.user.photo ? comment.user.photo : require('@/assets/images/default-avatar.png')})`,
                        }"
                    ></div>
                </div>
                <div class="w-10/12 px-3">
                    <div v-if="editComment !== index">
                        <p class="rounded bg-gray-100 p-2">{{comment.text}}</p>
                        <img class="w-96 mt-2 rounded" v-if="comment.photo" :src="comment.photo" alt="">
                    </div>
                    <CommentTextFieldComponent v-else :editText="comment.text" :editImage="comment.photo" :postId="postId" buttonAction="updateComment" @commentActionDone="editComment = null" :commentId="comment._id"></CommentTextFieldComponent>
                </div>
                <DotsDropdownComponent v-if="user.id === comment.user._id" :commentIndex="index" @update="editComment = $event" @Delete="openDelete = true"></DotsDropdownComponent>
            </div>
        </div>
    </div>
    <PopupComponent v-if="openDelete" @closePopUp="openDelete = false" :open="openDelete">
        <DeletePopupComponent @delete="deletePost" @cancle="closeDelete"></DeletePopupComponent>
    </PopupComponent>
</template>

<script>
import DotsDropdownComponent from '../dots-dropdown/dots-dropdown.component.vue';
import DeletePopupComponent from '../../delete-popup/deletePopup.component.vue';
import PopupComponent from '../../shared/popup/popup.component.vue';
import CommentTextFieldComponent from '../comment-text-field/comment-text-field.component.vue';
export default {
    name:'Comment',
    props:['comments', 'postId'],
    components:{CommentTextFieldComponent, DotsDropdownComponent, DeletePopupComponent, PopupComponent},
    data:()=>({
        openUpdate:false,
        openDelete:false,
        editComment:null,
    }),
    computed:{
      user(){
        return this.$store.state.user;
      }
    },
    methods:{
        updatePost(updatedPost){
            this.$store.dispatch('updatePost', {id: this.post._id, content: updatedPost}).then(()=>{
            this.openUpdate = false;
        });
        },
        closeDelete(){
            this.openDelete = false;
        },
        deletePost(){
            this.$store.dispatch('deletePost', {postId: this.post._id, clubId: this.post.club}).then(()=>{
            this.openDelete = false;
        });
        }
    }
}
</script>

<style lang="scss">
</style>