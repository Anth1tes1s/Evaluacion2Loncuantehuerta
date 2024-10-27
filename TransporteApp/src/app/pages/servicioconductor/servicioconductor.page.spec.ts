import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicioconductorPage } from './servicioconductor.page';

describe('ServicioconductorPage', () => {
  let component: ServicioconductorPage;
  let fixture: ComponentFixture<ServicioconductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
