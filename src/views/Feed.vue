<template>
  <div class="home-contentflex-col flex-grow mx-auto w-full md:w-7/12 lg:px-16">
    <add-post-popup></add-post-popup>
    <club-feed :posts="posts" :books="books"></club-feed>
  </div>
</template>

<script>
import AddPostPopup from "@/components/shared/add-post-popup.vue";
import ClubFeed from "@/components/shared/club-feed.vue";
import { mapState } from "vuex";
export default {
  name: "feed-item",
  components: { ClubFeed, AddPostPopup },
  computed: {
    ...mapState("postStore", ["posts"]),
    ...mapState("bookStore", ["books"]),
  },
};
</script>

<style></style>
