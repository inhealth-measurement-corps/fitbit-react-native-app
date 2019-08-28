import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  image: {
    flex: 1,
    resizeMode : 'cover'
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight : 'bold',
    fontSize : 50,
    fontFamily : 'monospace',
    color : '#163475'
  }
});
