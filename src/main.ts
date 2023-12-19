import './assets/main.css'
import "v-calendar/style.css";


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from "v-calendar";

import App from './App.vue'
import router from './router'

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  console.log("ERROR", info);
  console.error(err);
}

app.use(createPinia());
app.use(router);
app.use(VCalendar, {});

app.mount('#app');


