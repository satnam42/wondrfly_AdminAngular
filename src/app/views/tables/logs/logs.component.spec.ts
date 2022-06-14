import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { logsComponent } from './logs.component';

describe('KeywordComponent', () => {
  let component: logsComponent;
  let fixture: ComponentFixture<logsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ logsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(logsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
