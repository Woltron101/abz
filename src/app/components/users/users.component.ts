import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  private users: User[];
  private page: number = 1;
  private disabledBtn: boolean = false;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUsers(this.page || 1).subscribe((resp: any) => {
      this.users = resp["users"];
    });
  }

  private showMore(): void {
    this.api.getUsers(++this.page).subscribe((resp: any) => {
      console.log("this.users ", this.users);
      this.users.push(...resp["users"]);
      this.users = this.users.sort(function(a, b) {
        return b.registration_timestamp - a.registration_timestamp;
      });
      if (resp.total_users === this.users.length) this.disabledBtn = true;
    });
  }
}
export interface User {
  email: string;
  id: string | number;
  name: string;
  phone: string;
  photo: string;
  position: string;
  position_id?: string | number;
  registration_timestamp?: number;
}
