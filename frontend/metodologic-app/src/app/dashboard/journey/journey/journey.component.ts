import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent {
  columns: number = 5;


  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.columns = 1;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.columns = 2;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.columns = 4;
      } else {
        this.columns = 5;
      }
    });
  }
}
