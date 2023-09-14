import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClassesComponent } from './modal-classes.component';

describe('ModalClassesComponent', () => {
  let component: ModalClassesComponent;
  let fixture: ComponentFixture<ModalClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
