import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHomeworksComponent } from './modal-homeworks.component';

describe('ModalHomeworksComponent', () => {
  let component: ModalHomeworksComponent;
  let fixture: ComponentFixture<ModalHomeworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHomeworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHomeworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
