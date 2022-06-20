import {
  Component,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { egretAnimations } from "app/shared/animations/egret-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from 'tinycolor2';
import { ApiService } from "app/shared/services/api.service.service";
import { Child } from "app/shared/models/child.model";
import { Userr } from "app/shared/models/user.model";
import { Program } from "app/shared/models/program.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
  animations: egretAnimations
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  trafficVsSaleOptions: any;
  trafficVsSale: any;
  trafficData: any;
  saleData: any;
  pageNo: number = 1;
  pageSize: number = 1;

  sessionOptions: any;
  sessions: any;
  sessionsData: any;

  trafficGrowthChart: any;
  bounceRateGrowthChart: any;

  dailyTrafficChartBar: any;
  trafficSourcesChart: any;
  countryTrafficStats: any[];
  children: any = new Child;
  parents: any = new Userr;
  programs: any = new Program;
  providers: any = new Userr;
  graphData: any;
  defaultGraphValue = "week"
  isWeek: boolean = true;
  isMonth: boolean = false;
  isYear: boolean = false;
  isQuarter: boolean = false;
  isSemiYear: boolean = false;
  dataCount: any = [];
  dataValue: any = [];
  providerGraphData: any;
  providerDataValue: any;
  providerDataCount: any;
  dataPeriod: any;
  dailyBandwithUsage: any;
  publishedPrograms: any;
  unpublished: number;
  temp: any;
  expiredProgram: any;
  allExpired: any;
  constructor(
    private themeService: ThemeService,
    private apiservice: ApiService,

  ) {
    this.getGraphData(this.defaultGraphValue);
  }
  getProgramList() {
    this.pageNo = 1;
    this.pageSize = 1;
    this.apiservice.getProgram(this.pageNo, this.pageSize).subscribe(res => {
      this.programs = res;
      if (this.programs.isSuccess) {
        this.getPublishedCount();
      }
    });
  }
  getParentList() {
    this.apiservice.getParents(this.pageNo, this.pageSize).subscribe(res => {
      this.parents = res;
    });
  }

  getProviders() {
    this.apiservice.getUsers('provider', this.pageNo, this.pageSize).subscribe((res: any) => {
      this.providers = res
    });
  }
  getChildList() {
    this.apiservice.getChild().subscribe(res => {
      this.children = res;
    });
  }

  getGraphData(value) {
    let pipe = new DatePipe('en-US');
    if (value == 'week') {
      this.isWeek = true;
      this.isMonth = false;
      this.isYear = false;
      this.isQuarter = false;
      this.isSemiYear = false;
      this.apiservice.analyticsGraphProgram(value).subscribe((res: any) => {
        this.graphData = res.data;
        this.dataValue = this.graphData.map(function (el) { return el.week; });
        this.dataCount = this.graphData.map(function (el) { return el.count; });
        this.dataPeriod = this.graphData.map(function (el) { return pipe.transform(el.start, 'MMM d, y') + ' to ' + pipe.transform(el.end, 'MMM d, y'); });
        this.trafficData = this.dataCount;
        this.initTrafficVsSaleChart(this.themeService.activatedTheme);
      });
      this.apiservice.analyticsGraphProviders(value).subscribe((res: any) => {
        this.providerGraphData = res.data;
        this.providerDataValue = this.providerGraphData.map(function (el) { return el.week; });
        this.providerDataCount = this.providerGraphData.map(function (el) { return el.count; });
        this.saleData = this.dataCount;
      });
    } else if (value == 'month') {
      this.isWeek = false;
      this.isMonth = true;
      this.isYear = false;
      this.isQuarter = false;
      this.isSemiYear = false;
      this.apiservice.analyticsGraphProgram(value).subscribe((res: any) => {
        console.log(res, "month")
        this.graphData = res.data;
        this.dataValue = this.graphData.map(function (el) { return el.month; });
        this.dataCount = this.graphData.map(function (el) { return el.count; });
        this.dataPeriod = this.graphData.map(function (el) { return pipe.transform(el.period, 'MMMM, y'); });
        this.trafficData = this.dataCount;
        this.initTrafficVsSaleChart(this.themeService.activatedTheme);
      });
      this.apiservice.analyticsGraphProviders(value).subscribe((res: any) => {
        console.log(res, "month")
        this.providerGraphData = res.data;
        this.providerDataValue = this.providerGraphData.map(function (el) { return el.month; });
        this.providerDataCount = this.providerGraphData.map(function (el) { return el.count; });
        this.saleData = this.dataCount;
      });
    }
    else if (value == 'quarter') {
      this.isWeek = false;
      this.isMonth = false;
      this.isYear = false;
      this.isQuarter = true;
      this.isSemiYear = false;
      this.apiservice.analyticsGraphProgram(value).subscribe((res: any) => {
        console.log(res, "quarter")
        this.graphData = res.data;
        this.dataValue = this.graphData.map(function (el) { return el.month; });
        this.dataCount = this.graphData.map(function (el) { return el.count; });
        this.dataPeriod = this.graphData.map(function (el) { return pipe.transform(el.period, 'MMM d, y') + ' to ' + pipe.transform(el.end, 'MMM d, y'); });
        this.trafficData = this.dataCount;
        this.initTrafficVsSaleChart(this.themeService.activatedTheme);
      });
      this.apiservice.analyticsGraphProviders(value).subscribe((res: any) => {
        console.log(res, "quarter")
        this.providerGraphData = res.data;
        this.providerDataValue = this.providerGraphData.map(function (el) { return el.month; });
        this.providerDataCount = this.providerGraphData.map(function (el) { return el.count; });
        this.saleData = this.dataCount;
      });
    } else if (value == 'semiYear') {
      this.isWeek = false;
      this.isMonth = false;
      this.isYear = false;
      this.isQuarter = false;
      this.isSemiYear = true;
      this.apiservice.analyticsGraphProgram(value).subscribe((res: any) => {
        console.log(res, "semiyear")
        this.graphData = res.data;
        this.dataValue = this.graphData.map(function (el) { return el.month; });
        this.dataCount = this.graphData.map(function (el) { return el.count; });
        this.dataPeriod = this.graphData.map(function (el) { return pipe.transform(el.period, 'MMMM, y'); });
        this.trafficData = this.dataCount;
        this.initTrafficVsSaleChart(this.themeService.activatedTheme);
      });
      this.apiservice.analyticsGraphProviders(value).subscribe((res: any) => {
        console.log(res, "semiyear")
        this.providerGraphData = res.data;
        this.providerDataValue = this.providerGraphData.map(function (el) { return el.month; });
        this.providerDataCount = this.providerGraphData.map(function (el) { return el.count; });
        this.saleData = this.dataCount;
      });
    }
    else {
      this.isWeek = false;
      this.isMonth = false;
      this.isYear = true;
      this.isQuarter = false;
      this.isSemiYear = false;
      this.apiservice.analyticsGraphProgram(value).subscribe((res: any) => {
        console.log(res, "year")
        this.graphData = res.data;
        this.dataValue = this.graphData.map(function (el) { return el.year; });
        this.dataCount = this.graphData.map(function (el) { return el.count; });
        this.dataPeriod = this.graphData.map(function (el) { return el.period; });
        this.trafficData = this.dataCount;
        this.initTrafficVsSaleChart(this.themeService.activatedTheme);
      });
      this.apiservice.analyticsGraphProviders(value).subscribe((res: any) => {
        console.log(res, "year")
        this.providerGraphData = res.data;
        this.providerDataValue = this.providerGraphData.map(function (el) { return el.year; });
        this.providerDataCount = this.providerGraphData.map(function (el) { return el.count; });
        this.saleData = this.dataCount;
      });
    }
  }

  ngAfterViewInit() { }
  ngOnInit() {
    this.getChildList();
    this.getParentList();
    this.getProgramList();
    this.getProviders();
    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initTrafficVsSaleChart(activeTheme);
      // this.initSessionsChart(activeTheme);
      // this.initTrafficSourcesChart(activeTheme)
      // this.initDailyTrafficChartBar(activeTheme)
      // this.initTrafficGrowthChart(activeTheme)

    });
    // this.initSessionsChart(this.themeService.activatedTheme);
    // this.initTrafficSourcesChart(this.themeService.activatedTheme)
    // this.initDailyTrafficChartBar(this.themeService.activatedTheme)
    // this.initTrafficGrowthChart(this.themeService.activatedTheme)

  }

  initTrafficVsSaleChart(theme) {
    this.trafficVsSaleOptions = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "#fff",
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); color: #444",
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "80px",
        right: "30px",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.dataPeriod,

        axisLabel: {
          show: true,
          margin: 20,
          color: "#888"
        },
        axisTick: {
          show: false
        },

        axisLine: {
          show: false,
          lineStyle: {
            show: false
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          name: "Programs",
          label: { show: false, color: "#0168c1" },
          type: "bar",
          barGap: 0,
          color: tinyColor(theme.baseColor).setAlpha(.4).toString(),
          smooth: true
        },
        {
          name: "Providers",
          label: { show: false, color: "#639" },
          type: "bar",
          color: tinyColor(theme.baseColor).toString(),
          smooth: true
        }
      ]
    };

    this.trafficData = this.dataCount
    this.saleData = this.providerDataCount
    this.trafficVsSale = {
      series: [
        {
          data: this.trafficData
        },
        {
          data: this.saleData
        }
      ]
    };
  }



  getPublishedCount() {
    this.apiservice.getPublishedProgram('', '', 'published').subscribe((res: any) => {
      this.publishedPrograms = res;
      this.getExpiredProgram();
      if (res.isSuccess) {
        this.unpublished = this.programs.total - this.publishedPrograms.total
      }
    })
    // this.getUnpublishCount();
  }

  getExpiredProgram() {
    this.apiservice.getExpiringProgram('', '',).subscribe((res: any) => {
      this.expiredProgram = res.items;
      if (res.isSuccess) {
        this.dailyBandwithUsage = {
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          color: ["#fcc02e", "#e91f63", "#f44336"],
          tooltip: {
            show: false,
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          xAxis: [
            {
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],

          series: [
            {
              name: "Sessions",
              type: "pie",
              radius: ["50%", "85%"],
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              hoverOffset: 5,
              stillShowZeroSum: false,
              label: {
                normal: {
                  show: false,
                  position: "center",
                  textStyle: {
                    fontSize: "13",
                    fontWeight: "normal"
                  },
                  formatter: "{a}"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "15",
                    fontWeight: "normal",
                    color: "black"
                  },
                  formatter: "{b} \n{c} ({d}%)"
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: this.publishedPrograms.total,
                  name: "Published"
                },
                {
                  value: this.unpublished,
                  name: "Unpublished"
                },
                { value: this.expiredProgram.length, name: "Expired soon" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
      }
    });
  }

  allExpiredProgram() {
    this.apiservice.allExpiredProgram().subscribe((res: any) => {
      this.allExpired = res.items;
    });
  }

}
