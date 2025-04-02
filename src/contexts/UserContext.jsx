import { createContext, useState } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    // Extract the payload from the JWT token
    const payload = JSON.parse(atob(token.split('.')[1])).payload;
    
    // Make sure we're returning the full user object with isAdmin flag
    return {
      id: payload.id,
      email: payload.email,
      isAdmin: payload.isAdmin || false,
      name: payload.name
    };
  } catch (error) {
    console.error("Error parsing token:", error);
    localStorage.removeItem('token'); // Clear invalid token
    return null;
  }
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
