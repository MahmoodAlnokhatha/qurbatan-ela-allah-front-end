const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/push`;

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) output[i] = raw.charCodeAt(i);
  return output;
}

export const isPushSupported = () =>
  'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

async function registerSW() {
  if (!('serviceWorker' in navigator)) return null;
  const reg = await navigator.serviceWorker.register('/service-worker.js');
  return reg;
}

async function getPublicKey() {
  const res = await fetch(`${BASE_URL}/public-key`);
  const data = await res.json();
  if (!data?.key) throw new Error('No VAPID public key from server');
  return data.key;
}

async function subscribeUser(registration, vapidKey) {
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') throw new Error('Notifications permission denied');

  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKey),
  });
}

async function sendSubscriptionToServer(sub) {
  const body = {
    endpoint: sub.endpoint,
    keys: {
      p256dh: sub.toJSON().keys.p256dh,
      auth: sub.toJSON().keys.auth,
    },
  };

  const res = await fetch(`${BASE_URL}/subscribe`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data?.err) throw new Error(data.err);
  return data;
}

export async function enablePush() {
  if (!isPushSupported()) throw new Error('Push not supported on this browser');
  const registration = await registerSW();
  if (!registration) throw new Error('Service worker registration failed');

  const vapidKey = await getPublicKey();
  const subscription = await subscribeUser(registration, vapidKey);
  await sendSubscriptionToServer(subscription);
  return true;
}