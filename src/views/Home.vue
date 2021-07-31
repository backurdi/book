<template>
  <addBookPopup></addBookPopup>
  <dashboardComponent></dashboardComponent>
</template>

<script>
import dashboardComponent from "../components/dashboard/dashboard.component.vue";
import addBookPopup from "../components/add-book-popup/add-book-popup.component.vue";

export default {
  name: "Home",
  components: { dashboardComponent, addBookPopup },
};
</script>

<style></style>
