<template>
    <k-progress class="w-5/6" :percent="progress" :line-height="20"></k-progress>
</template>

<script>
import KProgress from 'k-progress-v3';
export default {
    name:'progress bar',
    components:{KProgress},
    props:['progress'],

}
</script>

<style>

</style>