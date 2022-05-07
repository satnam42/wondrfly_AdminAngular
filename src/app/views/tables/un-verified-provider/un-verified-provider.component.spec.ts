import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnVerifiedProviderComponent } from './un-verified-provider.component';

describe('UnVerifiedProviderComponent', () => {
  let component: UnVerifiedProviderComponent;
  let fixture: ComponentFixture<UnVerifiedProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnVerifiedProviderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnVerifiedProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
