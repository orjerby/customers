import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  Package,
  Contract,
  PackageType,
  ContractType,
} from '../../models/customer.model';

@Component({
  selector: 'app-contract-dialog',
  templateUrl: './contract-dialog.component.html',
  styleUrls: ['./contract-dialog.component.scss'],
})
export class ContractDialogComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  package: Package | undefined;

  pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        rtl: true,
      },
    },
  };

  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['כמות', 'שומש'],
    datasets: [
      {
        data: [],
      },
    ],
  };

  pieChartType: ChartType = 'pie';

  constructor(@Inject(MAT_DIALOG_DATA) public readonly contract: Contract) {}

  ngOnInit(): void {}

  onPackageChange(event: MatSelectChange) {
    const packageIndex = event.value;

    if (!this.contract.packages || !this.contract.packages[packageIndex]) {
      return;
    }

    this.package = this.contract.packages[packageIndex];

    this.pieChartData.datasets[0].data = [
      this.package.amount,
      this.package.used,
    ];

    this.chart?.update();
  }

  getPackageTypeString(packageType: PackageType): string {
    switch (packageType) {
      case PackageType.SMALL:
        return 'חבילה קטנה';
      case PackageType.MEDIUM:
        return 'חבילה בינונית';
      case PackageType.LARGE:
        return 'חבילה גדולה';
      default:
        return '';
    }
  }

  getContractTypeString(contractType: ContractType): string {
    switch (contractType) {
      case ContractType.BASIC:
        return 'בסיסי';
      case ContractType.PREMIUM:
        return 'פרמיום';
      case ContractType.VIP:
        return 'VIP';
      default:
        return '';
    }
  }
}
