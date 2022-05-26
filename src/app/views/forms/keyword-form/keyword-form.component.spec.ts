import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordFormComponent } from './keyword-form.component';

describe('KeywordFormComponent', () => {
  let component: KeywordFormComponent;
  let fixture: ComponentFixture<KeywordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
