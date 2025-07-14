import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (repositoryId) => {
    const { data, loading, error } = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { id: repositoryId },
    });
    console.log("data from useReviews: ",data);
    return { reviews: data?.repository?.reviews, loading, error };
};

export default useReviews;