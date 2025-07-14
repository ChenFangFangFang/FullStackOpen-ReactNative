import { View, StyleSheet,FlatList } from 'react-native';
import Text from './Text';
import { format} from 'date-fns'
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
      ratingContainer:{
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
});
const formatDate = (date) => {
    const dateString = format(new Date(date), 'dd-MM-yyyy');
    return dateString;
};
const ItemSeparator = () => <View style={styles.separator} />;
const ReviewItem = ({ reviews }) => {
    return (
        <View >
          <FlatList
                data={reviews?.edges}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>{item.node.rating}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                        <Text style={styles.username}>{item.node.user.username}</Text>
                        <Text style={styles.date}>{formatDate(item.node.createdAt)}</Text>
                        <Text>{item.node.text}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={({node}) => node.id}
                ItemSeparatorComponent={ItemSeparator}
                />
        </View>
    );
};
const Reviews = ({ reviews }) => {
    return (
        <View  >
            <ItemSeparator />
            <ReviewItem reviews={reviews} />           
        </View>
    );
};

export default Reviews;