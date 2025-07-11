import { View,Image,StyleSheet } from 'react-native';
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

});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
      <Text fontWeight="bold" fontSize="subheading">{repository.fullName}</Text>
      <Text color="textSecondary" style={styles.description}>{repository.description}</Text>
      <View style={styles.languageContainer}>
      <Text style={styles.languageText}>{repository.language}</Text>

      </View>
        </View>
        </View>

    <View style={styles.statsContainer}>
    <ItemStat label="Stars" value={repository.stargazersCount} />
    <ItemStat label="Forks" value={repository.forksCount} />
    <ItemStat label="Rating" value={repository.ratingAverage} />
    <ItemStat label="Reviews" value={repository.reviewCount} />
    </View></View>
    
  );
};

export default RepositoryItem;