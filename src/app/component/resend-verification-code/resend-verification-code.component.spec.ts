import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendVerificationCodeComponent } from './resend-verification-code.component';

describe('ResendVerificationCodeComponent', () => {
  let component: ResendVerificationCodeComponent;
  let fixture: ComponentFixture<ResendVerificationCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendVerificationCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendVerificationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
