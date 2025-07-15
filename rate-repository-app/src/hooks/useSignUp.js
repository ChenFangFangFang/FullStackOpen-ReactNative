import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutation';

const useSignUp = () => {
    const [signUp, result] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            console.log('Mutation completed with data:', data);
        },
        onError: (error) => {
            console.log('Mutation error:', error);
        }
    });

    return [signUp, result];
};

export default useSignUp;   