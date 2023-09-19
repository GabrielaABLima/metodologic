import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent {
  columns: number = 5;
  showQuestion: boolean = false;
  @ViewChild('modalModulo') modalModulo!: ModalComponent;
  points: number = 0;

  constructor(private breakpointObserver: BreakpointObserver) { }
  openGame(data: any) {
    this.showQuestion = true;

    setTimeout(() => {
      this.closeGame(data);
    }, 90000);
  }

  closeGame(data: any) {
    this.showQuestion = false;
  }

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
