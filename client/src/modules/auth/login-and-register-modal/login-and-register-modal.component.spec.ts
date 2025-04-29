import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndRegisterModalComponent } from './login-and-register-modal.component';

describe('LoginAndRegisterModalComponent', () => {
  let component: LoginAndRegisterModalComponent;
  let fixture: ComponentFixture<LoginAndRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAndRegisterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAndRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
