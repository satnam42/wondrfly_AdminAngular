import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicacyComponent } from './duplicacy.component';

describe('DuplicacyComponent', () => {
  let component: DuplicacyComponent;
  let fixture: ComponentFixture<DuplicacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
