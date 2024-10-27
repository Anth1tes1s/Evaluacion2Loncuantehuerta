import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioconductorPage } from './inicioconductor.page';

describe('InicioconductorPage', () => {
  let component: InicioconductorPage;
  let fixture: ComponentFixture<InicioconductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
