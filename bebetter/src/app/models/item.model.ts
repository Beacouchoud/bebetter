import { IRecord } from "./record.model";

export interface IItem {
  _id: string;
  owner: string;
  userItems:Array<IDetailItem>
}

export interface IDetailItem {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  records: Array<IRecord>;
  private: Boolean;
  graph: Number;
  um: string;
  date: string;
  objective: string;
}
