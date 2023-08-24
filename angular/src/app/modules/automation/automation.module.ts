import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AutomationComponent } from "./pages/popup/automation.component";
import { AutomationRoutingModule } from "./automation-routing.module";

@NgModule({
  declarations: [AutomationComponent],
  imports: [CommonModule, AutomationRoutingModule],
})
export class AutomationModule {}
