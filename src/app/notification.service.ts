import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getMessaging, getToken, onMessage, Messaging } from '@angular/fire/messaging';

import { environment } from '../environments/environment';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messaging: Messaging; // Definir el tipo de messaging
  public swPush: SwPush; // Mantener la declaración de swPush

  constructor(swPush: SwPush) {
    this.swPush = swPush;
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app); // Inicializar el servicio de mensajería
    onMessage(this.messaging, (payload) => {
      if (payload.notification) {
        console.log('Notificación recibida:', payload);
        alert(`${payload.notification.title}: ${payload.notification.body}`);
      } else {
        console.warn('Mensaje sin notificación', payload);
      }
    });
  }

  requestPermission() {
     // Solicita permiso al usuario para mostrar notificaciones del navegador
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Si el usuario concede el permiso, se muestra un mensaje en la consola
        console.log('Permiso concedido para recibir notificaciones');

        // Se obtiene el token de FCM para poder recibir notificaciones push
        this.getToken();
      } else {
        // Si el usuario deniega el permiso, se muestra un mensaje de error
        console.error('Permiso denegado para recibir notificaciones');
      }
    }).catch(err => {
      // Captura y muestra cualquier error que ocurra al solicitar el permiso
      console.error('Error al solicitar permiso para notificaciones', err);
    });
  }

  private getToken() {
     // Solicita un token de mensajería FCM utilizando la clave VAPID de Firebase
    getToken(this.messaging, { vapidKey: environment.firebaseConfig.vapidKey }).then((token) => {
      if (token) {
        // Si se obtiene un token correctamente, lo muestra en la consola
        console.log('Token de FCM recibido:', token);
      } else {
         // Si no se obtiene un token, muestra un error en la consola
        console.error('No se pudo obtener el token de FCM');
      }
    }).catch(err => {
      // Captura y muestra cualquier error que ocurra al obtener el token
      console.error('Error al obtener el token:', err);
    });
  }
}
