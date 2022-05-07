import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReoprtsComponent } from './reoprts.component';

describe('ReoprtsComponent', () => {
  let component: ReoprtsComponent;
  let fixture: ComponentFixture<ReoprtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReoprtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReoprtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
