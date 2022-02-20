<template>
  <div class="home-contentflex-col flex-grow mx-auto w-full md:w-7/12 lg:px-16">
    <add-post-popup></add-post-popup>
    <club-feed :posts="posts.filter((post) => post.club === activeClub._id)" :books="books"></club-feed>
    <div id="showMore" class="flex justify-center my-4" v-if="posts.length < postsCount">
      <p v-if="!loading">show more</p>
      <loading-spinner size="lg" color="reaflect" v-else></loading-spinner>
    </div>
  </div>
</template>

<script>
import AddPostPopup from "@/components/shared/add-post-popup.vue";
import ClubFeed from "@/components/shared/club-feed.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import LoadingSpinner from "@/components/shared/loading-spinner/loading-spinner.vue";
export default {
  name: "feed-item",
  components: { ClubFeed, AddPostPopup, LoadingSpinner },
  data: () => ({
    loading: false,
  }),
  mounted() {
    window.onscroll = async () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

      if (bottomOfWindow && !this.loading) {
        this.loading = true;
        await this.getPostsForClub(this.activeClub._id);
        this.loading = false;
      }
    };
  },
  computed: {
    ...mapState("postStore", ["posts", "postsCount"]),
    ...mapState("bookStore", ["books"]),
    ...mapState("clubStore", ["activeClub"]),
  },
  methods: {
    ...mapMutations("postStore", ["incrementPostPage"]),
    ...mapActions("postStore", ["getPostsForClub"]),
  },
};
</script>

<style></style>
