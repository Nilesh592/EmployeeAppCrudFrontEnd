import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmnButtonComponent } from './cmn-button.component';

describe('CmnButtonComponent', () => {
  let component: CmnButtonComponent;
  let fixture: ComponentFixture<CmnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmnButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
