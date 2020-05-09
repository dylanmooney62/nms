import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import format from 'date-fns/format';
import qs from 'query-string';
import Container from './common/Container';
import Select from './common/Select';
import DatePicker from './common/DatePicker';
import { TYPES, AGES, ADMISSIONS } from '../data/eventFilters';

const EventFilterForm = () => {
  const [formData, setFormData] = useState({
    closingDate: `${format(Date.now(), 'yyyy-MM-dd')}`,
    type: '',
    ageLimit: '',
    admission: '',
  });

  const handleChange = ({ value }, { name }) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const queryString = qs.stringify(formData, {
      skipNull: true,
      skipEmptyString: true,
    });

    navigate(`?${queryString}`);
  }, [formData]);

  return (
    <StyledEventFilterForm>
      <Container>
        <form>
          <DatePicker
            className="form-group"
            label="Date"
            name="closingDate"
            onChange={handleChange}
            minDate={Date.now()}
            variant="secondary"
          />
          <Select
            className="form-group"
            options={TYPES}
            label="Type"
            onChange={handleChange}
            name="type"
            variant="secondary"
          />
          <Select
            className="form-group"
            options={AGES}
            label="Ages"
            onChange={handleChange}
            name="ageLimit"
            variant="secondary"
          />
          <Select
            className="form-group"
            options={ADMISSIONS}
            label="Admission"
            onChange={handleChange}
            name="admission"
            variant="secondary"
          />
        </form>
      </Container>
    </StyledEventFilterForm>
  );
};

const StyledEventFilterForm = styled.div`
  background: ${({ theme }) => theme.colors['purple-regalia']};
  padding: ${({ theme }) => theme.spacing['8']} 0;
  position: relative;
  z-index: 100;

  form {
    display: grid;
    justify-content: space-between;
    transform: translateY(-0.8rem);
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing['5']};

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default EventFilterForm;
