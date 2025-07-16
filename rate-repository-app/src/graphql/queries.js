import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          language
          url
          description
          forksCount
          fullName
          ownerAvatarUrl
          stargazersCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;
export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;
export const GET_SINGLE_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
        language
        url
        description
        forksCount
        fullName
        ownerAvatarUrl
        stargazersCount
        reviewCount
        ratingAverage
    }
  }
`;
export const GET_REVIEWS = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
export const GET_REPOSITORIES_BY_SEARCH = gql`
  query Repositories($searchKeyword: String!) {
    repositories(searchKeyword: $searchKeyword) {
      edges {
       node {
        id
        language
        url
        description
        forksCount
        fullName
        ownerAvatarUrl
        stargazersCount
        reviewCount
        ratingAverage
      }}}}
`;