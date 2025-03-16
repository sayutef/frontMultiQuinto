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
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Permiso concedido para recibir notificaciones');
        this.getToken();
      } else {
        console.error('Permiso denegado para recibir notificaciones');
      }
    }).catch(err => {
      console.error('Error al solicitar permiso para notificaciones', err);
    });
  }

  private getToken() {
    getToken(this.messaging, { vapidKey: environment.firebaseConfig.vapidKey }).then((token) => {
      if (token) {
        console.log('Token de FCM recibido:', token);
      } else {
        console.error('No se pudo obtener el token de FCM');
      }
    }).catch(err => {
      console.error('Error al obtener el token:', err);
    });
  }
}
