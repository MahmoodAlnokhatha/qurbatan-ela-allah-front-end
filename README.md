# Qurbatan-Ela-Allah (Volunteer Vehicle Sharing)

A community-driven platform where vehicle owners can publish short-term availability and requesters can book a vehicle for essential daily needs. Built with **Reatc** on the frontend and **Node.js / Express / MongoDB** on the backend, with **Cloudinary** for media and **Web Push** for booking status notifications.

---

## Back-End Repo
**[here](https://github.com/MahmoodAlnokhatha/qurbatan-ela-allah-back-end)**

---

## Presentation
**Check out a quick presentation [here](https://www.figma.com/deck/jni2B3W85s99B8RNYuAdyH/Qurba-Ela-Allah?node-id=1-30&t=hjfklJuvEsOTywUn-1)**
---

## ✨ Features

- Browse available vehicles **without sign-in**.
- Owners publish vehicles with **image upload**, **location**, and **availability window**.
- Requesters submit bookings with a **smart date picker** that only allows valid dates.
- Owners **Approve/Reject** incoming booking requests.
- **Web Push notifications** to inform requesters on status changes.
- Basic **PWA** support (service worker, lightweight offline cache).
---

## Deployment

Via Render, check it our [click here](https://qurbatan-ela-allah-front-end.onrender.com/)
**---

## 🧱 Tech Stack

**Frontend:** React (Vite), React Router, react-datepicker, Day.js  
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, Multer + Cloudinary, Day.js, web-push  
**Other:** Service Worker, CORS, Morgan

---

## 🗂️ Repository Structure 

```
qurbatan-ela-allah/
├─ backend/              # Express API (auth, vehicles, bookings, push)
├─ frontend/             # React app (screens, services, SW, assets)
```

> Two developers conriputed the project for both repos

---

## 🔌 API Overview (REST)

### Auth — `/auth`
- `POST /sign-up` → `{ token }`  
  Body: `{ username, password }`
- `POST /sign-in` → `{ token }`  
  Body: `{ username, password }`

### Users — `/users`
- `GET /` (auth) → list users (username, _id)
- `GET /:userId` (auth) → single user

### Vehicles — `/vehicles`
- `GET /` (public) → vehicles that still have **available days** in their window
- `GET /:vehicleId` (public) → vehicle details (+ owner username)
- `GET /my-vehicles` (auth) → vehicles owned by current user
- `GET /:vehicleId/availability` (public) → `{ availability: {startDate, endDate}, bookings: [{startDate, endDate}] }`
- `POST /` (auth, multipart/form-data) → create vehicle (`image`, `location`, `availability[startDate]`, `availability[endDate]`)
- `PUT /:vehicleId` (auth, multipart/form-data) → update vehicle (optional new `image`)
- `DELETE /:vehicleId` (auth) → owner-only delete

### Bookings — `/bookings`
- `POST /` (auth) → create booking  
  Validations: inside availability window, **no overlap** with approved bookings
- `GET /my` (auth) → my bookings (as requester)
- `GET /owner` (auth) → incoming requests for vehicles I own
- `PATCH /:id/status` (auth) → `{ status: 'approved'|'rejected' }` (owner-only, overlap re-check, then push notify)

### Push — `/push`
- `GET /public-key` → `{ key: <VAPID_PUBLIC_KEY> }`
- `POST /subscribe` (auth) → save subscription for current user

---

## 🖥️ Frontend UX (Key Screens)

- **Home**: grid of vehicle cards (image, location, owner, available window).  
- **Vehicle Details**: details + `react-datepicker` with `includeDateIntervals` (availability) and `excludeDateIntervals` (approved bookings).  
- **New/Edit Vehicle**: single form (image upload + fields).  
- **My Vehicles**: manage owner’s vehicles (Edit/Delete).  
- **My Bookings**: requester’s list and statuses.  
- **Manage Bookings**: owner’s incoming requests with Approve/Reject.  
- **Auth**: Sign In / Sign Up; JWT persisted in `localStorage`.  
- **NavBar**: links + **Enable Notifications** (requests Push subscription).

---

## Future Enhancments 
maps integration, richer PWA, admin dashboard, in-app messaging, trust & safety policy.

