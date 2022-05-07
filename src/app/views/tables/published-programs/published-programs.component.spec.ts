import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedProgramsComponent } from './published-programs.component';

describe('PublishedProgramsComponent', () => {
  let component: PublishedProgramsComponent;
  let fixture: ComponentFixture<PublishedProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
