import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentReportsComponent } from './parent-reports.component';

describe('ParentReportsComponent', () => {
  let component: ParentReportsComponent;
  let fixture: ComponentFixture<ParentReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
