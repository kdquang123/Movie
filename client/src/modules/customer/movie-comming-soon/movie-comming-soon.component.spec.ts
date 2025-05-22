import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCommingSoonComponent } from './movie-comming-soon.component';

describe('MovieCommingSoonComponent', () => {
  let component: MovieCommingSoonComponent;
  let fixture: ComponentFixture<MovieCommingSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCommingSoonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCommingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
