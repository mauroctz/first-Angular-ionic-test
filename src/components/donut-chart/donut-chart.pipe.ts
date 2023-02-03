import { DonutSlice } from "./donut-chart-interface";
import { Pipe, PipeTransform } from "@angular/core";
interface DonutSliceWithCommands extends DonutSlice {
  offset: number;
  commands: string;
  selected: boolean;
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
    selectable: boolean,
    sliceSelected: DonutSlice = null
  ): DonutSliceWithCommands[] {
    let previousPercent = 0;
    let validSlices: DonutSlice[] = this.validSlices(donutSlices);
    let totalPercentage = this.sumTotalPercentage(validSlices);

    if (validSlices.length > 1 || chartType === "half") {
      return validSlices.map((slice, index) => {
        const sliceWithCommands: DonutSliceWithCommands = {
          ...slice,
          commands: this.getSliceCommands(
            slice,
            svgRadius,
            svgSize,
            borderSize,
            borderRounded,
            chartType,
            index,
            totalPercentage
          ),
          offset: previousPercent * 3.6 * -1,
          selected:
            !selectable || this.isSelected(selectable, sliceSelected, slice),
        };
        previousPercent += slice.percent;
        return sliceWithCommands;
      });
    }
    let slice: DonutSlice = validSlices[0];

    const innerRadius = svgRadius - borderSize;
    return [
      {
        ...slice,
        commands: `M 0 ${
          svgSize / 2
        } a 1 1 0 1 0 ${svgSize} 0 a 1 1 0 1 0 -${svgSize} 0`,
        offset: 0,
        selected: this.isSelected(selectable, sliceSelected, slice),
      },
      {
        id: 1,
        value: 0,
        color: "#FFFFFF",
        commands: `M ${borderSize / 2},50
        a 1,1 0 1,0 ${svgSize - borderSize},0
        a 1,1 0 1,0 -${svgSize - borderSize},0`,
        offset: 0,
        selected: true,
      },
    ];
  }

  validSlices(donutSlices: DonutSlice[]): DonutSlice[] {
    let slices = donutSlices.filter((slice) => {
      return slice.value != 0;
    });
    return slices;
  }

  isSelected(
    selectable: boolean,
    sliceSelected: DonutSlice,
    slice: DonutSlice
  ): boolean {
    let check =
      selectable && (sliceSelected !== null && sliceSelected.id) === slice.id;

    return check;
  }

  getSliceCommands(
    donutSlice: DonutSlice,
    svgRadius: number,
    svgSize: number,
    borderSize: number,
    borderRounded: boolean,
    chartType: string,
    index: number,
    totalPercentage: number
  ): string {
    const degrees = this.percentToDegrees(donutSlice.percent, chartType);
    const longPathFlag = degrees > (chartType === "half" ? 90 : 180) ? 1 : 0;
    const innerRadius = svgRadius - borderSize / 2;

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
      commands.push(
        `A 1 1 0 0 ${
          (chartType === "half" && index === 0) ||
          (chartType === "full" && totalPercentage !== 100 && index === 0)
            ? 0
            : 1
        } 100 50`
      );
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

  sumTotalPercentage(donutSlices: DonutSlice[]): number {
    let total = donutSlices.reduce((acc, slice) => acc + slice["percent"], 0);
    console.log(`total ${total}`);
    return total;
  }

  percentToDegrees(percent: number, chartType: string): number {
    return (percent = chartType == "half" ? percent * 1.8 : percent * 3.6);
  }
}
