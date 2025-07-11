import { View, StyleSheet,Pressable,Text } from 'react-native';
import theme from '../theme';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // ...
  },
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable style={theme.appBar} onPress={() => console.log('Pressed!')}>
        <Text style={theme.appBar.text}>Repositories</Text>
    </Pressable>
    
        
   
  </View>;
};

export default AppBar;