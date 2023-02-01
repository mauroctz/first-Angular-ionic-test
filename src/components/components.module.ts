import { NgModule } from "@angular/core";
import { CardUserComponent } from "./card-user/card-user";
import { PaginationComponent } from "./pagination/pagination";
import { NavbarComponent } from "./navbar/navbar";
import { DonutChartComponent } from "./donut-chart/donut-chart";
@NgModule({
  declarations: [
    CardUserComponent,
    PaginationComponent,
    NavbarComponent,
    DonutChartComponent,
  ],
  imports: [],
  exports: [
    CardUserComponent,
    PaginationComponent,
    NavbarComponent,
    DonutChartComponent,
  ],
})
export class ComponentsModule {}
