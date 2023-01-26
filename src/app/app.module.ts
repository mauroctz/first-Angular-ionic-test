import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpClientModule } from "@angular/common/http";
import { MyApp } from "./app.component";
import { CommonModule } from "@angular/common";
import { HomePage } from "../pages/home/home";
import { UsersPage } from "./../pages/users/users";
import { ModalUserPage } from "./../pages/modal-user/modal-user";
import { PaginationComponent } from "./../components/pagination/pagination";
import { CardUserComponent } from "./../components/card-user/card-user";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsersPage,
    ModalUserPage,
    CardUserComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      iconMode: "ios",
      modalEnter: "modal-slide-in",
      modalLeave: "modal-slide-out",
      tabsPlacement: "bottom",
      pageTransition: "ios-transition",
    }),
    HttpClientModule,
    CommonModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ModalUserPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}
