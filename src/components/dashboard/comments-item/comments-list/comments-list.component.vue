<template>
    <div>
        <div class="flex border p-3 rounded mt-3"> 
            <p class="flex-auto self-center">{{comment.text}}</p>
            <p class="flex-initial self-center mx-2">from: {{comment.pagesFrom}}</p>
            <p class="flex-initial self-center mx-2 mr-7">to: {{comment.pagesTo}}</p>
            <!-- <button class="border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-bold mr-2 py-2 px-4 rounded flex-initial">Edit</button> -->
            <button class="border border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2 px-4 rounded flex-initial" @click="deleteComment()">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comment list',
    props:['comment'],
    methods:{
        deleteComment(){
            this.$store.dispatch('deleteComment', this.comment._id);
        }
    }

}
</script>

<style>

</style>