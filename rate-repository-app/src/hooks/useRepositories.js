import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = () => {
  const {data,loading,refetch} = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {repositories:data?.repositories,loading,refetch}
};




export default useRepositories;