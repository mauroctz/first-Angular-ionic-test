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

  calculatePercentages(): void {
    let sum = this.data.reduce((acc, slice) => acc + slice.value, 0);
    sum = this.size === "half" ? sum * 2 : sum;
    let total_percent = 100;
    this.data = [
      ...this.data.map((slice) => {
        let percent = Math.round((slice.value / sum) * total_percent);
        if (percent === 0) {
          total_percent = total_percent - 1;
          percent = 1;
        }
        if (percent === 100) {
          percent = total_percent - this.data.length + 1;
        }
        console.log(`percentage ${percent} - total ${total_percent}`);

        return { ...slice, percent: percent };
      }),
    ];
  }

  trackByFn(index: number, slice: DonutSlice) {
    return slice.id;
  }
}
