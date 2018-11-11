import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Error from './Error';
import Loading from './Loading';
import RepositoryList from './RepositoryList';

const GET_MY_REPOSITORIES = gql`
  query {
    viewer {
      id
      url
      name
      repositories(first: 5) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            owner {
              login
              url
            }
            primaryLanguage {
              name
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;

const Profile = () => (
  <Query query={GET_MY_REPOSITORIES}>
    {({ data, loading, error }) => {
      if (error) {
        return <Error error={error} />;
      }

      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading />;
      }

      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);

export default Profile;
