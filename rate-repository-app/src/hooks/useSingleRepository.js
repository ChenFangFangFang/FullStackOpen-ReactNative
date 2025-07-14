import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (repositoryId) => {
    const {data,loading,refetch} = useQuery(GET_SINGLE_REPOSITORY,{
      fetchPolicy: 'cache-and-network',
      variables: { id: repositoryId },
    });
    console.log("data from useSingleRepository: ",data);
    return {repository:data?.repository,loading,refetch}
  };
  
  

export default useSingleRepository;