import React from 'react';

const Error = ({ error }) => (
  <div>
    <p>{error.message}</p>
    <pre>{JSON.stringify(error, 0, 2)}</pre>
  </div>
);

export default Error;
