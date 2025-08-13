const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/vehicles`;
const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (err) { console.log(err); }
};
const show = async (vehicleId) => {
  try {
    const res = await fetch(`${BASE_URL}/${vehicleId}`);
    return res.json();
  } catch (err) { console.log(err); }
};
const myVehicles = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my-vehicles`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (err) { console.log(err); }
};
const create = async ({ location, startDate, endDate, file }) => {
  try {
    const form = new FormData();
    form.append('location', location);
    form.append('availability[startDate]', startDate);
    form.append('availability[endDate]', endDate);
    form.append('image', file);
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: form, // no Content-Type for FormData
    });
    return res.json();
  } catch (err) { console.log(err); }
};
const update = async (vehicleId, { location, startDate, endDate, file }) => {
  try {
    const form = new FormData();
    if (location) form.append('location', location);
    if (startDate) form.append('availability[startDate]', startDate);
    if (endDate) form.append('availability[endDate]', endDate);
    if (file) form.append('image', file);
    const res = await fetch(`${BASE_URL}/${vehicleId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: form, // no Content-Type for FormData
    });
    return res.json();
  } catch (err) { console.log(err); }
};
const remove = async (vehicleId) => {
  try {
    const res = await fetch(`${BASE_URL}/${vehicleId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (err) { console.log(err); }
};
export { index, show, myVehicles, create, update, remove };