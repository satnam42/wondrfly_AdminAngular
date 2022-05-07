import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditTableComponent } from './tag-edit-table.component';

describe('TagEditTableComponent', () => {
  let component: TagEditTableComponent;
  let fixture: ComponentFixture<TagEditTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagEditTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagEditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
