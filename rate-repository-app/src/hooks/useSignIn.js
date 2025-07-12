import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutation';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ 
      variables: { 
        credentials: { 
          username, 
          password 
        } 
      } 
    });
    console.log("data from useSignIn",data);
    return data;
  };

  return [signIn, result];
};

export default useSignIn;