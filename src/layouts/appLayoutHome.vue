<template>
  <div>
    <header class="header" />
    <AppLayoutLinks class="pb-10" />
    <slot />
  </div>
</template>

<script>
import AppLayoutLinks from "./appLayoutLinks.vue";

export default {
  name: "AppLayoutHome",
  components: {
    AppLayoutLinks,
  },
};
</script>

<style scoped></style>
