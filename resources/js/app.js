require('./bootstrap');

import router from './routes';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Index from './Index';
import moment from 'moment';

import StarRating from './shared/components/StarRating';
import FatalError from './shared/components/FatalError';
import Success from './shared/components/Success';
import ValidationErrors from './shared/components/ValidationErrors';
import storeDefinition from './store';

window.Vue = require('vue').default;

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter('fromNow', value => moment(value).fromNow());

Vue.component('StarRating', StarRating);
Vue.component('FatalError', FatalError);
Vue.component('Success', Success);
Vue.component('ValidationErrors', ValidationErrors);

const store = new Vuex.Store(storeDefinition);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        'index': Index
    },
    beforeCreate() {
        this.$store.dispatch("loadStoreState");
    }
});
