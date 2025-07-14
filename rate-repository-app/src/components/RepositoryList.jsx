import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
    const handlePress = (repositoryId) => {
      navigate(`/${repositoryId}`);
      console.log("pressed");
      console.log("repositoryId",repositoryId);
    };
  return (
    <View style={theme.mainBackground}>
        <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => 
        <Pressable onPress={() => handlePress(item.id)}>
        <RepositoryItem repository={item} showGitHubButton={false} />
        </Pressable>}
        ItemSeparatorComponent={ItemSeparator}
      />
      
    </View>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;