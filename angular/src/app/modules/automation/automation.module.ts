import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AutomationComponent } from "./pages/actions/automation.component";
import { AutomationRoutingModule } from "./automation-routing.module";
import { ChildActionsComponent } from "./pages/child-actions/child-actions.component";

@NgModule({
  declarations: [AutomationComponent, ChildActionsComponent],
  imports: [CommonModule, AutomationRoutingModule],
})
export class AutomationModule {}
