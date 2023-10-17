import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListCardComponent } from './question-list-card.component';

describe('QuestionListCardComponent', () => {
  let component: QuestionListCardComponent;
  let fixture: ComponentFixture<QuestionListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
