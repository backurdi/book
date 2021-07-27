<template>
    <div class="flex border p-3 rounded" :class="[ index === 0 ? '' : 'mt-3']" v-for="(recentBook, index) in tableData" :key="index">
        <img class="w-8 mr-4 border border-grey-400" :src="recentBook.image" alt="">
        <div class="w-4/6">
            <p>{{recentBook.title}}</p>
            <k-progress :percent="Math.round(recentBook.pagesRead/recentBook.pagesTotal*100)" :line-height="10" :color="colorBasedOnProgress(recentBook.read)"></k-progress>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded flex-initial self-center h-4/6" @click="changeFocusedBook(recentBook._id)">View</button>
    </div>
</template>

<script>
import KProgress from 'k-progress-v3';
export default {
    name:'recentBookTable',
    components:{KProgress},
    props:["tableData"],
    data:()=>({
        recentBooks:[],
    }),
    methods:{
        colorBasedOnProgress(progress){
            if(progress > 0 && progress <= 20){
                return '#ffcd3a'
            }else if(progress > 20 && progress <= 60){
                return '#357edd'
            }else{
                return '#19a974'
            }
        },
        changeFocusedBook(bookId){
            this.$store.commit('changeFocusedBook', bookId);
        }
    }
}
</script>

<style>

</style>