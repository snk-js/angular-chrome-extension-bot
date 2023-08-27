import { Component, Inject } from "@angular/core";
// import { bindCallback } from "rxjs";
// import { map } from "rxjs/operators";
import { TAB_ID } from "../../../../providers/tab-id.provider";

class Action {
  id: number;
  icon: string;
  title: string;
  description: string;
  // internal state
  available = true;

  constructor(icon: string, title: string, description: string, id: number) {
    if ([4, 3, 2, 1].includes(id)) {
      this.available = false;
    }
    this.id = id;
    this.icon = icon;
    this.title = title;
    this.description = description;
  }
}

const buildActions = () => {
  const squaresConfig = [
    ["☝️", "Click Button", "Clicks a button on the page"],
    ["🔌", "Input Button", "Select an Input in the page"],
    ["💾", "Store Data", "Select an Element on the Page"],
    ["❔", "If Condition", "Add a condition to Run Actions Based On It"],
    ["➰", "For Loop", "Select Multiple Elements On The Page"],
  ];

  return squaresConfig.map((config, i) => {
    return new Action(config[0], config[1], config[2], i + 1);
  });
};

@Component({
  selector: "app-automation",
  templateUrl: "automation.component.html",
  styleUrls: ["automation.component.scss"],
})
export class AutomationComponent {
  message: string;
  actions = buildActions();
  selectedActionId: number = 0;
  selectedActionTitle: string = "";

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  ngOnInit() {
    this.sendMessageToContentScript({ type: "attachEventListener" });
  }

  selectAction(action: Action) {
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

  private sendMessageToContentScript(message: any) {
    window.parent.postMessage(message, window.location.ancestorOrigins[0]);
  }
}
