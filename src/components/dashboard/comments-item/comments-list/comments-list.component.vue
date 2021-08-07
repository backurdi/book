/* eslint no-underscore-dangle: 0 */
<template>
  <div>
    <div class="flex flex-col mt-3 p-3 border rounded lg:flex-row">
      <div class="flex-auto self-center comment-text" v-html="domDecoder(comment.text)"></div>
      <div class="flex justify-between mt-5 lg:mt-0">
        <p class="flex-initial self-center mx-2">from: {{ comment.pagesFrom }}</p>
        <p class="flex-initial self-center mr-7 mx-2">to: {{ comment.pagesTo }}</p>
        <button
          class="flex-initial px-4 py-2 text-red-500 hover:text-white font-bold hover:bg-red-500 border border-red-500 rounded"
          @click="deleteComment()"
        >Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment list",
  props: ["comment"],
  methods: {
    deleteComment() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      this.$store.dispatch("deleteComment", this.comment._id);
    },
    domDecoder (str) {
      let parser = new DOMParser();
      let dom = parser.parseFromString('<!doctype html><body>' + str, 'text/html');
      console.log(dom.body.textContent);
      return dom.body.textContent;
    },
  },
};
</script>

<style lang="scss">
  .comment-text{
    h1{
      font-weight: 600;
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
    h2{
      font-size: 1.5rem;
      line-height: 2rem;
    }
    h3{
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
    h4{
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
    ol{
      list-style-type: decimal;

      li{
        margin-left: 30px;
      }
    }

    ul{
      list-style-type: disc;

      li{
        margin-left: 30px;
      }
    }
  }
</style>
