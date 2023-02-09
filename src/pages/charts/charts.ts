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

  sliceSelected$ = new BehaviorSubject("Click on a slice");
  selectedItem: DonutSlice;
  data: DonutSlice[] = [
    {
      id: 1,
      value: 0,
      color: "DarkSeaGreen",
      label: "Slice 1",
    },
    {
      id: 21,
      value: 0,
      color: "DarkOrchid",
      label: "Slice 0",
    },
    {
      id: 3,
      value: 5,
      color: "Tomato",
      label: "Slice 3",
    },
    {
      id: 5,
      value: 1,
      color: "DodgerBlue",
      label: "Slice 4",
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  selectCard(item: DonutSlice): void {
    console.log("selectItem()", item);

    this.selectedItem = item;
  }
  selectSliceEvent(slice: DonutSlice): void {
    console.log("selectSliceEvent", slice);

    this.selectedItem = slice;
  }
}
