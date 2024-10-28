import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { VerificacionService } from '../services/verificacion.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let verificacionService: jasmine.SpyObj<VerificacionService>;
  let router: Router;

  beforeEach(() => {
    const verificacionServiceMock = jasmine.createSpyObj('VerificacionService', ['isAuthenticated']);
    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: VerificacionService, useValue: verificacionServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    verificacionService = TestBed.inject(VerificacionService) as jasmine.SpyObj<VerificacionService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login if not authenticated', () => {
    verificacionService.isAuthenticated.and.returnValue(false);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow access if authenticated', () => {
    verificacionService.isAuthenticated.and.returnValue(true);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeTrue();
  });
});
