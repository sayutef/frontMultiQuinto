importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBQxpmSfCAH__TDi61CeQ2LPcODoL8nYsE",
    authDomain: "warmheart-9560e.firebaseapp.com",
    projectId: "warmheart-9560e",
    storageBucket: "warmheart-9560e.firebasestorage.app",
    messagingSenderId: "877458499976",
    appId: "1:877458499976:web:cc27b2f9595fc0775d723d",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
