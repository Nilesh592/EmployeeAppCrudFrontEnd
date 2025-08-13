import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmnContainerComponent } from './cmn-container.component';

describe('CmnContainerComponent', () => {
  let component: CmnContainerComponent;
  let fixture: ComponentFixture<CmnContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmnContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmnContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
