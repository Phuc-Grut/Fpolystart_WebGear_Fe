import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUserHomeComponent } from './nav-user-home.component';

describe('NavUserHomeComponent', () => {
  let component: NavUserHomeComponent;
  let fixture: ComponentFixture<NavUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavUserHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
