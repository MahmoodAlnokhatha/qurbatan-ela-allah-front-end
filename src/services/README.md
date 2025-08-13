# Services Overview

This folder contains all **frontend API service modules**.  
Each file here handles network requests to a specific backend resource.

---

## **`authService.js`**
Handles authentication requests to the backend.

- **`signUp(formData)`** → Registers a new user.  
- **`signIn(formData)`** → Logs in a user and retrieves a token.

---

## **`vehicleService.js`**
Handles all operations related to vehicles.

- **`index()`** → Get all available vehicles.  
- **`show(vehicleId)`** → Get details for a single vehicle.  
- **`myVehicles()`** → Get vehicles owned by the logged-in user.  
- **`create(vehicleData)`** → Create a new vehicle (with image upload).  
- **`update(vehicleId, vehicleData)`** → Update a vehicle (with optional image upload).  
- **`remove(vehicleId)`** → Delete a vehicle.

---

## **`bookingService.js`**
Handles all booking operations.

- **`create(formData)`** → Create a new booking.  
- **`myBookings()`** → Get bookings created by the current user.  
- **`incomingBookings()`** → Get bookings for the user’s vehicles.   
- **`approve(bookingId)`** → Mark booking as approved.  
- **`reject(bookingId)`** → Mark booking as rejected.

---

## **`pushService.js`**
Handles **Web Push Notifications**.

- **`isPushSupported()`** → Checks if push is available in the browser.  
- **`enablePush()`** → Registers service worker, gets VAPID key, subscribes, and sends to backend.

**Private helpers:**
- `registerSW()` → Registers `/service-worker.js`.  
- `getPublicKey()` → Requests VAPID public key from backend.  
- `subscribeUser(registration, key)` → Subscribes browser to push notifications.  
- `sendSubscriptionToServer(subscription)` → Saves subscription on backend.

---

## Notes
- All service calls return a **Promise** that resolves to JSON. 

- All **authenticated requests** send `Authorization: Bearer TOKEN` in headers.  

- **Image uploads** use `FormData` with **no `Content-Type` header** set manually (browser handles it). 

- Push notifications require:
  1. HTTPS deployment.
  2. A service worker file at `/public/service-worker.js`.
  3. Backend VAPID keys.
