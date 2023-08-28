import { Component, Inject } from "@angular/core";
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
  hasSavedElements: boolean = false;
  actionConfigTitle: string = "";

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  ngOnInit() {
    this.sendMessageToContentScript({ type: "attachEventListener" });
  }

  selectAction(action: ActionExtended) {
    if (!action.available) return;

    if (this.hasSavedElements) {
      if (action.id === 1) {
        this.applyClickAction();
        this.backToActions();
        this.sendMessageToContentScript({ type: "unsaveElements" });
        this.actions = actions();
        return;
      }
      if (action.id === 2) {
        this.selectedActionTitle =
          this.selectedActionTitle +
          " / Select child action" +
          "/ " +
          action.title;
        this.selectedActionId = action.id;
        this.actionConfigTitle = "Type anything";
      }
    }

    this.selectedActionId = action.id;
    this.selectedActionTitle = action.title;
    if (this.selectedActionId === 5) {
      this.sendMessageToContentScript({ type: "enableSelecting" });
      this.actionConfigTitle = "Select at least 2 components";
    }
  }

  backToActions() {
    if (this.hasSavedElements) {
      this.selectedActionTitle =
        this.selectedActionTitle + " / Select child action";
    } else {
      this.selectedActionTitle = "";
    }
    this.sendMessageToContentScript({ type: "disableSelecting" });
    this.selectedActionId = 0;
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

  saveElements() {
    this.hasSavedElements = true;
    this.sendMessageToContentScript({ type: "saveElements" });

    const availableActions = this.actions.find(
      (action) => action.id === this.selectedActionId
    ).availableActions;

    this.actions.forEach((action) => {
      if (availableActions.includes(action.id)) {
        action.changeAvailability(true);
      } else {
        action.changeAvailability(false);
      }
    });

    this.backToActions();
  }

  back() {
    this.hasSavedElements = false;
    this.backToActions();
    this.actions = actions();
    this.sendMessageToContentScript({ type: "unsaveElements" });
  }

  inputElements(input: string) {
    this.hasSavedElements = false;
    this.backToActions();
    this.actions = actions();
    this.sendMessageToContentScript({ type: "inputElements", input });
  }

  applyClickAction() {
    this.hasSavedElements = false;
    this.sendMessageToContentScript({ type: "applyClickAction" });
  }

  private sendMessageToContentScript(message: any) {
    window.parent.postMessage(message, window.location.ancestorOrigins[0]);
  }
}
