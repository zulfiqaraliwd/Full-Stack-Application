import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginAPI, adminLogin as adminLoginAPI, register as registerAPI, getMe } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Keep auth state in sync across browser tabs (e.g. logging in as admin
  // in one tab wasn't reflected in an already-open tab until a manual reload)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        setToken(e.newValue);
        if (!e.newValue) {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await loginAPI({ email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const res = await adminLoginAPI({ email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      toast.success('Admin login successful!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Admin login failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await registerAPI({ name, email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, adminLogin, register, logout, isAdmin, token }}>
      {children}
    </AuthContext.Provider>
  );
};