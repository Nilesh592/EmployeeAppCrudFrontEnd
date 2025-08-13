import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmnValidationComponent } from './cmn-validation.component';

describe('CmnValidationComponent', () => {
  let component: CmnValidationComponent;
  let fixture: ComponentFixture<CmnValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmnValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmnValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
