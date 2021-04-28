import { IRecord } from "./record.model";

export interface IItem {
  owner: string;
  title: string;
  subtitle: string;
  description: string;
  records: Array<IRecord>;
  private?: Boolean;
  graph: Number;
  units: string;
}
