import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HearButtonComponent } from './hear-button/hear-button.component';
import { NoteTextComponent } from './note-text/note-text.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HearButtonComponent,
    NoteTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
