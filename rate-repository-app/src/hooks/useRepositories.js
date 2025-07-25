import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const variables = { orderBy, orderDirection, searchKeyword };
  
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return { 
    repositories: data?.repositories,
    loading,
    refetch
  };
};




export default useRepositories;