import React from 'react';

import RepositoryItem from './RepositoryItem';

const RepositoryList = ({ repositories }) => (
  <div>
    {repositories.edges.map(({ node }) => (
      <RepositoryItem key={node.id} {...node} />
    ))}
  </div>
);

export default RepositoryList;
