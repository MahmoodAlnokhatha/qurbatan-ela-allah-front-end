import http from './http';

export const signup = (data) => http.post('/auth/sign-up', data);
export const login  = (data) => http.post('/auth/sign-in', data);
export const verify = () => http.get('/auth/verify');
