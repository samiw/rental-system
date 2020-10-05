import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  error: PropTypes.string,
};

const ErrorComponent = props => {
  const { error } = props;
  return (
    <div className="home" style={{ color: `red`, fontSize: '24px' }}>
      <h1>Some error occurred.</h1>
      <b>{error ? error : ''} </b>
    </div>
  );
};
ErrorComponent.propTypes = propTypes;
export default ErrorComponent;
