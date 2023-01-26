import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { User } from "../../interfaces/User";

/**
 * Generated class for the ModalUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-modal-user",
  templateUrl: "modal-user.html",
})
export class ModalUserPage {
  user: User;

  constructor(
    public params: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
    this.user = this.params.data;
  }

  updateUser() {
    this.viewCtrl.dismiss(this.user);
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }
}
