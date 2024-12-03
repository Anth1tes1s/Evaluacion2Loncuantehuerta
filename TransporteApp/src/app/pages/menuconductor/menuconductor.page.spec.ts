import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuconductorPage } from './menuconductor.page';

describe('MenuconductorPage', () => {
  let component: MenuconductorPage;
  let fixture: ComponentFixture<MenuconductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
