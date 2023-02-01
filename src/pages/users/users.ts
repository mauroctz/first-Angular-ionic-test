import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { User } from "../../interfaces/Api";

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-users",
  templateUrl: "users.html",
})
export class UsersPage {
  title: String = "All users";
  _users: Array<User> = [];
  constructor(public navCtrl: NavController, public http: HttpClient) {}

  ngOnInit() {
    this.getAllUsers();
  }

  get users() {
    return this._users;
  }

  set users(_users: Array<User>) {
    this._users = _users;
    this.usersChanges();
  }

  usersChanges() {
    console.log(this.users);
  }

  async getAllUsers(page: number = 1) {
    try {
      const response = await this.http
        .get(`https://reqres.in/api/users?page=${page}`)
        .toPromise()
        .then((data) => data);
      this.users = [...this.users, ...response["data"]];

      if (page < response["total_pages"]) this.getAllUsers(page + 1);
    } catch (error) {
      throw new Error(error);
    }
  }
  ordina(): void {
    this.users.sort((a, b) => {
      return a.first_name < b.first_name
        ? -1
        : a.first_name > b.first_name
        ? 1
        : 0;
    });
  }
}
