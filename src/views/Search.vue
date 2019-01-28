<template>
  <div class="search col-md-6 col-sm-8 col-12 p-3">
    <h2 class="title text-center">Search photos</h2>
    <pics-search></pics-search>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
import PictureSearcher from '@/components/PicturesSearcher.vue';
import ScrollTop from '@/components/ScrollTop.vue';

export default {
  components: {
    'pics-search': PictureSearcher,
    'scroll-top': ScrollTop
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin: 0 auto;
  height: 100%;
  .search-input {
    border-radius: 18px;
  }
}

.title {
  text-shadow: 2px 2px #42b983;
  color: lightslategray;
  font-size: 300%;
}
</style>

