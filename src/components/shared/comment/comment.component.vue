<template>
    <div class="comments py-4 px-4">
        <div class="flex justify-between items-end">
            <!-- <input class="bg-gray-500 rounded-full w-10/12 px-5 py-2 placeholder-gray-400 text-white outline-none" type="text" v-model="commentText" placeholder="Add comment"> -->
            <div class="bg-gray-500 w-11/12 px-4 pt-2 pb-3 rounded-t-3xl rounded-b-3xl flex justify-between items-end">
                <div id="comment-field" contenteditable="true" class="w-9/12 text-white outline-none cursor-text flex-row-reverse" :class = "{['text-gray-400']: !edited}" v-text="txt" @blur="onEdit" @focus="checkEdited"></div>
                <div class="flex items-center">
                    <button class="text-gray-700 hover:text-white" @click="uploadImage"><CameraIcon class="w-6 h-6"></CameraIcon></button>
                </div>
            </div>
            <div>
                <button class="border border-white rounded-full text-white hover:bg-white hover:text-black" @click="uplaodComment"><ArrowSmDownIcon class="w-6 h-6"></ArrowSmDownIcon></button>
            </div>
        </div>
        <img v-if="url.length" :src="url" class="text-field-image w-12" alt="">
        <input ref="fileInput" type="file" style="visibility:hidden" @change="readUrl" />
        <p v-for="(comment, index) in comments" :key="index" class="rounded bg-gray-100 p-2 mt-5">{{comment.text}}</p>
    </div>  
</template>

<script>
import {ArrowSmDownIcon, CameraIcon} from '@heroicons/vue/solid';
export default {
    name:'Comment',
    props:['comments', 'postId'],
    components:{ArrowSmDownIcon, CameraIcon},
    data:()=>({
        edited: false,
        txt:'',
        url:''
    }),
    created(){
        this.txt = this.edited ? '' : 'Edit me';
    },
    methods:{
        uplaodComment(){
            console.log(this.txt);
            // this.$store.dispatch('addComment', {post:this.postId, text:this.commentText}).then(()=>{
            //     this.commentText = '';
            // })
        },
        onEdit(evt){
             var src = evt.target.innerText
             if(src.length){
                 this.txt = src;
             }else{
                 this.edited = false;
                 this.txt = 'Edit me';
             }
         },
         checkEdited(){
             if(!this.edited){
                this.txt = '';
                this.edited = true;
             }
         },
         uploadImage(){
            this.$refs.fileInput.click();
        },
        readUrl(e){
            const file = e.target.files[0];
            
            this.file = file;
            this.url = URL.createObjectURL(file);
        },
    }
}
</script>

<style lang="scss">
</style>