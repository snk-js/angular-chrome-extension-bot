import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutomationComponent } from "./pages/popup/automation.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AutomationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {}
