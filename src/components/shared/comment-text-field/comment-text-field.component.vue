<template>
    <div class="flex justify-between items-end">
        <div class="bg-gray-500 w-11/12 px-4 pt-2 pb-3 rounded-t-3xl rounded-b-3xl flex justify-between items-end">
            <div id="comment-field" contenteditable="true" class="w-9/12 text-white outline-none cursor-text flex-row-reverse" :class = "{['text-gray-400']: !edited}" v-text="txt" @blur="onEdit" @focus="checkEdited"></div>
            <div class="flex items-center">
                <button class="text-gray-700 hover:text-white" @click.prevent="uploadImage"><CameraIcon class="w-6 h-6"></CameraIcon></button>
            </div>
        </div>
        <div>
            <button class="border border-white rounded-full text-white hover:bg-white hover:text-black" @click.prevent="commentActionClicked"><ArrowSmDownIcon class="w-6 h-6"></ArrowSmDownIcon></button>
        </div>
    </div>
    <img v-if="url.length" :src="url" class="text-field-image w-12" alt="">
    <input ref="fileInput" type="file" style="visibility:hidden" @change="readUrl" />
</template>

<script>
import {ArrowSmDownIcon, CameraIcon } from '@heroicons/vue/solid';
export default {
    name:'Comment text field',
    components:{ArrowSmDownIcon, CameraIcon,},
    props:['editText', 'editImage', 'postId', 'buttonAction', 'commentId'],
    data:()=>({
        edited: false,
        txt:'',
        url:'',
        file:'',
        form: new FormData,
    }),
    created(){
        if(this.editText){
            this.edited = true;
            this.txt = this.editText;
        }else{
            this.txt = this.edited ? '' : 'Edit me';
        }
        if(this.editImage){
            this.url = this.editImage;
        }
    },
    methods:{
        commentActionClicked(){
            if(this.edited){
                this.form.append('post', this.postId)
                this.form.append('text', this.txt)
                if(this.file.name){
                    this.form.append('photo', this.file)
                }
    
                this.$store.dispatch(this.buttonAction, {id:this.commentId, formData:this.form}).then(()=>{
                    this.txt = 'Edit me';
                    this.edited = false;
                    this.file = '';
                    this.url = '';
                    this.form.delete('post');
                    this.form.delete('text');
                    this.form.delete('photo');

                    this.$emit('commentActionDone');
                })
            }
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

<style>

</style>