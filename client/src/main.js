import "bootswatch/flatly/bootstrap.min.css";
import "bootstrap";

import Vue from "vue";
import App from "./App.vue";
import Login from "./Login.vue";
import VueResource from "vue-resource";
import {store} from "./store/store";

if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/service-worker.js").then(function () {
        //console.log("Registration worked!");
    }).catch(function () {
        //console.log("Registration failed!");
    });
}

Vue.use(VueResource);

const routes = {
    "/": App,
    "/login": Login
};

console.log(routes[this.currentRoute]);

new Vue({
    el: "#app",
    store: store,
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            return routes[this.currentRoute] || routes["/"];
        }
    },
    render(h) {
        return h(this.ViewComponent)
    }
});
// new Vue({
//     el: "#login",
//     render: h => h(Login)
// });
