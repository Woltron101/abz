import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RegFormComponent } from "./components/reg-form/reg-form.component";
import { UsersComponent } from "./components/users/users.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, RegFormComponent, UsersComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
