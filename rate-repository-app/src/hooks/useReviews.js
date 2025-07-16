import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (repositoryId, first = 3) => {
    const { data, loading, error, fetchMore } = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { id: repositoryId, first },
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                first,
            },
        });
    };

    return { 
        reviews: data?.repository?.reviews, 
        loading, 
        error,
        fetchMore: handleFetchMore,
        hasNextPage: data?.repository?.reviews?.pageInfo.hasNextPage
    };
};

export default useReviews;