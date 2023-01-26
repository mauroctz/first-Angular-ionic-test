import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Generated class for the PaginationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "pagination",
  templateUrl: "pagination.html",
})
export class PaginationComponent {
  @Input() totalPages: number;
  @Input() isFirstPage: boolean;
  @Input() isLastPage: boolean;

  @Output() prevPageEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextPageEvent: EventEmitter<void> = new EventEmitter<void>();

  prevPage(): void {
    this.prevPageEvent.emit();
  }

  nextPage(): void {
    this.nextPageEvent.emit();
  }
}
