import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root2",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    if (!window.location.hash) {
      this.router.navigate(["/automation"]);
    }
  }
}
