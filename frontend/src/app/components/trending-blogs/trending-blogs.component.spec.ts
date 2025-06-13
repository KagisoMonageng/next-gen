import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingBlogsComponent } from './trending-blogs.component';

describe('TrendingBlogsComponent', () => {
  let component: TrendingBlogsComponent;
  let fixture: ComponentFixture<TrendingBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendingBlogsComponent]
    });
    fixture = TestBed.createComponent(TrendingBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
