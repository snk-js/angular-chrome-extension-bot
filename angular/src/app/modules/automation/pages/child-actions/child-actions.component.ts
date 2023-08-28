import { Component, EventEmitter, Input, Output } from "@angular/core";
@Component({
  selector: "app-child-actions",
  templateUrl: "./child-actions.component.html",
  styleUrls: ["./child-actions.component.scss"],
})
export class ChildActionsComponent {
  @Input() selectedActionId: number;
  @Input() actions: any[]; // Replace any with your actual type
  @Output() resetActionId = new EventEmitter<void>();

  @Output() saveAction = new EventEmitter<any>(); // Replace any with your actual type

  cancel() {
    this.resetActionId.emit(); // Emit event to parent to reset selectedActionId
  }

  reset() {
    // Implement reset logic here
  }

  save() {
    const savedAction = {
      /* Your saved action data */
    };
    this.saveAction.emit(savedAction); // Emit saved action to parent
  }
}
