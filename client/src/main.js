import "bootswatch/flatly/bootstrap.min.css";
import "bootstrap";

import Vue from "vue";
import App from "./App.vue";
import Login from "./Login.vue";
import VueResource from "vue-resource";
import { store } from "./store/store";

Vue.use(VueResource);

new Vue({
    el: "#app",
    store: store,
    render: h => h(App)
});

new Vue({
    el: "#login",
    render: h => h(Login)
});
