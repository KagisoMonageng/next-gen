import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInProfileComponent } from './logged-in-profile.component';

describe('LoggedInProfileComponent', () => {
  let component: LoggedInProfileComponent;
  let fixture: ComponentFixture<LoggedInProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedInProfileComponent]
    });
    fixture = TestBed.createComponent(LoggedInProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
