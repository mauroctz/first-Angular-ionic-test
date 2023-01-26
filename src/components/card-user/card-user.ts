import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../../interfaces/User";

/**
 * Generated class for the CardUserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "card-user",
  templateUrl: "card-user.html",
})
export class CardUserComponent {
  @Input() user: User;

  @Output() openModalEvent: EventEmitter<User> = new EventEmitter<User>();

  getFullName(): string {
    return `${this.user.first_name} ${this.user.last_name}`;
  }

  openModal() {
    this.openModalEvent.emit({ ...this.user });
  }
}
