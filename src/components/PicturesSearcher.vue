<template>
  <div class="search-wrapper">
    <div class="row mb-3">
      <div class="col-md-12 mb-3">
        <input type="text" class="form-control search-input" placeholder="full text search ..." v-model="text">
      </div>
      <div class="col-md-12 mb-3">
        <strong>And / Or</strong>
      </div>
      <div class="col-md-12">
        <input type="text" class="form-control search-input" placeholder="search pictures by tags ..." v-model="tags">
        <div class="w-100 mt-1 tags-warning pl-3">
          <i class="fa fa-exclamation-triangle"></i>
          multiple tags must be comma separated
        </div>
        <div class="mt-1" v-if="tags && tags.length">
          <toggle-button
            v-model="matchAllTags"
            :labels="{checked: 'Match all tags', unchecked: 'Match any tag'}"
            :color="{checked: '#42b983', unchecked: '#FF875B', disabled: '#FF875B'}"
            :width="110"
            :height="30"
          />
        </div>
      </div>
      <div class="col-md-12"></div>
    </div>
    <div class="results-wrapper">
      <div class="mb-3" v-if="showResults">
        <div>
          <strong>Results for:</strong>
          <div v-if="resultsForText">
            text:
            <span class="font-weight-bold text-green">{{resultsForText}}</span>
          </div>
          <div v-if="resultsForTags">
            tags:
            <span class="font-weight-bold text-green">{{resultsForTags}}</span>
          </div>
        </div>
        <div>
          <strong class="text-green">{{totalItems}}</strong> items found
        </div>
      </div>
      <feed-list :items="items"></feed-list>
      <loading v-if="isLoading"></loading>
      <div class="alert alert-primary" v-if="end">All results are loaded on screen</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ToggleButton from 'vue-js-toggle-button';
import FeedList from './FeedList.vue';
import loading from './Loading.vue';
import FeedItemModel from '../models/FeedItem';
import { api } from '../assets/constants';
import feedService from '../services/feed.service';
import { debounce } from 'lodash';
import urlService from '../services/url.service';

Vue.use(ToggleButton);

/*
 * Component for searching flickr images by tags
 * props:
 * text - user input for the searched string in title or description
 * tags - user input for the searched tags
 * items - current items displayed on screen
 * currentPage - parameter needed for calling flickr API
 * pageSize - parameter that represents items per page for flickr API
 * totalPages - the value is такен from flickr API call response and represents
 * total pages for current page size
 * isLoading - parameter that is used for toggle loading during requests
 * end - a flag that is put when the all 1000 item allowed from flickr feed api are loaded on the page
 * trigger - distance in px from bitton when the loading for the next page is triggered
 * totalItems - total items find in the search. Тhe value is такен from flickr API call response
 * showResults - a flag to toggle result rummary text
 */

export default {
  components: {
    'feed-list': FeedList,
    loading
  },
  data() {
    return {
      text: '',
      tags: '',
      matchAllTags: true,
      items: [],
      currentPage: 0,
      pageSize: api.defaultPageSize,
      totalPages: null,
      totalItems: 0,
      isLoading: false,
      showResults: false,
      end: false,
      trigger: 300,
      resultsForText: null,
      resultsForTags: null
    };
  },
  methods: {
    loadFeed() {
      if (this.currentPage === this.totalPages || (!this.text && !this.tags)) {
        return;
      }
      //show loading
      this.isLoading = true;

      const queryString = urlService.buildQueryString({
        text: this.text,
        tags: this.tags,
        matchAllTags: this.tags ? this.matchAllTags : null
      });

      urlService.fillBrowserHistory(queryString);

      feedService
        .searchTags(
          this.text,
          this.tags,
          this.matchAllTags,
          ++this.currentPage,
          this.pageSize
        )
        .then(response => {
          //hide loading
          this.isLoading = false;

          //if response status is ok process data
          if (response.data.stat === 'ok') {
            this.resultsForText = this.text;
            this.resultsForTags = this.tags;
            this.totalPages = response.data.photos.pages;
            this.totalItems = response.data.photos.total;
            this.showResults = true;

            response.data.photos.photo.forEach(element => {
              this.items.push(new FeedItemModel(element));
            });
          }
        });
    },
    scroll() {
      let that = this;

      window.onscroll = () => {
        //chech is we have reached bottom of the page to load next items
        if (
          !that.isLoading &&
          window.innerHeight + window.scrollY >=
            document.body.scrollHeight - that.trigger
        ) {
          if (that.currentPage < that.totalPages) {
            that.loadFeed();
          } else {
            that.end = true;
          }
        }
      };
    },
    debouncer() {},
    parseParams() {
      const params = urlService.parseParams();

      if (params) {
        this.text = params.text;
        this.tags = params.tags;
        this.matchAllTags = params.matchAllTags
          ? params.matchAllTags.toLowerCase() == 'true'
          : true;
      } else {
        this.text = null;
        this.tags = null;
        this.matchAllTags = true;
      }
    }
  },
  mounted: function() {
    this.parseParams();

    //add scroll listener for the infinite scroll
    this.scroll();

    //attach debounce function for user input
    //the function will be called 700ms after user stops typing
    this.debouncer = debounce(function() {
      this.items = [];
      this.showResults = false;
      this.totalPages = null;
      this.currentPage = 0;
      this.loadFeed();
    }, 700);
  },
  watch: {
    //listen for parameters change and call debounce function
    tags: function() {
      this.debouncer();
    },
    text: function() {
      this.debouncer();
    },
    matchAllTags: function() {
      this.debouncer();
    },
    //Vue reuses the component when the URI changes so we need to listen for that change and trigger params parsing
    $route(to, from) {
      this.parseParams();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.search-wrapper {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  .search-input {
    border-radius: 18px;
  }
  .tags-warning {
    font-size: 0.75rem;
    i {
      color: $b-green;
    }
  }
}

.text-green {
  color: $b-green;
}
</style>
