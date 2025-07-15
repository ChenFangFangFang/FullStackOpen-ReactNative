import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutation';
import useAuthStorage from '../hooks/useAuthStorage';
import Constants from 'expo-constants';
const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  
  // Log the Apollo URI being used
  console.log('Apollo URI:', Constants.expoConfig.extra.apolloUri);
  
  const [mutate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      console.log('Mutation error details:', {
        message: error.message,
        networkError: error.networkError,
        graphQLErrors: error.graphQLErrors,
      });
    }
  });

  const signIn = async ({ username, password }) => {
    try {
      console.log('Attempting to sign in with:', { username });
      const { data } = await mutate({ 
        variables: { 
          credentials: { 
            username, 
            password 
          } 
        } 
      });
      
      console.log('Mutation response:', data);

      if (data?.authenticate?.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
      }

      return { data };
    } catch (error) {
      console.log('SignIn error:', {
        message: error.message,
        name: error.name,
        networkError: error.networkError,
        graphQLErrors: error.graphQLErrors,
      });
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;