import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmnLabelComponent } from './cmn-label.component';

describe('CmnLabelComponent', () => {
  let component: CmnLabelComponent;
  let fixture: ComponentFixture<CmnLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmnLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmnLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
