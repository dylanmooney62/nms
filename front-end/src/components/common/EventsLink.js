import React from 'react';
import { Link } from '@reach/router';
import { format } from 'date-fns';

const EventsLink = ({ children, ...innerProps }) => {
  return (
    <Link
      {...innerProps}
      to={`/exhibitions-events?closingDate=${format(Date.now(), 'yyyy-MM-dd')}`}
      state={{
        reload: true,
      }}
    >
      {children}
    </Link>
  );
};

export default EventsLink;
