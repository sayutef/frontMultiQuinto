importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js');
// Configuración de Firebase. Aquí se incluyen las credenciales necesarias para conectar tu aplicación con Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyBQxpmSfCAH__TDi61CeQ2LPcODoL8nYsE",
    authDomain: "warmheart-9560e.firebaseapp.com",
    projectId: "warmheart-9560e",
    storageBucket: "warmheart-9560e.firebasestorage.app",
    messagingSenderId: "877458499976",
    appId: "1:877458499976:web:cc27b2f9595fc0775d723d",
};
// Inicializa la aplicación Firebase con la configuración proporcionada
firebase.initializeApp(firebaseConfig);
// Inicializa el servicio de mensajería de Firebase
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


/* Código adicional que se puede agregar mas adelante:

  - Si necesitas manejar el clic en la notificación y redirigir a una URL específica, podrías usar lo siguiente:
  self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Cierra la notificación
    // Redirige al usuario a una URL
    event.waitUntil(
      clients.openWindow('https://www.tu-pagina.com')
    );
  });

  - Si deseas registrar otros tipos de mensajes o realizar un seguimiento, puedes hacerlo dentro de este bloque.

*/