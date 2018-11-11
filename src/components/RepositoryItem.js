import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Link from './Link';

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    toggleStar: addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!) {
    toggleStar: removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const TOGGLE_WATCH_REPOSITORY = gql`
  mutation($id: ID!, $state: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $id, state: $state }) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  viewerHasStarred,
  watchers,
  viewerSubscription,
}) => (
  <div>
    <div className="title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>
      <div className="title-actions">
        <Mutation
          mutation={viewerHasStarred ? UNSTAR_REPOSITORY : STAR_REPOSITORY}
          variables={{ id }}
        >
          {(toggleStar, { loading }) => (
            <button type="button" onClick={toggleStar} disabled={loading}>
              {viewerHasStarred ? 'Unstar' : 'Star'} {stargazers.totalCount}
            </button>
          )}
        </Mutation>

        <Mutation
          mutation={TOGGLE_WATCH_REPOSITORY}
          variables={{
            id,
            state:
              viewerSubscription === 'SUBSCRIBED'
                ? 'UNSUBSCRIBED'
                : 'SUBSCRIBED',
          }}
        >
          {(toggleWatch, { loading }) => (
            <button type="button" onClick={toggleWatch} disabled={loading}>
              {viewerSubscription === 'SUBSCRIBED' ? 'Unwatch' : 'Watch'}{' '}
              {watchers.totalCount}
            </button>
          )}
        </Mutation>
      </div>
    </div>
    <div className="description">
      <div
        className="description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="description-details">
        <div>
          {primaryLanguage && (
            <>
              Language: <span>{primaryLanguage.name}</span>
            </>
          )}
        </div>
        <div>
          {owner && (
            <>
              Owner: <Link href={owner.url}>{owner.login}</Link>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default RepositoryItem;
