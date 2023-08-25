import { Component, Inject } from "@angular/core";
// import { bindCallback } from "rxjs";
// import { map } from "rxjs/operators";
import { TAB_ID } from "../../../../providers/tab-id.provider";

class Square {
  icon: string;
  title: string;
  description: string;

  constructor(icon: string, title: string, description: string) {
    this.icon = icon;
    this.title = title;
    this.description = description;
  }
}

const buildSquares = () => {
  const squaresConfig = [
    ["☝️", "Click Button", "Clicks a button on the page"],
    ["🔌", "Input Button", "Select an Input in the page"],
    ["💾", "Store Data", "Select an Element on the Page"],
    ["❔", "If Condition", "Add a condition to Run Actions Based On It"],
    ["➰", "For Loop", "Select Multiple Elements On The Page"],
  ];

  return squaresConfig.map((config) => {
    return new Square(config[0], config[1], config[2]);
  });
};

@Component({
  selector: "app-automation",
  templateUrl: "automation.component.html",
  styleUrls: ["automation.component.scss"],
})
export class AutomationComponent {
  message: string;
  squares = buildSquares();

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  ngOnInit() {
    // Send a message to the parent frame to attach an event listener
    window.parent.postMessage({ type: "attachEventListener" }, "*");
  }

  ngOnDestroy() {
    // Cleanup
    window.removeEventListener("message", this.handleMessageFromParent);
  }

  handleMouseOver(event: MouseEvent) {
    const element = event.target as HTMLElement;
    // Send a message to the parent frame
    window.parent.postMessage({ type: "hover", element: element.tagName }, "*");
  }

  handleMessageFromParent(event: MessageEvent) {
    if (event.origin !== window.location.origin) return;

    // Do something with the data
    console.log("Message from parent:", event.data);
  }
}
