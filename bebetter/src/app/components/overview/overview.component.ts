import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { IDetailItem, IItem } from 'src/app/models/item.model';
import { IRecord } from 'src/app/models/record.model';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @Input() public userItem: IDetailItem;
  // @Input() public user: IUser;

  public mode: ProgressSpinnerMode = 'determinate';
  public value7days = 50;
  public value30days = 50;

  public lowestRecord: IRecord;
  public highestRecord: IRecord;
  public average7Days: number;
  public average30Days: number;
  public daysGoalAchieved: number;
  public objectiveProgressToday: number;
  public progress: number;

  constructor() {}

  ngOnInit() {
    this.lowestRecord = this.getlowestRecord();
    this.highestRecord = this.gethigherValue();
    this.average7Days = this.convertPercentage(
      this.getAverage7Days(),
      this.userItem.objective
    );
    this.average30Days = this.convertPercentage(
      this.getAverage30Days(),
      this.userItem.objective
    );
    this.daysGoalAchieved = this.getdaysGoalAchieved();
    this.objectiveProgressToday = !!this.getobjectiveProgressToday()
      ? this.getobjectiveProgressToday() / this.userItem.objective
      : 0;
  }

  public get item() {
    return this.userItem;
  }

  //valor mas bajo
  public getlowestRecord(): IRecord {
    return this.userItem?.records.sort((a, b) => a.value - b.value)[0];
  }

  //valor mas alto
  public gethigherValue(): IRecord {
    return this.userItem?.records.sort((a, b) => b.value - a.value)[0];
  }

  //media ultimos 7 dias
  public getAverage7Days(): number {
    if (this.userItem?.records.length >= 7) {
      return (
        this.userItem?.records
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(0, 6)
          .map((record) => record.value)
          .reduce((valor1, valor2) => valor1 + valor2)[0] / 7
      );
    } else {
      return (
        this.userItem?.records
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(0, 6)
          .map((record) => record.value)
          .reduce((valor1, valor2) => valor1 + valor2)[0] /
        this.userItem?.records.length
      );
    }
  }

  //media ultimos 7 dias
  public getAverage30Days(): number {
    if (this.userItem) {
      if (this.userItem?.records.length >= 30) {
        return (
          this.userItem?.records
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 6)
            .map((record) => record.value)
            .reduce((valor1, valor2) => valor1 + valor2)[0] / 30
        );
      } else {
        return (
          this.userItem?.records
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 6)
            .map((record) => record.value)
            .reduce((valor1, valor2) => valor1 + valor2)[0] /
          this.userItem?.records.length
        );
      }
    } else {
      return 0;
    }
  }

  //dias que se ha alcanzado el objetivo
  public getdaysGoalAchieved(): number {
    return this.userItem?.records.filter(
      (record) => record.value >= this.userItem.objective
    ).length;
  }

  //progreso hoy
  public getobjectiveProgressToday(): number {
    return !!this.userItem?.records.find(
      (record) =>
        new Date(record.date).toDateString() === new Date().toDateString()
    ) ? this.userItem?.records.find(
          (record) =>
            new Date(record.date).toDateString() === new Date().toDateString()
        ).value
    : 0;
  }

  public convertPercentage(num: number, max: number): number {
    return parseInt(((num * 100) / max).toString());
  }
}
