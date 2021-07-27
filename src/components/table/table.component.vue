<template>
    <div>
        <recent-book-table-item v-if="tableType==='recent-books'" :tableData="tableData" @changeFocusedBook="changeFocusedBook($event)"></recent-book-table-item>
        <audio-book-table-item v-if="tableType==='audio-books'" :tableData="tableData"></audio-book-table-item>
        <book-table-item v-if="tableType==='books'" :tableData="tableData"></book-table-item>
    </div>
</template>

<script lang="ts">
import recentBookTableItem from './table-items/recent-book-table-item.component.vue';
import bookTableItem from './table-items/book-table-item.component.vue';
import audioBookTableItem from './table-items/audio-book-table-item.component.vue';
export default {
    name:'table',
    components:{recentBookTableItem,bookTableItem,audioBookTableItem},
    props:['tableType', 'tableData'],
}
</script>

<style>

</style>