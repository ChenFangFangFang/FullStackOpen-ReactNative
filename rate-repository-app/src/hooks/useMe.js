import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  if (includeReviews) {
    console.log('User data:', {
      username: data?.me?.username,
      reviewCount: data?.me?.reviews?.edges?.length || 0,
      reviews: data?.me?.reviews?.edges?.map(edge => ({
        repository: edge.node.repository.fullName,
        rating: edge.node.rating,
        createdAt: edge.node.createdAt
      }))
    });
  }

  return { me: data?.me, loading, error, refetch };
};

export default useMe;