// ============================================================
// ВАЖНО: Замени эти значения на свои из Firebase Console!
// Инструкция в README.md
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyCdYfL_Ifl_AzVVYNT_opjRUbF6ln2NehI",
  authDomain: "rebikchat.firebaseapp.com",
  databaseURL: "https://rebikchat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rebikchat",
  storageBucket: "rebikchat.firebasestorage.app",
  messagingSenderId: "683445862533",
  appId: "1:683445862533:web:100a45ca6d425e0fd0e9ec"
};

// Имя администратора (твой логин)
const ADMIN_USERNAME = "Rebik";

// Инициализация Firebase
firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const db = firebase.database();

// Утилиты
const utils = {
  formatTime(timestamp) {
    const d = new Date(timestamp);
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
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
