import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsReportsComponent } from './programs-reports.component';

describe('ProgramsReportsComponent', () => {
  let component: ProgramsReportsComponent;
  let fixture: ComponentFixture<ProgramsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
