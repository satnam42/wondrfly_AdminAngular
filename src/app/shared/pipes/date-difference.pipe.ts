import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDifference'
})
export class DateDifferencePipe implements PipeTransform {
  constructor(private dp: DatePipe) { }

  transform(value: any): any {
    if (value) {
      value = this.dp.transform(value, "M/d/yy")
      var date2 = new Date();
      var today = this.dp.transform(date2, "M/d/yy");
      var Time = new Date(value).getTime() - new Date(today).getTime()
      var Days: any = Time / (1000 * 3600 * 24); //Diference in Days
      return Days = Days > 0 ? Days + ' Days' : 'Out Of Date';
    }
  }

}
