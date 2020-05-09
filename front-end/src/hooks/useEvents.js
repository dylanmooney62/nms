import { useState, useEffect } from 'react';
import api from '../api';

const useEvents = (query) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`events${query}`)
      .then(({ data }) => {
        setEvents(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [query]);

  return [isLoading, events];
};

export default useEvents;
