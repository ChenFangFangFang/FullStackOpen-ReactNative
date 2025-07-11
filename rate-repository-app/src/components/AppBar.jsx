import { View, StyleSheet,ScrollView  } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text'; 

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24292e', 
    paddingTop: Constants.statusBarHeight,  
    flexDirection: 'row', 
    paddingBottom: 10, 
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      <Link to="/" style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/signin" style={styles.tab}>
        <Text style={styles.text}>Sign in</Text>
      </Link>
      
      </ScrollView>
    </View>
  );
};

export default AppBar;