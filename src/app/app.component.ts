import { Component, ViewChild } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { NavController } from "ionic-angular";

import { HomePage } from "../pages/home/home";
import { UsersPage } from "../pages/users/users";
@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild("content") nav: NavController;
  rootPage: any = HomePage;
  currentPage: any = HomePage;
  menuItems = [
    { title: "Home", component: HomePage },
    { title: "All Users", component: UsersPage },
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    if (this.currentPage !== page.component) {
      if (page.title === "Home") this.nav.setRoot(page.component);
      else this.nav.push(page.component);
      this.currentPage = page.component;
    }
  }
}
