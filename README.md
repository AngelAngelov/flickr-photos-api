# flickr-feed

This a single page PWA, built with vue-cli and workbox. 

Contains two routs: 
1. Home - displays lates photoes uploaded on flickr

2. Search - Options to search flickr photos by name, description and tags.

Cache strategies: 
  - Static files (.html, .js, .css, .png, .jpg, .ico) - Cache first
  - CDN libraries - Cache first
  - API calls - Network first

Application supports offline mode, when build for production

Live example https://flickr-api-photos.herokuapp.com

## Project setup

Project requires vue-cli to be installed - version 3.3.0 is used.
Run: 

```
npm install -g @vue/cli@3.3.0
```

Run:

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests

#### IMPORTANT: pwa config in vue.config.js need to be commented to run the e2e test. PWA setup breacks the dev server setup for the e2e tests.

```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
