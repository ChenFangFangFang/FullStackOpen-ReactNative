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
      }
    }
  }
}
`;

// other queries...