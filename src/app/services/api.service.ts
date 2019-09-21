import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: "root"
})
export class ApiService {
  private apiUrl: string =
    "https://frontend-test-assignment-api.abz.agency/api/v1/";
  private token: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  public getUsers(page: number) {
    return this.http.get(this.apiUrl + `users?page=${page}&count=6`, {
      headers: this.headers
    });
  }

  public getUser(num: number) {
    return this.http.get(this.apiUrl + "users/" + num);
  }

  public postUser(data) {
    this.http
      .post(this.apiUrl + "users", data, { headers: this.headers })
      .subscribe(resp => console.log(resp));
  }

  private getToken() {
    this.http.get(this.apiUrl + "token").subscribe(resp => {
      this.token = resp["token"];
      console.log("this.token ", this.token);
      this.headers = new HttpHeaders()
        .set("Token", resp["token"])
        .delete("Content-Type");
    });
  }
  public getPositions() {
    return this.http.get(this.apiUrl + "positions");
  }
}
