import http from './http';

export const listVehicles   = () => http.get('/vehicles');
export const createVehicle  = (formData) => http.post('/vehicles', formData);
export const updateVehicle  = (id, data) => http.put(`/vehicles/${id}`, data);
export const deleteVehicle  = (id) => http.delete(`/vehicles/${id}`);
export const myVehicles     = () => http.get('/vehicles/my-vehicles');
export const getVehicle     = (id) => http.get(`/vehicles/${id}`);
