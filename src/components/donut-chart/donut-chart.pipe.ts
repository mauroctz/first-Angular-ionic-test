import { DonutSlice } from "./donut-chart-interface";
import { Pipe, PipeTransform } from "@angular/core";
interface DonutSliceWithCommands extends DonutSlice {
  offset: number;
  commands: string;
}

@Pipe({
  name: "slicesWithCommandsAndOffset",
  pure: true,
})
export class DonutChartPipe implements PipeTransform {
  transform(
    donutSlices: DonutSlice[],
    svgRadius: number,
    svgSize: number,
    borderSize: number,
    borderRounded: boolean,
    chartType: string,
    sliceSelected: DonutSlice = null
  ): DonutSliceWithCommands[] {
    let previousPercent = 0;

    return donutSlices.map((slice) => {
      const sliceWithCommands: DonutSliceWithCommands = {
        ...slice,
        commands: this.getSliceCommands(
          slice,
          svgRadius,
          svgSize,
          borderSize,
          borderRounded,
          chartType,
          sliceSelected
        ),
        offset: previousPercent * 3.6 * -1,
      };
      previousPercent += slice.percent;
      return sliceWithCommands;
    });
  }
  getFullPercentageValueSliceCommand() {}

  getSliceCommands(
    donutSlice: DonutSlice,
    svgRadius: number,
    svgSize: number,
    borderSize: number,
    borderRounded: boolean,
    chartType: string,
    sliceSelected: DonutSlice
  ): string {
    const degrees = this.percentToDegrees(donutSlice.percent, chartType);
    const longPathFlag = degrees > (chartType === "half" ? 90 : 180) ? 1 : 0;
    const innerRadius =
      svgRadius -
      borderSize +
      (sliceSelected && donutSlice.id === sliceSelected.id ? -2 : 0);

    const commands: string[] = [];
    commands.push(`M ${svgSize / 2 + svgRadius} ${svgSize / 2}`);
    commands.push(
      `A ${svgRadius} ${svgRadius} 0 ${longPathFlag} 0 ${this.getCoordFromDegrees(
        degrees,
        svgRadius,
        svgSize,
        chartType
      )}`
    );
    commands.push(
      `A 1 ${Number(borderRounded)} 0 1 0 ${this.getCoordFromDegrees(
        degrees,
        innerRadius,
        svgSize,
        chartType
      )}`
    );
    commands.push(
      `L ${this.getCoordFromDegrees(degrees, innerRadius, svgSize, chartType)}`
    );
    commands.push(
      `A ${innerRadius} ${innerRadius} 0 ${longPathFlag} 1 ${
        svgSize / 2 + innerRadius
      } ${svgSize / 2}`
    );
    borderRounded &&
      commands.push(`A 1 1 0 0 ${chartType === "half" ? 0 : 1} 100 50`);
    return commands.join(" ");
  }

  getCoordFromDegrees(
    angle: number,
    svgRadius: number,
    svgSize: number,
    chartType: string
  ): string {
    const x = Math.cos((angle * Math.PI) / (chartType === "half" ? 90 : 180));
    const y = Math.sin((angle * Math.PI) / (chartType === "half" ? 90 : 180));
    const coordX = x * svgRadius + svgSize / 2;
    const coordY = y * -svgRadius + svgSize / 2;
    return [coordX, coordY].join(" ");
  }

  percentToDegrees(percent: number, chartType: string): number {
    return (percent = chartType == "half" ? percent * 1.8 : percent * 3.6);
  }
}
