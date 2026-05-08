import { HttpInterceptorFn } from '@angular/common/http';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: req.url.startsWith('http') ? req.url : `/api/v1/${req.url.replace(/^\//, '')}`,
  });
  return next(apiReq);
};
