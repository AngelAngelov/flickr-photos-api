<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">Flickr photos</a>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/search">Search</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style lang="scss">
@import './styles/colors';
@import './styles/global.scss';

#app {
  color: $text-primary-color;
  padding-top: 56px;
  #nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    a {
      font-weight: bold;
      &.router-link-exact-active {
        color: $b-green;
      }
    }
  }
}
</style>
