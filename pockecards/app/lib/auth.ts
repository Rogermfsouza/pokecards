export const login = (email: string, password: string): boolean => {
  if (email && password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminAuth', 'true');
    }
    return true;
  }
  return false;
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminAuth');
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminAuth') === 'true';
  }
  return false;
};

