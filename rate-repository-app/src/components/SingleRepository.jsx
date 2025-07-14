import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';
import { useParams } from 'react-router-native';
import useReviews from '../hooks/useReviews';
import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryItem from './RepositoryItem';
import Reviews from './Reviews';
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: theme.mainBackground,
    },
    button: {
        backgroundColor: '#0366d6',
        borderRadius: 4,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
});
const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
    const {repositoryId}  = useParams();
    console.log("repositoryId from params: ",repositoryId);
    const { repository,loading } = useSingleRepository(repositoryId);
    const { reviews,loading:reviewsLoading } = useReviews(repositoryId);
    console.log("repository: ",repository);
    console.log("reviews: ",reviews);
    if (loading || reviewsLoading) {
        return <Text>Loading...</Text>;
    }
    if (!repository) {
        return <Text>Repository not found</Text>;
    }
    return (
        <View style={styles.container}>
            <RepositoryItem repository={repository} showGitHubButton={true} />
            <ItemSeparator />
            <Reviews reviews={reviews} />
        </View>
    );
};

export default SingleRepository;