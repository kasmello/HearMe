import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HearButtonComponent } from './hear-button.component';

describe('HearButtonComponent', () => {
  let component: HearButtonComponent;
  let fixture: ComponentFixture<HearButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearButtonComponent]
    });
    fixture = TestBed.createComponent(HearButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
