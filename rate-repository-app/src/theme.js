import Constants from 'expo-constants';
import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      
    },
    backgroundColor: {
        mainBackground: '#e1e4e8',
        itemBackground: 'white',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    appBar: {
      backgroundColor: '#24292e',
      paddingTop: Constants.statusBarHeight,
      paddingBottom: 20,
      text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
    },
  };
  
  export default theme;