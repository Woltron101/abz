import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-authorized-user",
  templateUrl: "./authorized-user.component.html",
  styleUrls: ["./authorized-user.component.scss"]
})
export class AuthorizedUserComponent implements OnInit {
  private user: object;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUser(1).subscribe(resp => (this.user = resp["user"]));
  }
}
