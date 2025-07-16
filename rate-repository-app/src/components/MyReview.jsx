import React from 'react';
import { View, StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import { format } from 'date-fns';
import useMe from '../hooks/useMe';
import useDeleteReview from '../hooks/useDeleteReview';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  reviewContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

const ReviewItem = ({ review, navigate, onDelete }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: () => onDelete(review.id),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text color="primary" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          <Text color="textSecondary">{formattedDate}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, styles.viewButton]}
          onPress={() => navigate(`/${review.repository.id}`)}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReview = () => {
  const { me, loading, refetch } = useMe(true);
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!me || !me.reviews) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', padding: 20 }}>
          You haven&apos;t written any reviews yet.{'\n'}
          Go to a repository and create your first review!
        </Text>
      </View>
    );
  }

  const reviewNodes = me.reviews.edges.map((edge) => edge.node);
  
  if (reviewNodes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', padding: 20 }}>
          You haven&apos;t written any reviews yet.{'\n'}
          Go to a repository and create your first review!
        </Text>
      </View>
    );
  }

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      await refetch();
    } catch (e) {
      console.log('Error deleting review:', e);
    }
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem 
          review={item} 
          navigate={navigate} 
          onDelete={handleDelete}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default MyReview;