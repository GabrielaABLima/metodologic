import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyItemComponent } from './journey-item.component';

describe('JourneyItemComponent', () => {
  let component: JourneyItemComponent;
  let fixture: ComponentFixture<JourneyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
