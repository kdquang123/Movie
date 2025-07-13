import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNowShowingComponent } from './movie-now-showing.component';

describe('MovieNowShowingComponent', () => {
  let component: MovieNowShowingComponent;
  let fixture: ComponentFixture<MovieNowShowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieNowShowingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieNowShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
