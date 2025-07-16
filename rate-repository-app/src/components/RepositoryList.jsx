import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import SortHeader, { orderByOptions } from './SortHeader';
import SearchRepository from './SearchRepository';
import { useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchQuery, setSearchQuery, selectedSort, setSelectedSort } = this.props;
    
    return (
      <View>
        <SearchRepository 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <SortHeader 
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </View>
    );
  };

  render() {
    const { repositories, navigate } = this.props;
    
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    const handlePress = (repositoryId) => {
      navigate(`/${repositoryId}`);
    };

    return (
      <View style={theme.mainBackground}>      
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={repositoryNodes}
          renderItem={({ item }) => 
            <Pressable onPress={() => handlePress(item.id)}>
              <RepositoryItem repository={item} showGitHubButton={false} />
            </Pressable>
          }
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSort, setSelectedSort] = React.useState("CREATED_AT_DESC");

  const debouncedSearch = useDebouncedCallback(
    (value) => {
      setSearchQuery(value);
    },
    500
  );

  const selectedOption = orderByOptions.find(option => option.value === selectedSort);
  
  const { repositories } = useRepositories(
    selectedOption.orderBy,
    selectedOption.orderDirection,
    searchQuery
  );

  return (
    <RepositoryListContainer 
      repositories={repositories}
      navigate={navigate}
      searchQuery={searchQuery}
      setSearchQuery={debouncedSearch}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
    />
  );
};

export default RepositoryList;