<template>
  <div>
    <!-- Top boks, profile and club selector -->
    <div class="site-nav-top">
      <!-- Top part -->
      <div>
        <!-- Profile picture -->
        <!-- Notification for invites -->
      </div>
      <!-- Select club part -->
      <div>
        <ClubList></ClubList>
      </div>
    </div>
    <!-- Bottom boks, books and memeber in selected club -->
    <div class="site-nav-bottom"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClubList from "./club-list/ClubList.vue";
export default {
  name: "Side nav",
  components: {
    ClubList,
  },
  computed: {
    ...mapState(""),
  },
};
</script>

<style></style>
