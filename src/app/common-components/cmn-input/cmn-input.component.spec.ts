import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmnInputComponent } from './cmn-input.component';

describe('CmnInputComponent', () => {
  let component: CmnInputComponent;
  let fixture: ComponentFixture<CmnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmnInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
