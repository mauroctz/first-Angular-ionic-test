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
  template: `
    <svg [attr.viewBox]="'0 0 ' + viewBox + ' ' + viewBox" *ngIf="data">
      <path
        *ngFor="
          let slice of data
            | slicesWithCommandsAndOffset : radius : viewBox : borderSize;
          trackBy: trackByFn;
          let index = index
        "
        [attr.fill]="slice.color"
        [attr.d]="slice.commands"
        [attr.transform]="'rotate(' + slice.offset + ')'"
        (click)="slice.onClickCb ? slice.onClickCb() : null"
      >
        <title>{{ slice.label }}</title>
      </path>
    </svg>
  `,
})
export class DonutChartComponent implements OnInit {
  @Input() radius = 50;
  @Input() viewBox = 100;
  @Input() borderSize = 20;
  @Input() data: DonutSlice[] = [];

  ngOnInit() {
    console.log("qui");

    this.data.sort((a, b) => {
      return a.value > b.value ? -1 : a.value > b.value ? 1 : 0;
    });
    const sum = this.data.reduce((accu, slice) => accu + slice.value, 0);
    const test = this.data.map((slice) => {
      let percent = Math.round((slice.value / sum) * 100);
      console.log({ ...slice, percent: percent });
      return { ...slice, percent: percent };
    });
    console.log("test", test);
    this.data = [...test];
    console.log(this.data);
  }

  trackByFn(index: number, slice: DonutSlice) {
    return slice.id;
  }
}
