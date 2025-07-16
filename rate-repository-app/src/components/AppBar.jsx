import { View, StyleSheet,ScrollView  } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text'; 
import useMe from '../hooks/useMe';
import useSignOut from '../hooks/useSignOut';
import { useNavigate } from 'react-router-native';

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
  const {me,loading,error} = useMe();
  const signOut = useSignOut();
  const navigate = useNavigate();
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const onSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      <Link to="/" style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
      </Link>
      {me ? (
        <>
        <Link to="/create-review" style={styles.tab}>
          <Text style={styles.text}>Create a review</Text>
        </Link>
        <Link to="/my-reviews" style={styles.tab}>
          <Text style={styles.text}>My reviews</Text>
        </Link> 
        <Link to="/signin" style={styles.tab} onPress={onSignOut}>
          <Text style={styles.text}>Sign out</Text>
        </Link>
       
         </>
      ):(
        <>
        <Link to="/signin" style={styles.tab}>
          <Text style={styles.text}>Sign in</Text>
        </Link>
        <Link to="/signup" style={styles.tab}>
          <Text style={styles.text}>Sign up</Text>
        </Link>
        </>
        
      )}
      </ScrollView>
    </View>
  );
};

export default AppBar;