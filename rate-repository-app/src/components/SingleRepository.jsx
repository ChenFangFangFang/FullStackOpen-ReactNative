import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import { useParams } from 'react-router-native';
import useReviews from '../hooks/useReviews';
import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryItem from './RepositoryItem';
import Reviews from './Reviews';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: theme.mainBackground,
    },
    separator: {
        height: 10,
    },
    loadingContainer: {
        padding: 15,
        alignItems: 'center',
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
    const { repositoryId } = useParams();
    const { repository, loading: repoLoading } = useSingleRepository(repositoryId);
    const { reviews, loading: reviewsLoading, fetchMore } = useReviews(repositoryId);

    if (repoLoading || reviewsLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!repository) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Repository not found</Text>
            </View>
        );
    }

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <View style={styles.container}>
            <RepositoryItem repository={repository} showGitHubButton={true} />
            <ItemSeparator />
            <Reviews reviews={reviews} onEndReach={onEndReach} />
        </View>
    );
};

export default SingleRepository;