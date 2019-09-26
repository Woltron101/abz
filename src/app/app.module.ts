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
import { AuthorizedUserComponent } from "./components/authorized-user/authorized-user.component";
import { ReadMoreComponent } from "./components/read-more/read-more.component";
import { NgxMaskModule } from "ngx-mask";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { IconComponent } from "./components/icon/icon.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    RegFormComponent,
    UsersComponent,
    AuthorizedUserComponent,
    ReadMoreComponent,
    NavigationComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularSvgIconModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
