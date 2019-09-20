import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  private apiUrl: string =
    "https://frontend-test-assignment-api.abz.agency/api/v1/";
  private users;
  private page: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(this.apiUrl + `users?page=${this.page}&count=6`)
      .subscribe((resp: any) => {
        this.users = resp["users"];
      });
  }
}
