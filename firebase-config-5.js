const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCdYfL_Ifl_AzVVYNT_opjRUbF6ln2NehI",
  authDomain: "rebikchat.firebaseapp.com",
  databaseURL: "https://rebikchat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rebikchat",
  storageBucket: "rebikchat.firebasestorage.app",
  messagingSenderId: "683445862533",
  appId: "1:683445862533:web:100a45ca6d425e0fd0e9ec"
};

const ADMIN_USERNAME = "rebik";

try { firebase.initializeApp(FIREBASE_CONFIG); } catch(e) {}
const auth = firebase.auth();
const db = firebase.database();

const utils = {
  formatTime(timestamp) {
    const d = new Date(timestamp);
    return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
  },
  formatDate(timestamp) {
    const d = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Сегодня';
    if (d.toDateString() === yesterday.toDateString()) return 'Вчера';
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  },
  escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  },
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};
