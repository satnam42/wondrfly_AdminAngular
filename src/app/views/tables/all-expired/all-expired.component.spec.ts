import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpiredComponent } from './all-expired.component';

describe('AllExpiredComponent', () => {
  let component: AllExpiredComponent;
  let fixture: ComponentFixture<AllExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
