import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [NgFor, NgClass, CommonModule],  
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'firebase-app-angular';
  temperatura: number = 0;
  humedad: number = 0;
  isCollapsed = false;

  private firestore = inject(Firestore);

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.notificationService.requestPermission();
    this.notificationService.swPush.messages.subscribe((message: any) => {
      console.log('Mensaje recibido:', message);
      alert(message);
    });

    this.getUsuarios();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  getUsuarios() {
    const usuariosRef = collection(this.firestore, 'usuarios');
    getDocs(usuariosRef).then((snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      });
    }).catch((error) => {
      console.error('Error al obtener documentos de usuarios: ', error);
    });
  }

  altaUsuario() {
    const usuariosRef = collection(this.firestore, 'usuarios');
    addDoc(usuariosRef, {
      nombre: 'Juan',
      apellido: 'Perez',
      edad: 30
    }).then(() => {
      alert('Usuario agregado');
    }).catch((err: any) => {
      alert('Error al agregar usuario: ' + err);
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToSensors() {
    this.router.navigate(['/sensors']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  requestPermission() {
    console.log('Notificaciones activadas');
    this.notificationService.requestPermission();
    this.snackBar.open('Notificaciones activadas', 'Cerrar', {
      duration: 3000,
    });
  }
}
