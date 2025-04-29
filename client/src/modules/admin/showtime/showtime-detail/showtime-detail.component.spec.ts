import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeDetailComponent } from './showtime-detail.component';

describe('ShowtimeDetailComponent', () => {
  let component: ShowtimeDetailComponent;
  let fixture: ComponentFixture<ShowtimeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtimeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtimeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
