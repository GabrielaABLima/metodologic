import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGradesHomeworkComponent } from './modal-grades-homework.component';

describe('ModalGradesHomeworkComponent', () => {
  let component: ModalGradesHomeworkComponent;
  let fixture: ComponentFixture<ModalGradesHomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGradesHomeworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGradesHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
