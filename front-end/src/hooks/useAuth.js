import { useState, useEffect } from 'react';
import api from '../api';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get('auth/user')
      .then(({ data }) => {
        setUser(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setUser(null);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isLoading, user];
};

export default useAuth;
