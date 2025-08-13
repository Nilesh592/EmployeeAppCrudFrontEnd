import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmnDatePickerComponent } from './cmn-date-picker.component';

describe('CmnDatePickerComponent', () => {
  let component: CmnDatePickerComponent;
  let fixture: ComponentFixture<CmnDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmnDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmnDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
