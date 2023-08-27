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
@Component({
  selector: "app-automation",
  templateUrl: "automation.component.html",
  styleUrls: ["automation.component.scss"],
})
export class AutomationComponent {
  message: string;
  actions = buildActions();
  selectedActionId: number = 0;

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  ngOnInit() {
    window.addEventListener("message", this.handleMessageFromParent.bind(this));
    this.sendMessageToContentScript({ type: "attachEventListener" });
  }

  selectAction(action: Action) {
    if (!action.available) return;
    this.selectedActionId = action.id;
    if (this.selectedActionId === 5) {
      this.sendMessageToContentScript({ type: "enableSelecting" });
    }
  }

  backToActions() {
    this.selectedActionId = 0;
    this.sendMessageToContentScript({ type: "disableSelecting" });
  }

  ngOnDestroy() {
    window.removeEventListener(
      "message",
      this.handleMessageFromParent.bind(this)
    );
    this.sendMessageToContentScript({ type: "detachEventListener" });
  }

  handleMouseOver(event: MouseEvent) {
    const element = event.target as HTMLElement;
    this.sendMessageToContentScript({
      type: "hover",
      element: element.tagName,
    });
  }

  handleMessageFromParent(event: MessageEvent) {
    if (event.origin !== window.location.origin) return;
    console.log("Message from parent:", event.data);
  }

  private sendMessageToContentScript(message: any) {
    // Use Chrome Extension message-passing API
    chrome.tabs.sendMessage(this.tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      console.log("Response from content script:", response);
    });
  }
}
