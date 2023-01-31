import React from 'react';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <>
      <label htmlFor="">
        <p> Find contacts by name</p>
        <input type="text" value={value} onChange={onChange} />
      </label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
