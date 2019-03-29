import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  questionItem: {
    flex: 1,
    width,
    padding: 24
  },
  questionTextContainer: {
    flex: 1
  },
  questionText: {
    fontSize: 24,
    marginBottom: 24
  },
  answerContainer: {
    borderWidth: 0.5,
    borderColor: '#404040'
  },
  answerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#404040',
    minHeight: 56
  },
  answerText: {
    fontSize: 16,
    fontWeight: '600'
  },
  button: {
    margin: 16
  },
  checkmark: {
    width: 24,
    height: 24
  },
  progressTitle: {
    color: colors.main,
    margin: 16,
    fontSize: 20
  },
  progressArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16
  },
  icon: {
    width: 24,
    height: 24
  },
  controlModal: {
    flex: 1
  },
  controlModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.6)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlModalSubContainer: {
    backgroundColor: 'white',
    padding: 24
  },
  modalTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.main,
    textAlign: 'center',
    fontSize: 24
  },
  modalInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  modalInput: {
    flex: 1,
    marginTop: 64,
    backgroundColor: 'white',
    marginRight: 24
  },
  lbsText: {
    fontSize: 24
  },
  startButton: {
    marginTop: 64
  }
});
