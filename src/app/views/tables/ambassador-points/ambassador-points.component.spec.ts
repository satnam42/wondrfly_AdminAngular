import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadorPointsComponent } from './ambassador-points.component';

describe('AmbassadorPointsComponent', () => {
  let component: AmbassadorPointsComponent;
  let fixture: ComponentFixture<AmbassadorPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadorPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
