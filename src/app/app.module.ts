import {NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {EmployeeComponent } from './employee/employee.component';
import {EmployeeService } from './employee.service';  
import {FormsModule, ReactiveFormsModule } from '@angular/forms';  
import {HttpClientModule, HttpClient } from '@angular/common/http';
import {MatRadioModule } from '@angular/material/radio';  
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatRadioModule,
    MatButtonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [HttpClientModule, EmployeeService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
