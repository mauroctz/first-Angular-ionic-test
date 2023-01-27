import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoadingController, NavController } from "ionic-angular";
import { User } from "../../interfaces/User";
import { ModalController } from "ionic-angular";
import { ModalUserPage } from "../modal-user/modal-user";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  title: String = "Home";
  users: Array<User> = [];
  totalPages: number;
  currentPage: number = 1;
  loader: any;
  isError: boolean = false;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    this.presentLoading();
    this.getUsers();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
  async getUsers(page: number = 1) {
    try {
      const response = await this.http
        .get(`https://reqres.in/api/users?page=${page}`)
        .toPromise()
        .then((data) => data);

      this.users = response["data"];
      this.totalPages = response["total_pages"];
      this.currentPage = page;
      this.loader.dismiss();
    } catch (error) {
      this.loader.dismiss();
      this.isError = true;
      throw new Error(error);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.getUsers(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.getUsers(this.currentPage - 1);
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  openModal(user: User): void {
    const modal = this.modalCtrl.create(ModalUserPage, { ...user });
    modal.present();

    modal.onDidDismiss((user) => {
      if (user) {
        this.users = this.users.map((u) => {
          if (u.id === user.id) {
            return {
              ...u,
              first_name: user.first_name,
              last_name: user.last_name,
            };
          }
          return { ...u };
        });
      }
    });
  }
}
