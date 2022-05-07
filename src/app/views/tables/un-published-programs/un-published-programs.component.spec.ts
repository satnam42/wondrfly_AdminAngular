import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnPublishedProgramsComponent } from './un-published-programs.component';

describe('UnPublishedProgramsComponent', () => {
  let component: UnPublishedProgramsComponent;
  let fixture: ComponentFixture<UnPublishedProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnPublishedProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnPublishedProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
