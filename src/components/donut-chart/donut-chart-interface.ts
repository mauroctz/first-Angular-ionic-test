export interface DonutSlice {
  id: number;
  value: number;
  color: string;
  label?: string;
  percent?: number;
  onClickCb?: () => void;
}

export interface DonutSliceWithCommands extends DonutSlice {
  offset: number;
  commands: string;
}
