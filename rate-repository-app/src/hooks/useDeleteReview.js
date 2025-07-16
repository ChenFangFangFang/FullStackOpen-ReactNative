import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutation';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    try {
      const { data } = await mutate({
        variables: { id },
      });
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return [deleteReview, result];
};

export default useDeleteReview; 