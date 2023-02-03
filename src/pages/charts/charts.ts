import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { BehaviorSubject } from "rxjs";
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

  sliceSelected$ = new BehaviorSubject("Click on a slice 😄");
  data: DonutSlice[] = [
    {
      id: 1,
      value: 10,
      color: "DarkSeaGreen",
      label: "Slice 1",
      onClickCb: () => this.sliceSelected$.next("Slice 1 clicked 👍🏼"),
    },
    {
      id: 21,
      value: 20,
      color: "DarkOrchid",
      label: "Slice 0",
      onClickCb: () => this.sliceSelected$.next("Slice 2 clicked 👍🏼"),
    },
    {
      id: 3,
      value: 30,
      color: "Tomato",
      label: "Slice 3",
      onClickCb: () => this.sliceSelected$.next("Slice 3 clicked 👍🏼"),
    },
    {
      id: 5,
      value: 40,
      color: "DodgerBlue",
      label: "Slice 4",
      onClickCb: () => this.sliceSelected$.next("Slice 4 clicked 👍🏼"),
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChartsPage");
  }
}
