import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RelativeTimePipe } from './relative-time.pipe';
import { ExcerptPipe } from "./excerpt.pipe";
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { DateDifferencePipe } from './date-difference.pipe';

const pipes = [
  RelativeTimePipe,
  ExcerptPipe,
  GetValueByKeyPipe,
  DateDifferencePipe,
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes,
  providers: [DatePipe, DateDifferencePipe]
})
export class SharedPipesModule { }