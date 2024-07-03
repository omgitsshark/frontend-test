import Vue from "vue";
import App from "./views/app.vue";
import init from "./bootstrap";
import { store } from "./store";

init();

new Vue({
    el: "#app",
    components: { App },
    store,
});
