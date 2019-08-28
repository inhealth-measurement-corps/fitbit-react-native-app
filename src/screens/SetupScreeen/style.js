import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding:10
  },
  headerText: {
    fontSize: 24,
    color: colors.main,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  inputBox: {
    marginTop: 24,
    backgroundColor: '#fff'
  },
  button: {
    marginTop:10,
    margin: 10
  },
  buttonView:{
    margin: 10
  },
  heightText: {
    color: colors.main,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 200
  },
  picker: {
    flex: 1
  },
  radioContainer: {
    marginTop: 24
  },
  radioItemContainer: {
    flexDirection: 'row',
    marginTop: 16
  },
  radioItem: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 32,
    margin: 16
  },
  radioSelectedItem: {
    backgroundColor: colors.main
  },
  radioItemText: {
    color: colors.main,
    borderColor: colors.main
  },
  radioSelectedText: {
    color: 'white'
  },
});
