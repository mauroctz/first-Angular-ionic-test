import { NgModule } from '@angular/core';
import { CardUserComponent } from './card-user/card-user';
import { PaginationComponent } from './pagination/pagination';
@NgModule({
	declarations: [CardUserComponent,
    PaginationComponent],
	imports: [],
	exports: [CardUserComponent,
    PaginationComponent]
})
export class ComponentsModule {}
