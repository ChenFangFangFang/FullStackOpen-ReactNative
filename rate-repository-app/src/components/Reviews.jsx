import { View, StyleSheet, FlatList } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    separator: {
        height: 10,
    },
    ratingContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    ratingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 2,
    },
    date: {
        color: theme.colors.textSecondary,
        marginBottom: 5,
    },
    loadingContainer: {
        padding: 15,
        alignItems: 'center',
    },
});

const formatDate = (date) => {
    const dateString = format(new Date(date), 'dd-MM-yyyy');
    return dateString;
};

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.username}>{review.user.username}</Text>
                <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
};

const Reviews = ({ reviews, onEndReach }) => {
    if (!reviews) {
        return null;
    }

    const reviewNodes = reviews.edges.map(edge => edge.node);

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default Reviews;