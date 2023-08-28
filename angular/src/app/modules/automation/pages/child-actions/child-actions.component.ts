import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Action } from "../actions/actions";
@Component({
  selector: "app-child-actions",
  templateUrl: "./child-actions.component.html",
  styleUrls: ["./child-actions.component.scss"],
})
export class ChildActionsComponent {
  @Input() selectedActionId: number;
  @Input() actions: Action[];
  @Output() clear = new EventEmitter<void>();

  @Output() saveAction = new EventEmitter<any>();

  cancel() {
    this.clear.emit();
  }

  save() {
    this.saveAction.emit();
  }
}
