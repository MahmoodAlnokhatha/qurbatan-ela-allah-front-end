import http from './http';

export const myRequests     = () => http.get('/bookings/my');
export const createRequest  = (data) => http.post('/bookings', data);
export const updateRequest  = (id, data) => http.patch(`/bookings/${id}`, data);
export const cancelRequest  = (id) => http.delete(`/bookings/${id}`);
export const changeStatus   = (id, status) => http.patch(`/bookings/${id}/status`, { status });
