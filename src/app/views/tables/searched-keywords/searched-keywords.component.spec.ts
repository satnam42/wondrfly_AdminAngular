import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedKeywordsComponent } from './searched-keywords.component';

describe('SearchedKeywordsComponent', () => {
  let component: SearchedKeywordsComponent;
  let fixture: ComponentFixture<SearchedKeywordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedKeywordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
