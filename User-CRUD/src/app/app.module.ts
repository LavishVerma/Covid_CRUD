import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from './Dialog/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ViewUsersComponent,
    HeaderComponent,
    DeleteDialogComponent,
  ],
  entryComponents:[DeleteDialogComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatTooltipModule,
    MatDialogModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
