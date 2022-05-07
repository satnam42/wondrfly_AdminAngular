import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategoryFormComponent } from './addcategory-form.component';

describe('AddcategoryFormComponent', () => {
  let component: AddcategoryFormComponent;
  let fixture: ComponentFixture<AddcategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
