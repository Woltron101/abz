import { Component, OnInit } from "@angular/core";
import { ApiService, User } from "src/app/services/api.service";

@Component({
  selector: "app-authorized-user",
  templateUrl: "./authorized-user.component.html",
  styleUrls: ["./authorized-user.component.scss"]
})
export class AuthorizedUserComponent implements OnInit {
  user: User;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUser(1).subscribe(resp => {
      this.user = resp["user"];
      console.log("autorized user ", resp["user"]);
    });
  }
}
