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
    radius: number,
    svgSize: number,
    borderSize: number,
    borderRounded: boolean,
    size: string
  ): DonutSliceWithCommands[] {
    let previousPercent = 0;

    return donutSlices.map((slice) => {
      const sliceWithCommands: DonutSliceWithCommands = {
        ...slice,
        commands: this.getSliceCommands(
          slice,
          radius,
          svgSize,
          borderSize,
          borderRounded,
          size
        ),
        offset: previousPercent * 3.6 * -1,
      };
      previousPercent += slice.percent;
      return sliceWithCommands;
    });
  }

  getSliceCommands(
    donutSlice: DonutSlice,
    radius: number,
    svgSize: number,
    borderSize: number,
    borderRounded: boolean,
    size: string
  ): string {
    const degrees = this.percentToDegrees(donutSlice.percent, size);
    const longPathFlag = degrees > 90 ? 1 : 0;
    const innerRadius = radius - borderSize;

    const commands: string[] = [];

    commands.push(`M ${svgSize / 2 + radius} ${svgSize / 2}`);
    commands.push(
      `A ${radius} ${radius} 0 ${longPathFlag} 0 ${this.getCoordFromDegrees(
        degrees,
        radius,
        svgSize,
        size
      )}`
    );
    commands.push(
      `A 1 ${Number(borderRounded)} 0 1 0 ${this.getCoordFromDegrees(
        degrees,
        innerRadius,
        svgSize,
        size
      )}`
    );
    commands.push(
      `L ${this.getCoordFromDegrees(degrees, innerRadius, svgSize, size)}`
    );
    commands.push(
      `A ${innerRadius} ${innerRadius} 0 ${longPathFlag} 1 ${
        svgSize / 2 + innerRadius
      } ${svgSize / 2}`
    );
    borderRounded &&
      commands.push(`A 1 1 0 0 ${size === "half" ? 0 : 1} 100 50`);

    return commands.join(" ");
  }

  getCoordFromDegrees(
    angle: number,
    radius: number,
    svgSize: number,
    size: string
  ): string {
    const x = Math.cos((angle * Math.PI) / (size === "half" ? 90 : 180));
    const y = Math.sin((angle * Math.PI) / (size === "half" ? 90 : 180));
    const coordX = x * radius + svgSize / 2;
    const coordY = y * -radius + svgSize / 2;
    return [coordX, coordY].join(" ");
  }

  percentToDegrees(percent: number, size: string): number {
    return (percent = size == "half" ? percent * 1.8 : percent * 3.6);
  }
}
