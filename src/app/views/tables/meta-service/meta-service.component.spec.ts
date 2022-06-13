import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaServiceComponent } from './meta-service.component';

describe('MetaServiceComponent', () => {
  let component: MetaServiceComponent;
  let fixture: ComponentFixture<MetaServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
