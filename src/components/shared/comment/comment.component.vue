<template>
    <div class="comments">
        <div class="flex items-center justify-between">
            <input class="bg-gray-500 rounded-full w-10/12 px-5 py-2 placeholder-gray-400 text-white outline-none" type="text" v-model="commentText" placeholder="Add comment">
            <button class="border border-white rounded-full text-white hover:bg-white hover:text-black" @click="uplaodComment"><ArrowSmDownIcon class="w-6 h-6"></ArrowSmDownIcon></button>
        </div>
        <p v-for="(comment, index) in comments" :key="index" class="rounded bg-gray-100 p-2 mt-5">{{comment.text}}</p>
    </div>  
</template>

<script>
import {ArrowSmDownIcon} from '@heroicons/vue/solid';
export default {
    name:'Comment',
    props:['comments', 'postId'],
    components:{ArrowSmDownIcon},
    data:()=>({
        commentText:''
    }),
    methods:{
        uplaodComment(){
            this.$store.dispatch('addComment', {post:this.postId, text:this.commentText}).then(()=>{
                this.commentText = '';
            })
        }
    }
}
</script>

<style>

</style>