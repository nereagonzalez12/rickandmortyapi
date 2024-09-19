import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharListComponent } from './components/char-list/char-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CharacterViewComponent } from './components/character-view/character-view.component';
import { PlumbusComponent } from './pages/plumbus/plumbus.component';

@NgModule({
  declarations: [
    AppComponent,
    CharListComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CharacterViewComponent,
    PlumbusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
