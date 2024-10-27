import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'; // Import your Vue Router configuration
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css'; // Import the CSS globally
import store from './store/Store.js'
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import your custom components
const app= createApp(App)
app.use(router);

// Get the stored data from local storage
const storedData = localStorage.getItem('gamexStorageUnit');
if (storedData) {
  store.replaceState(JSON.parse(storedData));
}
app.use(store)
app.config.globalProperties.$swal = Swal;


// Mount the app to the #app div in index.html
app.mount('#app');

// Initialize AOS
AOS.init({
    duration: 1000, // duration of the animation in milliseconds
    once: true, // whether animation should happen only once - while scrolling down
  });
