import { Component, Inject } from "@angular/core";
// import { bindCallback } from "rxjs";
// import { map } from "rxjs/operators";
import { TAB_ID } from "../../../../providers/tab-id.provider";
import { ActionExtended, actions } from "./actions";

@Component({
  selector: "app-automation",
  templateUrl: "automation.component.html",
  styleUrls: ["automation.component.scss"],
})
export class AutomationComponent {
  message: string;
  actions = actions();
  selectedActionId: number = 0;
  selectedActionTitle: string = "";

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  ngOnInit() {
    this.sendMessageToContentScript({ type: "attachEventListener" });
  }

  selectAction(action: ActionExtended) {
    if (!action.available) return;
    this.selectedActionId = action.id;
    this.selectedActionTitle = action.title;
    if (this.selectedActionId === 5) {
      this.sendMessageToContentScript({ type: "enableSelecting" });
    }
  }

  backToActions() {
    this.selectedActionId = 0;
    this.selectedActionTitle = "";
    this.sendMessageToContentScript({ type: "disableSelecting" });
  }

  ngOnDestroy() {
    this.sendMessageToContentScript({ type: "detachEventListener" });
  }

  handleMouseOver(event: MouseEvent) {
    const element = event.target as HTMLElement;
    this.sendMessageToContentScript({
      type: "hover",
      element: element.tagName,
    });
  }

  resetSelectedActionId() {
    this.backToActions();
  }

  // Method to handle save
  saveLinkedAction(action) {}

  private sendMessageToContentScript(message: any) {
    window.parent.postMessage(message, window.location.ancestorOrigins[0]);
  }
}
