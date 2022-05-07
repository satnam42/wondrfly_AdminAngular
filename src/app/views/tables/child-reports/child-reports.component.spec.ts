import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildReportsComponent } from './child-reports.component';

describe('ChildReportsComponent', () => {
  let component: ChildReportsComponent;
  let fixture: ComponentFixture<ChildReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
