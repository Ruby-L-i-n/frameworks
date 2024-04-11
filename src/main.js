import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import './assets/main.css'
import 'toastr/build/toastr.min.css';

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import { defineStore } from 'pinia'; 

const app = createApp(App)
app
  .use(createPinia())
  .use(createVuetify({
    components,
    directives
  }))
  .mount('#app');

  export const useToastrStore = defineStore('toastr', {
    state: () => ({
      messages: []
    }),
    actions: {
      addMessage(message) {
        this.messages.push(message)
      },
      clearMessages() {
        this.messages = []
      }
    }
  })
  