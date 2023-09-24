import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestaoContainerComponent } from './questao-container.component';

describe('QuestaoContainerComponent', () => {
  let component: QuestaoContainerComponent;
  let fixture: ComponentFixture<QuestaoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestaoContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestaoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
