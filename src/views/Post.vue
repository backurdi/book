<template>
  <div class="home-contentflex-col flex-grow mx-auto w-full md:w-7/12 lg:px-16">
    <club-feed :posts="filterPosts()" :books="books"></club-feed>
  </div>
</template>

<script>
import clubFeed from "@/components/shared/club-feed.vue";
import { mapState } from "vuex";
export default {
  components: { clubFeed },
  computed: {
    ...mapState("postStore", ["posts"]),
    ...mapState("bookStore", ["books"]),
  },
  methods: {
    filterPosts() {
      if (Array.isArray(this.posts)) {
        return this.posts.filter((post) => post._id === this.$router.currentRoute._value.params.postId);
      }
      return this.posts;
    },
  },
};
</script>

<style></style>
ClubFeedComponent
