import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // Asegúrate de importar AppComponent
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AppComponent], // Declare AppComponent in the module
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule  // Add CommonModule here if needed
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

