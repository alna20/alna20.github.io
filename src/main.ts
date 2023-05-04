import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import VueGoogleMaps from "@fawmi/vue-google-maps";

// import "./assets/main.css";
const pinia = createPinia();
createApp(App)
    .use(router)
    .use(pinia)
    .use(VueGoogleMaps, {
        load: {
            key: "AIzaSyACi2Bwp6wQTktwsSD2kD8nOGK4knD8Amg",
            libraries: "places",
        },
    })
    .mount("#app");
