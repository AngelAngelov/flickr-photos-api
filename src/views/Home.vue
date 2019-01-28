<template>
  <div class="col-lg-4 col-md-6 col-sm-8 col-12 p-3 feed-wrapper">
    <h2 class="title text-center mb-3">Latest photos on Flickr</h2>
    <feed-loader class="feed"></feed-loader>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
// @ is an alias to /src
import FeedLoader from '@/components/FeedLoader.vue';
import ScrollTop from '@/components/ScrollTop.vue';

export default {
  name: 'home',
  components: {
    'feed-loader': FeedLoader,
    'scroll-top': ScrollTop
  }
};
</script>

<style lang="scss" scoped >
.feed-wrapper {
  margin: 0 auto;
  padding: 0;
  .title {
    text-shadow: 2px 2px #42b983;
    color: lightslategray;
    font-size: 300%;
  }
}
</style>

