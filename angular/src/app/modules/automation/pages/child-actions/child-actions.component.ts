import { Component, Input } from "@angular/core";

@Component({
  selector: "app-child-actions",
  templateUrl: "./child-actions.component.html",
  styleUrls: ["./child-actions.component.scss"],
})
export class ChildActionsComponent {
  @Input() selectedActionId: number;
  @Input() actions: any[]; // Replace any with your actual type

  cancel() {
    // Implement cancel logic here
  }

  reset() {
    // Implement reset logic here
  }

  save() {
    // Implement save logic here
  }
}
