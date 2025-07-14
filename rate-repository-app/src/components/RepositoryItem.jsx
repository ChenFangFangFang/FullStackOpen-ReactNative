import { View,Image,StyleSheet,Pressable,Linking} from 'react-native';
import Text from './Text';
import theme from '../theme';
import ItemStat from './ItemStat';
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatarContainer: {
    paddingRight: 15,
  },
  contentContainer: {
    marginTop: 5,
    flex: 1,
  },
  
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 15,
    marginTop: 5,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#586069',
    marginTop: 5,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary, 
    borderRadius: 4,                      
    paddingVertical: 4,                  
    paddingHorizontal: 8,                 
    alignSelf: 'flex-start',     
    marginTop: 5,
  },
  languageText: {
    color: 'white',                      
    fontSize: theme.fontSizes.body,      
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 4,
    marginTop: 15,  
  },
  githubButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  }

});

const RepositoryItem = ({ repository,showGitHubButton }) => {

  return (
    <View testID="repositoryItem" style={styles.container} >
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
      <Text testID="fullName" fontWeight="bold" fontSize="subheading">{repository.fullName}</Text>
      <Text testID="description" color="textSecondary" style={styles.description}>{repository.description}</Text>
      <View style={styles.languageContainer}>
      <Text testID="language" style={styles.languageText}>{repository.language}</Text>

      </View>
        </View>
        </View>

    <View style={styles.statsContainer}>
    <ItemStat testID="stars" label="Stars" value={repository.stargazersCount} />
    <ItemStat testID="forks" label="Forks" value={repository.forksCount} />
    <ItemStat testID="rating" label="Rating" value={repository.ratingAverage} />
    <ItemStat testID="reviews" label="Reviews" value={repository.reviewCount} />
    </View>
    {showGitHubButton && (
        <Pressable 
          style={styles.githubButton}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;