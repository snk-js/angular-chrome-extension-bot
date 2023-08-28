import { Component, EventEmitter, Input, Output } from "@angular/core";
@Component({
  selector: "app-child-actions",
  templateUrl: "./child-actions.component.html",
  styleUrls: ["./child-actions.component.scss"],
})
export class ChildActionsComponent {
  @Input() selectedActionId: number;
  @Input() actions: any[];
  @Output() resetActionId = new EventEmitter<void>();

  @Output() saveAction = new EventEmitter<any>();

  cancel() {
    this.resetActionId.emit();
  }

  save() {
    const savedAction = {};
    this.saveAction.emit(savedAction);
  }
}
