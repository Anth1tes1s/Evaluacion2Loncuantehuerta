import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciousuarioPage } from './iniciousuario.page';

describe('IniciousuarioPage', () => {
  let component: IniciousuarioPage;
  let fixture: ComponentFixture<IniciousuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciousuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
