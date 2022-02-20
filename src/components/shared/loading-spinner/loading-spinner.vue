<template>
  <span class="spinner">
    <svg class="spinner__svg" :width="width" :height="width" :viewBox="viewBox">
      <g :transform="transform">
        <circle
          :class="`${uniqClass} spinner__circle spinner__${color}`"
          :stroke-width="strokeWidth"
          :x="pos"
          :y="pos"
          :r="radius"
        />
      </g>
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "md",
      validator: (v) => ["sm", "md", "lg"].find((it) => it === v),
    },
    color: {
      type: String,
      default: "white",
      validator: (v) => ["white", "black", "reaflect"].find((it) => it === v),
    },
  },
  data() {
    return {
      sizes: { sm: 10, md: 20, lg: 80 },
    };
  },
  computed: {
    viewBox() {
      const ratio = 0.825 * this.sizes[this.size];
      return [0, 0, ratio, ratio].join(" ");
    },
    width() {
      return this.sizes[this.size] + "px";
    },
    transform() {
      const ratio = (0.825 * this.sizes[this.size]) / 2;
      return `translate(${ratio}, ${ratio})`;
    },
    pos() {
      return -0.125 * this.sizes[this.size];
    },
    radius() {
      return 0.25 * this.sizes[this.size];
    },
    strokeWidth() {
      const ratio = 0.05 * this.sizes[this.size];
      return ratio < 1 ? 1 : ratio;
    },
    uniqClass() {
      return "--" + this.size;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";
$spinner-stroke-dasharrays: (
  sm: 31,
  md: 62,
  lg: 125,
);
.spinner {
  &__svg {
    animation: 1.4s circle-rotate linear infinite;
  }
  &__circle {
    stroke-linecap: round;
    fill: none;
    @each $class, $size in $spinner-stroke-dasharrays {
      &.--#{$class} {
        stroke-dasharray: $size;
        animation: 5s circle-#{$class}-dash ease-in-out infinite, 5s circle-spin ease-in-out infinite;
      }
    }
  }
  .spinner__white {
    stroke: #fff;
  }
  .spinner__black {
    stroke: #000;
  }
  .spinner__reaflect {
    stroke: #48d0b0;
  }
}

@keyframes circle-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes circle-spin {
  12.5% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(240deg);
  }
  37.5% {
    transform: rotate(240deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(540deg);
  }
  75% {
    transform: rotate(780deg);
  }
  87.5% {
    transform: rotate(780deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}

@each $class, $size in $spinner-stroke-dasharrays {
  @keyframes circle-#{$class}-dash {
    0% {
      stroke-dashoffset: $size;
    }
    12.5% {
      stroke-dashoffset: math.div($size, 4);
    }
    25% {
      stroke-dashoffset: $size;
    }
    37.5% {
      stroke-dashoffset: math.div($size, 4);
    }
    50% {
      stroke-dashoffset: $size;
    }
    62.5% {
      stroke-dashoffset: math.div($size, 4);
    }
    75% {
      stroke-dashoffset: $size;
    }
    87.5% {
      stroke-dashoffset: math.div($size, 4);
    }
    100% {
      stroke-dashoffset: $size;
    }
  }
}
</style>
