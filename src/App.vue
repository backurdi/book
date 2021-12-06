<template>
  <div>
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
.nav-is-showing {
  overflow: hidden;
}
#app {
  font-family: "Montserrat";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  color: #fff;
}
button:disabled {
  background-color: rgb(160, 172, 187);
  color: rgb(131, 141, 153);
  border: 1px solid #2c3e50;
}
</style>
