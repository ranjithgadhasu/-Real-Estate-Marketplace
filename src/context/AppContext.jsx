import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const defaultFilters = {
  search: '', type: 'all', status: 'all', minPrice: '', maxPrice: '', bedrooms: 'any', bathrooms: 'any', amenities: [],
};

function readStored(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { return false; }
  return true;
}

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = readStored('estately_wishlist', []);
    return Array.isArray(saved) ? saved : [];
  });

  const [compareList, setCompareList] = useState(() => {
    const saved = readStored('estately_compare', []);
    return Array.isArray(saved) ? saved : [];
  });

  const [user, setUser] = useState(() => readStored('estately_user', null));

  const [filters, setFilters] = useState(defaultFilters);

  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  useEffect(() => {
    writeStored('estately_wishlist', wishlist);
  }, [wishlist]);

  useEffect(() => {
    writeStored('estately_compare', compareList);
  }, [compareList]);

  useEffect(() => {
    if (user) {
      writeStored('estately_user', user);
    } else {
      try { localStorage.removeItem('estately_user'); } catch { return; }
    }
  }, [user]);

  const addToWishlist = (propertyId) => {
    setWishlist(prev => [...new Set([...prev, propertyId])]);
  };

  const removeFromWishlist = (propertyId) => {
    setWishlist(prev => prev.filter(id => id !== propertyId));
  };

  const toggleWishlist = (propertyId) => {
    if (wishlist.includes(propertyId)) {
      removeFromWishlist(propertyId);
    } else {
      addToWishlist(propertyId);
    }
  };

  const isInWishlist = (propertyId) => wishlist.includes(propertyId);

  const addToCompare = (propertyId) => {
    if (compareList.length < 4 && !compareList.includes(propertyId)) {
      setCompareList(prev => [...prev, propertyId]);
    }
  };

  const removeFromCompare = (propertyId) => {
    setCompareList(prev => prev.filter(id => id !== propertyId));
  };

  const toggleCompare = (propertyId) => {
    if (compareList.includes(propertyId)) {
      removeFromCompare(propertyId);
    } else {
      addToCompare(propertyId);
    }
  };

  const isInCompare = (propertyId) => compareList.includes(propertyId);

  const clearCompare = () => setCompareList([]);

  const login = (email, name) => {
    setUser({ email, name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      wishlist,
      compareList,
      user,
      filters,
      setFilters,
      sortBy,
      setSortBy,
      currentPage,
      setCurrentPage,
      perPage,
      setPerPage,
      toggleWishlist,
      isInWishlist,
      toggleCompare,
      isInCompare,
      removeFromCompare,
      clearCompare,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
