<template>
    <article class="bg-white w-5/6 mx-auto shadow-md rounded p-8" >
        <div v-if="!this.$store.state.booksArr.length" class="h-full w-full flex justify-center content-center">
            <div class="text-center text-3xl font-extrabold">
                <h1 class="text-green-400 uppercase">You have no books</h1>
                <h1 class="text-green-400 uppercase">Hurry and add some great books</h1>
            </div>
        </div>
        <div v-else>
        <h2 class="text-4xl mb-4">Recently read books</h2>
        <section class="recent-book flex w-full rounded-xl overflow-hidden">
            <div class="most-recent-book flex w-2/3">
                <div class="mr-5">
                    <img class="rounded border border-grey-400" :src="this.$store.state.focusedBook.image" alt="book cover">
                </div>
                <div class="w-full">
                    <div class="flex justify-between mb-4">
                        <h3 class="text-2xl">{{this.$store.state.focusedBook.title}}</h3>
                        <button class="border border-blue-500 hover:bg-blue-700 hover:text-white text-blue-500 font-bold py-2 px-2 rounded" :class="this.$store.state.focusedBook.isCurrent ? 'bg-blue-700 text-white' : ''">Current read</button>
                    </div>
                    <p class="mb-2">progress {{this.$store.state.focusedBook.pagesRead + '/' + this.$store.state.focusedBook.pagesTotal}}</p>
                    <div class="flex">
                        <progress-bar :progress="Math.round(this.$store.state.focusedBook.pagesRead/this.$store.state.focusedBook.pagesTotal*100)"></progress-bar>
                        <!-- <input id="to" v-model="pagesRead" type="number" :max="maxPages" class="appearance-none bg-transparent border-b border-teal-500 w-4/6 text-gray-700 mr-5 px-2 leading-tight focus:outline-none focus:border-green-700" placeholder="pages read" aria-label="Full name">
                        <button class="border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-bold mr-2 py-2 px-4 rounded flex-initial">update reach</button> -->
                    </div>
                    <comments-item :comments="this.$store.state.focusedBook.comments" @deleteComment="deleteComment($event)"></comments-item>
                </div>
            </div>
            <div class="books-in-progress w-1/3 ml-2">
                <table-component :tableType="'recent-books'" :tableData="this.$store.state.recentBooksArr">
                </table-component>
            </div>
        </section>
        </div>
    </article>
</template>

<script>
import tableComponent from '../table/table.component.vue';
import progressBar from './progress-bar/progress-bar.component.vue';
import commentsItem from './comments-item/comments-item.component.vue';

export default {
    name: 'dashboard',
    components: { tableComponent, progressBar, commentsItem },
    data:()=>({
        pagesRead: 0,
        maxPages: 0
    }),
    created(){
        this.$store.dispatch('fetchBooks');
    },
    mounted(){
        // this.pagesRead = this.$store.state.currentBook.pagesRead;
        // this.maxPages = this.$store.state.currentBook.pagesTotal
    }

}
</script>

<style>

</style>