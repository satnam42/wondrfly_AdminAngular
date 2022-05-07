import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProviderListComponent } from './edit-provider-list.component';

describe('EditProviderListComponent', () => {
  let component: EditProviderListComponent;
  let fixture: ComponentFixture<EditProviderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProviderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
