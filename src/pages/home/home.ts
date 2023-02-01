import { ApiData } from "../../interfaces/Api";
import { Component, Injectable } from "@angular/core";
import { Loading, LoadingController, NavController } from "ionic-angular";
import { User } from "../../interfaces/Api";
import { ModalController } from "ionic-angular";
import { ModalUserPage } from "../modal-user/modal-user";
import { ApiService } from "../../services/api.service";

@Injectable()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  title: String = "Home";
  users: Array<User> = [];
  totalPages: number;
  currentPage: number = 1;
  loader: Loading;
  isError: boolean = false;
  apiResponse: ApiData;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public api: ApiService
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
    this.loader.present();
    const response = await this.api.getUsersByPage(page).then((data) => {
      this.loader.dismiss();
      return data;
    });
    console.log("response", response);
    this.users = response.data;
    this.totalPages = response.total_pages;
    this.currentPage = page;
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
              last_name: user.last_name,
              first_name: user.first_name,
            };
          }
          return { ...u };
        });
        this.users = [...this.users];

        this.api.updateItemForage(
          {
            data: this.users,
            total_pages: this.totalPages,
            page: this.currentPage,
          },
          this.currentPage
        );
      }
    });
  }
}
