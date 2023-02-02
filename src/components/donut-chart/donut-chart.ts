import { DonutSlice } from "./donut-chart-interface";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";

@Component({
  selector: "donut-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "donut-chart.html",
})
export class DonutChartComponent implements OnInit {
  @Input() radius = 50;
  @Input() height = 100;
  @Input() borderSize = 20;
  @Input() borderRounded: boolean = true;
  @Input() data: DonutSlice[] = [];
  @Input() sort?: "asc" | "desc"; //asc or desc
  @Input() size?: "full" | "half";
  @Input() customTotal: number = null;

  sliceSelected: DonutSlice = null;

  ngOnInit() {
    this.sortItems(this.sort);
    this.calculatePercentages();
  }

  sortItems(sort) {
    this.data.sort((a, b) => {
      if (sort === "asc") {
        return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
      } else if (sort === "desc") {
        return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
      }
    });
  }

  calculatePercentages(type: string = "value"): void {
    let sum = this.data.reduce((acc, slice) => acc + slice[type], 0);
    sum = this.customTotal > sum ? this.customTotal : sum;
    sum = this.size === "half" ? sum * 2 : sum;
    this.data = [
      ...this.data.map((slice) => {
        let percent = Math.round((slice[type] / sum) * 100);
        if (percent === 0 && slice["value"] > 0) {
          percent = 1;
        }
        console.log(`percentage ${percent}`);

        return { ...slice, percent: percent };
      }),
    ];
    if (!this.customTotal) {
      const sumPercentage = this.data.reduce(
        (acc, slice) => acc + slice["percent"],
        0
      );
      console.log(
        `total % = ${sumPercentage}/${this.size === "half" ? 50 : 100}`
      );
      if (sumPercentage !== (this.size === "half" ? 50 : 100)) {
        console.log(`*****normalize***** `);

        this.calculatePercentages("percent");
      }
    }
  }

  selectSlice(slice: DonutSlice) {
    slice.onClickCb && slice.onClickCb();
    this.sliceSelected = { ...slice };
  }
}
