import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({ user: null, setUser: () => {} });

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1])).payload;
      setUser(payload);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}