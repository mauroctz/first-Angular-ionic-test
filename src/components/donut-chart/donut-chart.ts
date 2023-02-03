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
  @Input() borderSize = 20;
  @Input() borderRounded: boolean = true;
  @Input() data: DonutSlice[] = [];
  @Input() sort?: "asc" | "desc" = null;
  @Input() chartType?: "full" | "half";
  @Input() customTotal: number = null;
  private svgRadius: number = 50;
  private svgSize: number = 100;
  private sliceSelected: DonutSlice = null;
  private dimensionChart: number = 100;
  private sumPercentage: number = 0;

  ngOnInit() {
    if (this.sort != null) this.data = [...this.sortItems(this.sort)];

    this.getDimensionChart();
    this.calculatePercentages();
  }

  calculatePercentages(typeValue: string = "value"): void {
    let sum = this.data.reduce((acc, slice) => acc + slice[typeValue], 0);
    sum = this.customTotal > sum ? this.customTotal : sum;
    sum = this.chartType === "half" ? sum * 2 : sum;
    this.data = [
      ...this.data.map((slice) => {
        let percent = Math.round((slice[typeValue] / sum) * 100);

        if (percent === 0 && slice["value"] > 0) {
          percent = 1;
        }

        console.log(`percentage ${percent}`);
        return { ...slice, percent: percent };
      }),
    ];
    if (!this.customTotal) {
      this.sumPercentage = this.getTotalPercentage();
      if (this.sumPercentage > this.dimensionChart) {
        this.normalize(typeValue);
      }
    }
  }

  normalize(typeValue: string = "value"): void {
    console.log(`*****normalize***** `);
    if (typeValue == "percent") {
      console.log("before : ", this.data);

      const orderedArray: DonutSlice[] = this.sortItems("desc");
      console.log("after : ", this.data);
      for (let i = 0; i < this.sumPercentage - this.dimensionChart; i++) {
        this.data = this.data.map((item) => {
          if (item.id === orderedArray[i].id) {
            console.log({ ...item });
            return { ...item, percent: item.percent - 1 };
          } else {
            return { ...item };
          }
        });
      }
      console.log(this.data);

      return;
    }
    this.calculatePercentages("percent");
  }

  sortItems(sort: String): DonutSlice[] {
    let array: DonutSlice[] = [...this.data];
    return array.sort((a, b) => {
      if (sort === "asc") {
        return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
      } else if (sort === "desc") {
        return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
      }
    });
  }

  getTotalPercentage(): number {
    let total = this.data.reduce((acc, slice) => acc + slice["percent"], 0);
    console.log(`total ${total}`);
    return total;
  }
  getDimensionChart(): void {
    this.dimensionChart = this.chartType === "half" ? 50 : 100;
  }

  selectSlice(slice: DonutSlice) {
    slice.onClickCb && slice.onClickCb();
    this.sliceSelected = { ...slice };
  }
}
