<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import { shallowRef } from "vue";
import AppLayoutDefault from "./appLayoutDefault.vue";
import appLayoutHome from "./appLayoutHome.vue";

export default {
  name: "AppLayout",
  data: () => ({
    layout: shallowRef(AppLayoutDefault),
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = route.meta.layout === "appLayoutHome" ? appLayoutHome : "";
          this.layout = component || AppLayoutDefault;
        } catch (e) {
          this.layout = AppLayoutDefault;
        }
      },
    },
  },
};
</script>
