import '@/assets/main.css'
import './assets/tailwind.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router.js'
// import { createAuth0 } from '@auth0/auth0-vue';
// import { DOMAIN_NAME,CLIENTID, DEVELOP_REDIRECT_URI } from '@/constants';

const app = createApp(App)
// vue-routerとauto0プラグインを読み込む順番は本来なら逆にするべきだが、逆にすると、リダイレクト先がtop('/')になるため、取り敢えずこうしている。
//この状況でrouter.jsで beforeEnter: authGuard,すると無限ループになる。
// app.use(
//     createAuth0({
//       domain: DOMAIN_NAME,
//       clientId: CLIENTID,
//       authorizationParams: {
//         redirect_uri: DEVELOP_REDIRECT_URI
//       }
//     })
//   );
  app.use(router)
  app.mount('#app')
