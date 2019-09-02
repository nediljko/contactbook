import App from './App';
import router from './router';
import Vue from 'vue';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
