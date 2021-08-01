<template>
  <div>
    <recent-book-table-item
      v-if="tableType === 'recent-books'"
      :table-data="tableData"
      @changeFocusedBook="changeFocusedBook($event)"
    ></recent-book-table-item>
    <audio-book-table-item
      v-if="tableType === 'audio-books'"
      :table-data="tableData"
    ></audio-book-table-item>
    <book-table-item
      v-if="tableType === 'books'"
      :table-data="tableData"
    ></book-table-item>
  </div>
</template>

<script lang="ts">
import recentBookTableItem from "./table-items/recent-book-table-item.component.vue";
import bookTableItem from "./table-items/book-table-item.component.vue";
import audioBookTableItem from "./table-items/audio-book-table-item.component.vue";

export default {
  name: "Table",
  components: { recentBookTableItem, bookTableItem, audioBookTableItem },
  props: ["tableType", "tableData"],
};
</script>

<style></style>
