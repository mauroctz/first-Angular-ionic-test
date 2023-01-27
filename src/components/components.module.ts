import { NgModule } from "@angular/core";
import { CardUserComponent } from "./card-user/card-user";
import { PaginationComponent } from "./pagination/pagination";
import { NavbarComponent } from "./navbar/navbar";
@NgModule({
  declarations: [CardUserComponent, PaginationComponent, NavbarComponent],
  imports: [],
  exports: [CardUserComponent, PaginationComponent, NavbarComponent],
})
export class ComponentsModule {}
