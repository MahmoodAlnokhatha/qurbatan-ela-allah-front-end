const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/bookings`;

const create = async (bookingFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingFormData),
    });
    return res.json();
  } catch (error) { console.log(error); }
};

const myBookings = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) { console.log(error); }
};

const incomingBookings = async () => {
  try {
    const res = await fetch(`${BASE_URL}/owner`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) { console.log(error); }
};

const updateStatus = async (bookingId, status) => {
  try {
    const res = await fetch(`${BASE_URL}/${bookingId}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return res.json();
  } catch (error) { console.log(error); }
};

const approve = async (bookingId) => updateStatus(bookingId, 'approved');
const reject  = async (bookingId) => updateStatus(bookingId, 'rejected');

export { create, myBookings, incomingBookings, updateStatus, approve, reject };