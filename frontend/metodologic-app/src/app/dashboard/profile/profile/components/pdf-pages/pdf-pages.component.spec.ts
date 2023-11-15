import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPagesComponent } from './pdf-pages.component';

describe('PdfPagesComponent', () => {
  let component: PdfPagesComponent;
  let fixture: ComponentFixture<PdfPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
