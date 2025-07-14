import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query  {
  repositories {
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
  query {
    me {
      id
      username
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
  query Repository($id: ID!) {
    repository(id: $id) {
      reviews {
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
        }
      }
    }
  }
`;