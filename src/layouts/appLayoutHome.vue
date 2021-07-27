<template>
  <div>
    <header class="header" />
    <AppLayoutLinks class="pb-10" />
    <slot />
  </div>
</template>

<script>
import AppLayoutLinks from '@/layouts/appLayoutLinks'
export default {
  name: "AppLayoutHome",
  components: {
    AppLayoutLinks
  }
}
</script>

<style scoped>

</style>