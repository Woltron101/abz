import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private apiUrl: string =
    "https://frontend-test-assignment-api.abz.agency/api/v1/";
  private token: string;
  private headers: HttpHeaders;
  public $postUser = new Subject<number>();

  constructor(private http: HttpClient) {
    this.getToken();

    this.$postUser.subscribe({
      next: v => console.log(`observerA: ${v}`)
    });
  }

  public getUsers(page: number, phoneScreen?: boolean): Observable<any> {
    return this.http.get(
      this.apiUrl + `users?page=${page}&count=${phoneScreen ? "3" : "6"}`,
      {
        headers: this.headers
      }
    );
  }

  public getUser(num: number): Observable<any> {
    return this.http.get(this.apiUrl + "users/" + num);
  }

  public postUser(data): Observable<any> {
    return this.http
      .post(this.apiUrl + "users", data, { headers: this.headers })
      .pipe(map(resp => this.$postUser.next(resp["user_id"])));
  }

  private getToken(): void {
    this.http.get(this.apiUrl + "token").subscribe(resp => {
      this.token = resp["token"];
      console.log("this.token ", this.token);
      this.headers = new HttpHeaders({
        Token: resp["token"]
      });
    });
  }
  public getPositions(): Observable<any> {
    return this.http.get(this.apiUrl + "positions");
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
export interface Position {
  id: string;
  name: string;
}
