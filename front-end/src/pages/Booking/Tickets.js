import React, { useEffect } from 'react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CustomLink from '../../components/common/CustomLink';
import BookTicketsForm from '../../components/BookTicketsForm';

const Tickets = ({ navigate, onEnter }) => {
  // Update stage nav to tickets
  useEffect(() => {
    onEnter(1);
  }, [onEnter]);

  return (
    <>
      <BookTicketsForm navigate={navigate} />
      <CustomLink to="../" icon={faChevronLeft} style={{ marginTop: '6.4rem' }}>
        Back
      </CustomLink>
    </>
  );
};

export default Tickets;
