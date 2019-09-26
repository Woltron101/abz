import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService, User } from "src/app/services/api.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: User[];
  page: number = 1;
  disabledBtn: boolean = false;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api
      .getUsers(this.page || 1, window.innerWidth < 480)
      .subscribe((resp: any) => {
        this.users = resp["users"];
        console.log("resp['users'] ", resp["users"]);
      });
    this.api.$postUser.subscribe(id => {
      this.api.getUser(id).subscribe(user => {
        this.users.unshift(user.user);
        this.users.pop();
      });
    });
  }

  showMore(): void {
    this.api
      .getUsers(++this.page, window.innerWidth < 480)
      .subscribe((resp: any) => {
        console.log("this.users ", this.users);
        this.users.push(...resp["users"]);
        this.users = this.users.sort(function(a, b) {
          return b.registration_timestamp - a.registration_timestamp;
        });
        if (resp.total_users === this.users.length) this.disabledBtn = true;
      });
  }
}
