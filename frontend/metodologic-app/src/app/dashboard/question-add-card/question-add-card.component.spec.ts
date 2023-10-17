import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAddCardComponent } from './question-add-card.component';

describe('QuestionAddCardComponent', () => {
  let component: QuestionAddCardComponent;
  let fixture: ComponentFixture<QuestionAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAddCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
