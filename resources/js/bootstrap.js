export default function init() {
    window._ = require("lodash");

    const axios = require("axios");

    window.axios = axios;

    window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}
