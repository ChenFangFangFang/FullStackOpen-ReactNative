import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutation';

const useCreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW,
    {
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return [createReview, result];
};

export default useCreateReview;