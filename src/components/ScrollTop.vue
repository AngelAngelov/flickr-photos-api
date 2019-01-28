<template>
  <div class="scrolltop" v-if="showScrollTopBtn">
    <div class="scroll icon" @click="scrollToTop">
      <i class="fa fa-3x fa-angle-up"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showScrollTopBtn: false
    };
  },
  methods: {
    scrollToTop() {
      $('html,body').animate({ scrollTop: $('#app').offset().top }, '1000');
    }
  },
  mounted: function() {
    let that = this;
    window.addEventListener('scroll', () => {
      //chech is we have reached bottom of the page to load next items
      if (window.scrollY > 300) {
        that.showScrollTopBtn = true;
      } else {
        that.showScrollTopBtn = false;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.scrolltop {
  width: 100%;
  margin: 0 auto;
  position: fixed;
  bottom: 20px;
  right: 10px;
}
.scroll {
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: #b2b2b2;
  background: rgba(178, 178, 178, 0.7);
  border-radius: 50%;
  padding: 10px;
  text-align: center;
  margin: 0 0 0 0;
  cursor: pointer;
  transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
}
.scroll:hover {
  background: rgba(178, 178, 178, 1);
  transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
}
.scroll:hover .fa {
  padding-top: -10px;
}
.scroll .fa {
  color: $b-green;
  width: 3rem;
  margin-top: -5px;
  margin-left: 1px;
  transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
}
</style>
