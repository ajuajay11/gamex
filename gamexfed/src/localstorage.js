import VuexPersistence from 'vuex-persist';

const LOCAL_STORAGE_VERSION = '1.0.0';
const STORAGE_KEY_VERSION = 'gamex_version';
const STORAGE_KEY_DATA = 'gamexStorageUnit';

// Check the stored version and update if necessary
const checkAndUpdateVersion = () => {
  const storedVersion = localStorage.getItem(STORAGE_KEY_VERSION);
  if (storedVersion !== LOCAL_STORAGE_VERSION) {
    localStorage.clear();
    localStorage.setItem(STORAGE_KEY_VERSION, LOCAL_STORAGE_VERSION);
    console.log('LocalStorage version updated to:', LOCAL_STORAGE_VERSION);
  } else {
    console.log('LocalStorage version is up-to-date:', LOCAL_STORAGE_VERSION);
  }
};

checkAndUpdateVersion();

export const vuexLocal = new VuexPersistence({
  key: STORAGE_KEY_DATA,
  storage: window.localStorage,
});