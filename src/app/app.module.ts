import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { PetsComponent } from './pets/pets.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { AdoptionsComponent } from './adoptions/adoptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetDetailsComponent } from './pets/pet-details/pet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PetsComponent,
    SidebarComponent,
    AdoptionsComponent,
    PetDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
