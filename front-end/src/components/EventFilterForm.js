import React, { useState } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import qs from 'query-string';
import Container from './common/Container';
import Select from './common/Select';
import DatePicker from './common/DatePicker';
import { TYPES, AGES, ADMISSIONS } from '../data/eventFilters';
import useDidUpdate from '../hooks/useDidUpdate';

const EventFilterForm = ({ query, onSearch }) => {
  const queryObj = qs.parse(query);

  const [formData, setFormData] = useState({
    closingDate: queryObj.closingDate || format(Date.now(), 'yyyy-MM-dd'),
    type: queryObj.type || '',
    ageLimit: queryObj.ageLimit || '',
    admission: queryObj.admission || '',
  });

  const handleChange = ({ value }, { name }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  useDidUpdate(() => {
    const queryString = qs.stringify(formData, {
      skipEmptyString: true,
      skipNull: true,
    });

    onSearch(queryString);
  }, [formData]);

  return (
    <StyledEventFilterForm>
      <Container>
        <form>
          <DatePicker
            className="form-group"
            label="Date"
            name="closingDate"
            variant="secondary"
            minDate={Date.now()}
            selected={new Date(formData.closingDate)}
            onChange={handleDateChange}
          />
          <Select
            className="form-group"
            options={TYPES}
            label="Type"
            onChange={handleChange}
            name="type"
            variant="secondary"
            defaultValue={
              TYPES[TYPES.findIndex(({ value }) => value === formData.type)]
            }
          />
          <Select
            className="form-group"
            options={AGES}
            label="Ages"
            onChange={handleChange}
            name="ageLimit"
            variant="secondary"
            defaultValue={
              AGES[AGES.findIndex(({ value }) => value === formData.ageLimit)]
            }
          />
          <Select
            className="form-group"
            variant="secondary"
            label="Admission"
            name="admission"
            onChange={handleChange}
            options={ADMISSIONS}
            defaultValue={
              ADMISSIONS[
                ADMISSIONS.findIndex(
                  ({ value }) => value === formData.admission,
                )
              ]
            }
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
