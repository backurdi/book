<template>
  <div class="flex justify-center">
    <div wire:loading class="z-50 overflow-hidden">
      <div class="loader mb-4 w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full ease-linear"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
