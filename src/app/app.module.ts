import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RegFormComponent } from "./components/reg-form/reg-form.component";
import { UsersComponent } from "./components/users/users.component";
import { HttpClientModule } from "@angular/common/http";
import { AngularSvgIconModule } from "angular-svg-icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthorizedUserComponent } from './components/authorized-user/authorized-user.component';

@NgModule({
  declarations: [AppComponent, RegFormComponent, UsersComponent, AuthorizedUserComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularSvgIconModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
