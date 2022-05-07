import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolespopupComponent } from './rolespopup.component';

describe('RolespopupComponent', () => {
  let component: RolespopupComponent;
  let fixture: ComponentFixture<RolespopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolespopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolespopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
