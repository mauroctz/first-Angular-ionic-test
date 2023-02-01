import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { DonutSlice } from "../../components/donut-chart/donut-chart-interface";

/**
 * Generated class for the ChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-charts",
  templateUrl: "charts.html",
})
export class ChartsPage {
  title: String = "Grafici";
  // sliceSelected$ = new BehaviorSubject("Click on a slice 😄");
  data: DonutSlice[] = [
    {
      id: 1,
      value: 44,
      color: "DarkSeaGreen",
      label: "Slice 1",
      // onClickCb: () => this.sliceSelected$.next("Slice 1 clicked 👍🏼"),
    },
    {
      id: 2,
      value: 30,
      color: "DarkOrchid",
      label: "Slice 2",
      // onClickCb: () => this.sliceSelected$.next("Slice 2 clicked 👍🏼"),
    },
    {
      id: 3,
      value: 1,
      color: "Tomato",
      label: "Slice 3",
      // onClickCb: () => this.sliceSelected$.next("Slice 3 clicked 👍🏼"),
    },
    {
      id: 3,
      value: 150,
      color: "DodgerBlue",
      label: "Slice 4",
      // onClickCb: () => this.sliceSelected$.next("Slice 4 clicked 👍🏼"),
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChartsPage");
  }
}
