import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlineProgramsComponent } from './online-programs.component';


describe('PublishedProgramsComponent', () => {
  let component: OnlineProgramsComponent;
  let fixture: ComponentFixture<OnlineProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
