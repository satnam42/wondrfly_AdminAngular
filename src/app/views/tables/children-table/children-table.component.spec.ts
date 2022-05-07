import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildrenTableComponent } from './children-table.component';


describe('ChildrenTableComponent', () => {
  let component: ChildrenTableComponent;
  let fixture: ComponentFixture<ChildrenTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
