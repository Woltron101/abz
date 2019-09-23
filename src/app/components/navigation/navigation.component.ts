import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {
  private isActive: boolean = false;
  constructor() {}
  toggleMenu() {
    this.isActive = !this.isActive;
  }
}
