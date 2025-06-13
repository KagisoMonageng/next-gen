import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllBlogsComponent } from './view-all-blogs.component';

describe('ViewAllBlogsComponent', () => {
  let component: ViewAllBlogsComponent;
  let fixture: ComponentFixture<ViewAllBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllBlogsComponent]
    });
    fixture = TestBed.createComponent(ViewAllBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
