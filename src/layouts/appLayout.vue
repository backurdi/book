<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import { shallowRef} from 'vue'
import AppLayoutDefault from "./appLayoutDefault.vue";

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
          const component = await import(`@/layouts/${route.meta.layout}.vue`);
          this.layout = component?.default || AppLayoutDefault;
        } catch (e) {
          this.layout = AppLayoutDefault;
        }
      },
    },
  },
};
</script>
