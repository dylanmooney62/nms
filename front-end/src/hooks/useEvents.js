import { useState, useEffect } from 'react';
import api from '../api';

const useEvents = (query) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: events },
        } = await api.get(`events${query}`);

        setEvents(events);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, [query]);

  return [isLoading, events];
};

export default useEvents;
