<template>
  <div class="col-lg-4 col-md-6 col-sm-8 col-12 p-3 feed-wrapper">
    <h2 class="title text-center mb-3">Latest photos on Flickr</h2>
    <feed-loader class="feed"></feed-loader>
  </div>
</template>

<script>
// @ is an alias to /src
import FeedLoader from '@/components/FeedLoader.vue';

export default {
  name: 'home',
  components: {
    'feed-loader': FeedLoader
  }
};
</script>

<style lang="scss" scoped >
.feed-wrapper {
  margin: 0 auto;
  padding: 0;
}
</style>

