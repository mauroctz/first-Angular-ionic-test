import { DonutSlice } from "./donut-chart-interface";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { parseConfigFileTextToJson } from "typescript";

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
  @Input() selectable: boolean = true;
  @Input() selectedItem: DonutSlice = null;
  @Output() selectSliceEvent: EventEmitter<DonutSlice> =
    new EventEmitter<DonutSlice>();
  private svgRadius: number = 50;
  private svgSize: number = 100;
  sliceSelected: DonutSlice = null;
  private dimensionChart: number = 100;
  private sumPercentage: number = 0;
  private sumValues: number = 0;

  ngOnInit() {
    // console.log("init-selected item", this.selectedItem);
    // if (this.selectedItem != null) {
    //   this.selectSlice(this.selectedItem);
    // }

    if (this.sort != null) this.data = [...this.sortItems(this.sort)];
    this.getDimensionChart();
    this.calculatePercentages();
  }

  calculatePercentages(typeValue: string = "value"): void {
    this.sumValues = this.data.reduce(
      (acc, slice) => acc + slice[typeValue],
      0
    );

    this.sumValues =
      this.customTotal > this.sumValues ? this.customTotal : this.sumValues;

    this.sumValues =
      this.chartType === "half" ? this.sumValues * 2 : this.sumValues;

    this.data = [
      ...this.data.map((slice) => {
        let percent = Math.round((slice[typeValue] / this.sumValues) * 100);

        if (percent === 0 && slice["value"] > 0) {
          percent = 1;
        }

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
    if (typeValue == "percent") {
      const orderedArray: DonutSlice[] = this.sortItems("desc");

      for (let i = 0; i < this.sumPercentage - this.dimensionChart; i++) {
        this.data = this.data.map((item) => {
          if (item.id === orderedArray[i].id) {
            return { ...item, percent: item.percent - 1 };
          } else {
            return { ...item };
          }
        });
      }

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

    return total;
  }
  getDimensionChart(): void {
    this.dimensionChart = this.chartType === "half" ? 50 : 100;
  }

  selectSlice(slice: DonutSlice): void {
    this.selectSliceEvent.emit({ ...slice });
  }
}
