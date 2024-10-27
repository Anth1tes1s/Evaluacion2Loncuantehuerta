import { inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { CanActivateFn, CanMatch, CanMatchFn } from '@angular/router';

export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.getAuthToken();
};
