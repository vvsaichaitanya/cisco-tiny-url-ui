import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Server } from './shared/server';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [Server],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
