import { HttpInterceptorFn } from '@angular/common/http';
import { LOCAL_STORAGE_KEYS } from '../../constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(cloned);
  }

  return next(req);
};
